import {ServerTyping,SlotsTyping} from '../../typings/model';

export function Server(server:ServerTyping){
  this.name=(server.name)
  this.version=(server?.version === '' ? '0.0.0.0' : server.version)
}

export function Slots(slots:SlotsTyping){
  this.onlineCount=(slots.used == undefined ? '0' : slots.used)
  this.maxCount=(slots.capacity == undefined ? '0' : slots.capacity)
}