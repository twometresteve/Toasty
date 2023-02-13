import lodash from 'lodash';
import utility from '../libraries/utility';
import icons from '../libraries/icons';
import {VehicleProperty} from '../../typings/model';

var mapSize;

function getVehicles(vehicles:string[], map:string){
  const results = [];
  mapSize = map

  if (!Array.isArray(vehicles)){
    vehicles = [vehicles]
  }

  vehicles.forEach(vehicle=>{
    if (!lodash.isEmpty(vehicle)){
      results.push(new this.Vehicle(vehicle))
    }
  })
  return results
}

function Vehicle(vehicle:VehicleProperty){
  const coords = utility.calcCoords(mapSize, vehicle._attributes.x, vehicle._attributes.z)

  this.name = vehicle._attributes.name
  this.posx = coords.x
  this.posy = coords.y
  this.type = vehicle._attributes.type
  this.category = vehicle._attributes.category
  this.controller = vehicle._attributes.controller
  this.icon = icons.getIcon(vehicle._attributes)
  this.popup = icons.getIconPopup(vehicle._attributes)
}

export default {
  getVehicles, Vehicle
}