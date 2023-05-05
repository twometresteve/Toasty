import utility from './libraries/utility';
import axios from 'axios';
import FS_Servers from './model/serverSchema';
import {version} from './libraries/version';
import config from '../config.json';
import {Config} from '../typings/config';
import {Server,Slots} from './model/server';
import Game from './model/game';
import player from './model/player';
import vehicle from './model/vehicle';

config as Config;
const uaString = `Toasty ${version}/`;

let changeServerTo = 'irtSilage';
let changeMapTo = config.Livemap.Map.Silage;

async function fetchServerFromDatabase(serverName:string){
  return await FS_Servers.findById(serverName);
}

function updateServerOnPathChange(){
  if (config.Livemap.PageURL === '/grain') {
    changeServerTo = 'irtGrain';
    changeMapTo = config.Livemap.Map.Grain
  } else if (config.Livemap.PageURL === '/silage') {
    changeServerTo = 'irtSilage';
    changeMapTo = config.Livemap.Map.Silage
  }
}

async function cringePromise(url:string, uaSuffix:string){
  return await Promise.all([await fetch(url, {headers:{'User-Agent':`${uaString+uaSuffix}`}})]).catch(err=>{
    if (['The operation was aborted due to timeout', 'Cannot read properties of undefined'].includes(err.name)) return process.exit();
  })
}

async function fetchMap(cb){
  const map = await axios.get(changeMapTo,{responseType:'arraybuffer', headers:{'User-Agent':`${uaString+'Map'}`}})
  cb(map)
}

async function fetchXMLStats(cb){
  updateServerOnPathChange();
  const server = await fetchServerFromDatabase(changeServerTo);
  const result = await cringePromise('http://'+server.ip+'/feed/dedicated-server-stats.json?code='+server.code, 'DSS');
  cb(result)
}

function fetchServerOnly(cb){
  updateServerOnPathChange();
  fetchXMLStats(async result=>cb(new Server(await result[0].clone().json().then(s=>s.server))));
}

function fetchEntities(cb){
  updateServerOnPathChange();
  fetchXMLStats(async(result)=>cb({
    server: new Server(await result[0].clone().json().then(s=>s.server)),
    slots: new Slots(await result[0].clone().json().then(s=>s.slots)),
    players: player.getPlayers(await result[0].clone().json().then(p=>p.slots.players)),
    vehicles: vehicle.getVehicles(await result[0].clone().json().then(v=>v.vehicles), await result[0].clone().json().then(s=>s.server.mapSize))
  }))
}

async function fetchCSG(cb){
  updateServerOnPathChange();
  const server = await fetchServerFromDatabase(changeServerTo);
  const result = await cringePromise('http://'+server.ip+'/feed/dedicated-server-savegame.html?code='+server.code+'&file=careerSavegame', 'CSG')
  const x:any = utility.c2json(await result[0].clone().text())
  cb(new Game(x))
}

export default {fetchMap, fetchServerOnly, fetchEntities, fetchCSG}