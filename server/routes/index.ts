import express from 'express';
import async from 'async';
import logger from '../libraries/logger';
import api from '../api';
const router = express.Router();

var _server = null

router.get('*', function(req:express.Request, res:express.Response, next){
  api.fetchEntities((entities)=>{
    _server = entities;
    next();
  })
  const ip = req.header['x-forwarded-for'] || req.socket.remoteAddress.replace('::ffff:', '')
  logger.info(ip + ' :: ' + req.originalUrl)
})

router.get('/', function(req:express.Request, res:express.Response, next){
  async.parallel({
    savegame: function(cb){
      api.fetchCSG((res)=>cb(null,res))
    }
  },
  function(err,results){
    res.render('home.pug',{
      game: results.savegame,
      slots: _server.slots,
      server: _server.server,
      players: _server.players
    })
  })
})

export default router