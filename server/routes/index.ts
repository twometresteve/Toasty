import express from 'express';
import async from 'async';
import logger from '../libraries/logger';
const router = express.Router();

var _server = null

router.get('*', function(req:express.Request, res:express.Response, next){
  next();
  const ip = req.header['x-forwarded-for'] || req.socket.remoteAddress.replace('::ffff:', '')
  logger.info(ip + ' :: ' + req.originalUrl)
})

router.get('/', function(req:express.Request, res:express.Response, next){
})

export default router