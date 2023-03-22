
function createObjects(objects){
  const geos = [];
  objects.forEach((obj)=>{
    if (obj.posx != null){
      geos.push({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [obj.posx, obj.posy] }, properties: obj
      })
    }
  })
  return geos
}

function createGeoJSON(objects){
  const json = { type: 'FeatureCollection', features: objects }
  return json
}

export default {
  createObjects, createGeoJSON
}