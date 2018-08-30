let express = require('express');
let router = express.Router();
let User = require('../models/user.js');

let createRouter = (passport) => {

  router.post('/users/login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

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

  return router;
}

module.exports = createRouter;
