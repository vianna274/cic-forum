let express = require('express');
let router = express.Router();
let User = require('../models/user.js');
let auth = require('../authentication/middleware.js');

let createRouter = (passport) => {

  router.post('/users/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401);
        res.end(info.errorFront);
        return res;
      }
      res.json(user);
    })(req, res, next);
  });

  router.post('/users/register', passport.authenticate('signup', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true
  }));

  router.get('/users', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  router.get('/users/:id', async (req, res) => {
    let users = await User.find({});
    res.json(users);
  });

  router.put('/users/:id', async (req, res) => {
    let users = await User.find({});
    res.json(users);
  });

  router.delete('/users/:id', async (req, res) => {
    let users = await User.find({});
    res.json(users);
  });

  router.get('/auth', (req, res) => {
    if (req.isAuthenticated()) res.json(req.user);
    else res.send(200, null);
  });

  router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) res.status(401);
      req.logout();
      res.send(200, null);
    });
  });

  return router;
}

module.exports = createRouter;
