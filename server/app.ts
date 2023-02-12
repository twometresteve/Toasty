import express, {Express} from 'express';
import logger from './libraries/logger';
import {version} from './libraries/version';
import engines from 'consolidate';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import viewRouter from './routes/index';
import apiRouter from './routes/api';
import {Config} from 'typings/config';
import config from '../config.json';

config as Config;
const server:Express = express();

server.set('views', path.join(__dirname, '../client'));
server.set('view engine', 'pug');
server.engine('pug', engines.pug)

server.use(express.json());
server.use(express.urlencoded({extended:false}));
server.use(express.static(path.join(__dirname, '../public')));
server.use(cookieParser());

server.use('/',viewRouter);
server.use('/api',apiRouter);

server.listen(config.Livemap.Port, ()=>logger.info('Toasty ' + version + ' launched on port ' + config.Livemap.Port))