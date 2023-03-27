import lodash from 'lodash';
import utility from '../libraries/utility';
import icons from '../libraries/icons';

var mapSize;

function getVehicles(vehicles, map:number){
  const results = [];
  mapSize = map

  if (!Array.isArray(vehicles)) vehicles = [vehicles]

  vehicles.forEach(vehicle=>{
    if (!lodash.isEmpty(vehicle)) results.push(new Vehicle(vehicle))
  })
  return results
}

function Vehicle(vehicle){/*
  var vehicleReport = [];
  if (vehicle.controller == undefined) return;
  vehicleReport.push(['Equipment', vehicle]);
  console.log(vehicleReport);*/
  
  const coords = utility.calcCoords(mapSize, vehicle.x, vehicle.z)

  this.name = vehicle.name
  this.posx = coords.x
  this.posy = coords.y
  this.type = vehicle.type
  this.category = vehicle.category
  this.controller = vehicle.controller
  this.icon = icons.getIcon(vehicle)
  this.popup = icons.getIconPopup(vehicle)
}

export default {getVehicles, Vehicle}