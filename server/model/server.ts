import {ServerTyping,SlotsTyping} from '../../typings/model';

export function Server(server:ServerTyping){
  this.name=(server == undefined ? 'Unknown Host' : server.name)
  this.version=(server == undefined ? '0.0.0.0' : server.version)
}

export function Slots(slots:SlotsTyping){
  this.onlineCount=(slots.numUsed == undefined ? '0' : slots.numUsed)
  this.maxCount=(slots.capacity == undefined ? '0' : slots.capacity)
}