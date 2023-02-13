import utility from './libraries/utility';
import logger from './libraries/logger';
import config from '../config.json';
import {Config} from '../typings/config';
import {Server,Slots} from './model/server';

config as Config;
const uaString = 'Toasty/';
const RequestTimeout = AbortSignal.timeout(5000);

export async function fetchMap(cb){
  let map = await fetch(config.Livemap.Map,{signal:RequestTimeout,headers:{'User-Agent':`${uaString+'Map'}`}}).catch((err:Error)=>logger.error(err.message))
  cb(map)
}

async function fetchXMLStats(cb){
  let result = await fetch('http://'+config.FSServer.PanelURL+'/feed/dedicated-server-stats.json?code='+config.FSServer.APICode, {signal:RequestTimeout,headers:{'User-Agent':`${uaString+'DSS'}`}}).catch((err:Error)=>logger.error(err.message))
  cb(result)
}

export function fetchServerOnly(cb){
  fetchXMLStats((result)=>cb(new Server(result.Server)));
}

export async function fetchEntities(cb){
  fetchXMLStats((result)=>cb({
    server: new Server(result.Server),
    slots: new Slots(result.Server.Slots == undefined ? 0 : result.Server.Slots)
  }))
}

export function fetchCSG(cb){}