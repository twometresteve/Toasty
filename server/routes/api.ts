import express from 'express';
import api from '../api';
import geo from '../libraries/geojson';
const router = express.Router();

router.get('/map.jpg', function (req: express.Request, res: express.Response, next) {
  api.fetchMap(async(map)=>{
    res.set({'Content-Type':'image/png'});
    res.send(await map.data)
  })
})

router.get('/geo.json', function (req: express.Request, res: express.Response, next) {
  api.fetchEntities(entities=>res.json(geo.createGeoJSON(geo.createObjects(entities.vehicles))))
})

router.get('/serverstats.json', function (req: express.Request, res: express.Response, next){
  api.fetchCSG(csg=>res.json({'careerSavegame':csg}))
})

export default router