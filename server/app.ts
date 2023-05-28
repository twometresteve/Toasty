import express, {Express} from 'express';
import logger from './libraries/logger';
import {version} from './libraries/version';
import engines from 'consolidate';
import path from 'node:path';
import cron from 'node-cron';
import api from './api';
import mongoose from 'mongoose';
import {exec} from 'node:child_process';
import {icons} from './libraries/iconList';
import cookieParser from 'cookie-parser';
import viewRouter from './routes/index';
import apiRouter from './routes/api';
import {Config} from 'typings/config';
import config from '../config.json';
import createError from 'http-errors';

config as Config;
const server:Express = express();

mongoose.set('strictQuery', true);
mongoose.connect(config.Livemap.MongoDB,{
  replicaSet: 'toastyy',
  autoIndex: true,
  authMechanism:'DEFAULT',
  authSource: 'admin',
  serverSelectionTimeoutMS: 15000,
  waitQueueTimeoutMS: 50000,
  socketTimeoutMS: 30000,
  family: 4
}).then(()=>logger.info('Successfully connected to MongoDB')).catch((error)=>{
  logger.error(`Failed to connect to MongoDB\n${error.reason}`);
  exec('pm2 restart Toasty')
})

server.set('views', path.join(__dirname, '../../client'));
server.set('view engine', 'pug');
server.engine('pug', engines.pug)

server.use(express.json());
server.use(express.urlencoded({extended:false}));
server.use(express.static(path.join(__dirname, '../../public')));
server.use(cookieParser());

server.use(function(req:express.Request, res:express.Response, next){
  res.locals.currentPage = req.url;
  res.locals.config = config;
  res.locals.version = version;
  res.locals.icons = icons;
  next();
})

server.use('/',viewRouter);
server.use('/api',apiRouter);

server.use(function(req:express.Request, res:express.Response, next){
  if (res.status(404)) next(createError(404))
  else next(createError(res.status(503)))
})

server.use(function(err, req:express.Request, res:express.Response, next){
  logger.JSON(err.message);
  res.status(err.statusCode);
  api.fetchServerOnly(server=>{
    res.render('error',{
      server: server,
      error: err
    });
  })
})

cron.schedule('0 11-21 * * *', ()=>{
  console.log('UPDATER :: Checking the repository for updates...');
  exec('git pull && tsc',(err,stdout)=>{
    if (err) console.error(err.message);
    else if (stdout.includes('Already up to date')) console.log('UPDATER :: Already up to date with upstream repository.');
    else exec('pm2 restart Toasty');
  })
})

server.listen(config.Livemap.Port, ()=>logger.info('Toasty ' + version + ' launched on port ' + config.Livemap.Port))