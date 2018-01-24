import express from 'express';

export default function createRouter() {
  const router = express.Router();
  router.get('/', function(req,res) { res.send('asdasdasd')});
  return router;
}
