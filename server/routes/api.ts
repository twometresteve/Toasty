import express from 'express';
import api from '../api';
import geo from '../libraries/geojson';
const router = express.Router();

router.get('/map.jpg', function (req: express.Request, res: express.Response, next) {
  api.fetchMap((map)=>{
    res.set({'Content-Type':'image/png'});
    res.send(map?.body)
  })
})

router.get('/geo.json', function (req: express.Request, res: express.Response, next) {
  api.fetchEntities((entities)=>{
    const objects = [geo.createObjects(entities.players), geo.createObjects(entities.vehicles)]
    res.json(geo.createGeoJSON(objects))
  })
})

export default router