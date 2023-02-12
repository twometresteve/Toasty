import express from 'express';
const router = express.Router();

router.get('/deez', function (req: express.Request, res: express.Response, next) {
  res.set({ 'Content-Type': 'application/json' });
  res.json({ 'deez': 'nuts' })
})

export default router