import express, {Express} from 'express';
import logger from './libraries/logger';
import {version} from './libraries/version';
import engines from 'consolidate';
import path from 'node:path';
import api from './api';
import icons from './libraries/icons';
import cookieParser from 'cookie-parser';
import viewRouter from './routes/index';
import apiRouter from './routes/api';
import {Config} from 'typings/config';
import config from '../config.json';
import createError from 'http-errors';

config as Config;
const server:Express = express();

server.set('views', path.join(__dirname, '../client'));
server.set('view engine', 'pug');
server.engine('pug', engines.pug)

server.use(express.json());
server.use(express.urlencoded({extended:false}));
server.use(express.static(path.join(__dirname, '../public')));
server.use(cookieParser());

server.use(function(req:express.Request, res:express.Response, next){
  res.locals.currentPage = req.url;
  res.locals.config = config;
  res.locals.version = version;
  res.locals.icons = icons.icons;
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

server.listen(config.Livemap.Port, ()=>logger.info('Toasty ' + version + ' launched on port ' + config.Livemap.Port))