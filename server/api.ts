import utility from './libraries/utility';
import logger from './libraries/logger';
import {version} from './libraries/version';
import config from '../config.json';
import {Config} from '../typings/config';
import {Server,Slots} from './model/server';
import Game from './model/game';
import axios from 'axios';

config as Config;
const uaString = `Toasty ${version}/`;
const RequestTimeout = 8000;
const Axios = axios.get;

async function fetchMap(cb){
  const map = await Axios(config.Livemap.Map,{timeout: RequestTimeout,headers:{'User-Agent':`${uaString+'Map'}`}}).catch((err:Error)=>logger.error(err.message))
  cb(map)
}

async function fetchXMLStats(cb){
  const result = await Axios('http://'+config.FSServer.PanelURL+'/feed/dedicated-server-stats.json?code='+config.FSServer.APICode, {timeout:RequestTimeout,headers:{'User-Agent':`${uaString+'DSS'}`}})
  cb(result)
}

function fetchServerOnly(cb){
  fetchXMLStats((result)=>cb(new Server(result.Server)));
}

async function fetchEntities(cb){
  fetchXMLStats(async(result)=>cb({
    server: console.log('server'), //new Server(await result.json().then(s=>s.server)),
    slots: console.log(result.data) //new Slots((await result.json().then(s=>s.slots)) === undefined ? 0 : (await result.json().then(s=>s.slots)))
  }))
}

async function fetchCSG(cb){
  const result = await Axios('http://'+config.FSServer.PanelURL+'/feed/dedicated-server-savegame.html?code='+config.FSServer.APICode+'&file=careerSavegame', {timeout:RequestTimeout,headers:{'User-Agent':`${uaString+'CSG'}`}})
  const x = utility.c2json(result.data)
  cb(new Game(x))
}

export default {fetchMap, fetchServerOnly, fetchEntities, fetchCSG}