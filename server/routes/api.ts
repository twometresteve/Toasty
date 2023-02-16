import express from 'express';
import api from '../api';
const router = express.Router();

router.get('/map.jpg', function (req: express.Request, res: express.Response, next) {
  api.fetchMap((map)=>{
    res.set({'Content-Type':'image/png'});
    res.send(map?.body)
  })
})

export default router