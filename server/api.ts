import utility from './libraries/utility';
import logger from './libraries/logger';
import config from '../config.json';
import {Config} from '../typings/config';
import {Server,Slots} from './model/server';
import Game from './model/game';

config as Config;
const uaString = 'Toasty/';
const RequestTimeout = AbortSignal.timeout(5000);

async function fetchMap(cb){
  let map = await fetch(config.Livemap.Map,{signal:RequestTimeout,headers:{'User-Agent':`${uaString+'Map'}`}}).catch((err:Error)=>logger.error(err.message))
  cb(map)
}

async function fetchXMLStats(cb){
  let result = await fetch('http://'+config.FSServer.PanelURL+'/feed/dedicated-server-stats.json?code='+config.FSServer.APICode, {signal:RequestTimeout,headers:{'User-Agent':`${uaString+'DSS'}`}}).catch((err:Error)=>logger.error(err.message))
  cb(result)
}

function fetchServerOnly(cb){
  fetchXMLStats((result)=>cb(new Server(result.Server)));
}

async function fetchEntities(cb){
  fetchXMLStats((result)=>cb({
    server: new Server(result.Server),
    slots: new Slots(result.Server.Slots == undefined ? 0 : result.Server.Slots)
  }))
}

async function fetchCSG(cb){
  let result = await fetch('http://'+config.FSServer.PanelURL+'/feed/dedicated-server-savegame.html?code='+config.FSServer.APICode+'&file=careerSavegame', {signal:RequestTimeout,headers:{'User-Agent':`${uaString+'CSG'}`}})//.catch((err:Error)=>logger.error(err.message))
  const x = utility.c2json(result.body)
  cb(new Game(x))
}

export default {
  fetchMap, fetchServerOnly, fetchEntities, fetchCSG
}