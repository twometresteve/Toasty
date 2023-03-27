import express from 'express';
import api from '../api';
import geo from '../libraries/geojson';
const router = express.Router();

router.get('/map.png', function (req: express.Request, res: express.Response, next) {
  api.fetchMap(async(map)=>{
    console.log('Map fetch in progress...');
    res.set({'Content-Type':'image/png'});
    console.log(await map.headers)
    res.send(await map.body)
  })
})

router.get('/geo.json', function (req: express.Request, res: express.Response, next) {
  api.fetchEntities((entities)=>{
    const objects = [geo.createObjects(entities.players), geo.createObjects(entities.vehicles)]
    res.json(geo.createGeoJSON(objects))
  })
})

export default router