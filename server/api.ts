import utility from './libraries/utility';
import logger from './libraries/logger';
import {version} from './libraries/version';
import config from '../config.json';
import {Config} from '../typings/config';
import {Server,Slots} from './model/server';
import Game from './model/game';
import player from './model/player';
import vehicle from './model/vehicle';

config as Config;
const uaString = `Toasty ${version}/`;
const RequestTimeout = AbortSignal.timeout(8000);

async function cringePromise(url:string, uaSuffix:string){
  return await Promise.all([await fetch(url, {signal:RequestTimeout,headers:{'User-Agent':`${uaString+uaSuffix}`}})])
}

async function fetchMap(cb){
  const map = await fetch(config.Livemap.Map,{signal: RequestTimeout,headers:{'User-Agent':`${uaString+'Map'}`}}).catch((err:Error)=>logger.error(err.message))
  cb(map)
}

async function fetchXMLStats(cb){
  const result = await cringePromise('http://'+config.FSServer.PanelURL+'/feed/dedicated-server-stats.json?code='+config.FSServer.APICode, 'DSS').catch(err=>{
    if (err.name === 'TimeoutError: The operation was aborted due to timeout') process.exit();
  })
  //const result = await fetch('http://'+config.FSServer.PanelURL+'/feed/dedicated-server-stats.json?code='+config.FSServer.APICode, {signal:RequestTimeout,headers:{'User-Agent':`${uaString+'DSS'}`}})
  cb(result)
}

function fetchServerOnly(cb){
  fetchXMLStats((result)=>cb(new Server(result.Server)));
}

async function fetchEntities(cb){
  fetchXMLStats(async(result)=>cb({
    server: new Server(await result[0].clone().json().then(s=>s.server) === undefined ? '' : await result[0].clone().json().then(s=>s.server)),
    slots: new Slots(await result[0].clone().json().then(s=>s.slots) === undefined ? 0 : await result[0].clone().json().then(s=>s.slots)),
    players: /*console.log(await result[0].clone().json().then(p=>p.slots.players)),*/ player.getPlayers(await result[0].clone().json().then(p=>p.slots.players) === undefined ? 0 : await result[0].clone().json().then(p=>p.slots.players)),
    vehicles: vehicle.getVehicles(await result[0].clone().json().then(v=>v.vehicles) ? null : await result[0].clone().json().then(v=>v.vehicles), await result[0].clone().json().then(s=>s.server.mapSize))
  }))
}

async function fetchCSG(cb){
  const result = await cringePromise('http://'+config.FSServer.PanelURL+'/feed/dedicated-server-savegame.html?code='+config.FSServer.APICode+'&file=careerSavegame', 'CSG')
  //const result = await fetch('http://'+config.FSServer.PanelURL+'/feed/dedicated-server-savegame.html?code='+config.FSServer.APICode+'&file=careerSavegame', {signal:RequestTimeout,headers:{'User-Agent':`${uaString+'CSG'}`}})
  //console.log(await result[0].text())
  const x:any = utility.c2json(await result[0].clone().text())
  cb(new Game(x))
}

export default {fetchMap, fetchServerOnly, fetchEntities, fetchCSG}