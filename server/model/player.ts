import lodash from 'lodash';
import utility from '../libraries/utility';
import {PlayerProperty} from '../../typings/model';

function getPlayers(players){
  const results = [];
  players.forEach((player:PlayerProperty)=>{
    if (!lodash.isEmpty(player)) if (player._attributes.isUsed==false) results.push(new this.Player(player))
  })
  return results
}

function Player(player:PlayerProperty){
  const coords = utility.calcCoords(undefined,player._attributes.x, player._attributes.z)

  this.name = player._text
  this.uptime = utility.formatTime(player._attributes.uptime as number)
  this.admin = player._attributes.isAdmin
  this.posx = coords.x
  this.posy = coords.y
}

export default {getPlayers, Player}