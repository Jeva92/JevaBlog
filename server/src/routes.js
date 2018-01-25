import express from 'express';

import * as Posts from '../actions/posts';
import * as Auth from '../actions/auth'

export default function createRouter() {
  const router = express.Router();

  //Middleware to log stuff from each request
  router.use(function (req, res, next) {
    var now = new Date().toISOString();
    now = now.replace('T', ' ').substr(0, 19);
    console.log('New request from IP: ' + req.ip)
    console.log(now + ' UTC');
    console.log(req.method + ' : ' + req.originalUrl);
    console.log('--------------------------');
    next();
  })

  //Routes here
  router.get('/posts', Posts.posts);

  return router;
};
