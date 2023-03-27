import utility from './utility';
/**
 * All icons need to have the following format:
 * Filetype: png
 * Size: 32x32
 * 
 * Dimension should be between 10 and 32.
 * Default: 12 for equipment, 16 for pallets.
 */

const icons = {
  'default': {
    icon: 'default.png',
    desc: 'No icon',
    dimension: 12
  },
  'harvesters': {
    icon: 'harvester.png',
    desc: 'Harvester',
    dimension: 12
  },
  'forageharvesters': {
    icon: 'harvester.png',
    desc: 'Forage Harvester',
    dimension: 12
  },
  'foragewagon': {
    icon: 'trailer.png',
    desc: 'Loading Wagon',
    dimension: 12
  },
  'tractorsl': {
    icon: 'vehicle.png',
    desc: 'Large Tractors',
    dimension: 12
  },
  'tractorsm': {
    icon: 'vehicle.png',
    desc: 'Medium Tractors',
    dimension: 12
  },
  'tractorss': {
    icon: 'vehicle.png',
    desc: 'Small Tractors',
    dimension: 12
  },
  'miscvehicles': {
    icon: 'ropa.png',
    desc: 'Misc. Vehicles',
    dimension: 12
  },
  'windrower': {
    icon: 'tool.png',
    desc: 'Windrowers',
    dimension: 12
  },
  'planters': {
    icon: 'tool.png',
    desc: 'Planters',
    dimension: 12
  }
}

const types = {
  'default': icons.default,
  'harvesters': icons.harvesters,
  'forageharvesters': icons.forageharvesters,
  'foragewagon': icons.foragewagon,
  'tractorsl': icons.tractorsl,
  'tractorsm': icons.tractorsm,
  'tractorss': icons.tractorss,
  'miscvehicles': icons.miscvehicles,
  'windrower': icons.windrower,
  'planters': icons.planters,
}

function getIcon(object){
  if (icons.hasOwnProperty(object.category.toLowerCase())) return icons[object.category.toLowerCase()]
  else if (icons.hasOwnProperty(object.type.toLowerCase())) return icons[object.type.toLowerCase()]
  return icons['default']
}

function getIconPopup(object){
  var popup = '<b>'+ object.name +'</b>';
  popup += '<small>';

  if (!isNaN(utility.filterFloat(object.fillLevels))){
    if (object.fillTypes.toLowerCase() != 'unknown') popup += '<br><span style="text-transform: capitalize;">'+ object.fillTypes.toLowerCase() +'</span> ('+ object.fillLevels +')'
    else if (object.fillTypes.toLowerCase() == 'unknown') popup += '<br>Empty'
  }

  if (object.isAIActive == 'true') popup += '<br>Helper: Active'
  if (object.controller) popup += '<br>Player: '+ object.controller

  popup += '</small>'
  return popup;
}

export default exports = {
  icons: icons,
  type: types,
  getIcon: getIcon,
  getIconPopup: getIconPopup
}