import express, {Express,Request,Response} from 'express';
import logger from '../libraries/logger';
import {version} from '../libraries/version';
import engines from 'consolidate';
import path from 'node:path';

const server:Express = express();

server.set('views', path.join(__dirname, '../client'));
server.set('view engine', 'lodash');
server.engine('lodash', engines.lodash)

server.use(express.json());
server.use(express.urlencoded({extended:false}))
server.use(express.static(path.join(__dirname, '../public')))

var portNum = 8000;
server.listen(portNum, ()=>logger.info('Toasty ' + version + ' launched on port ' + portNum))