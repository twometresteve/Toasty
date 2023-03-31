import express from 'express';
import async from 'async';
import logger from '../libraries/logger';
import api from '../api';
const router = express.Router();

var _server = null
  , _savegame = null;

router.get('*', function(req:express.Request, res:express.Response, next){
  async.parallel({
    game: function(cb){
      api.fetchCSG(res=>cb(null, res))
    },
    entities: function(cb){
      api.fetchEntities(res=>cb(null, res))
    }
  },
  function(err,results){
    _server = results.entities
    _savegame = results.game
    res.locals.isNewServer = _savegame.isNewServer
    next()
  })
  const ip = req.header('x-forwarded-for') || req.socket.remoteAddress.replace('::ffff:', '')
  logger.info(ip + ' :: ' + req.originalUrl)
})

router.get('/', function(req:express.Request, res:express.Response, next){
  res.render('serverlist.pug', {
    server: _server.server,
    name: _server.server.name = 'Toasty - Server list'
  })
})

router.get('/silage', function(req:express.Request, res:express.Response, next){
  res.render('home.pug',{
    game: _savegame,
    slots: _server.slots,
    server: _server.server,
    players: _server.players
  })
})

export default router