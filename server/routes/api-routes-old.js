let express = require('express');
let router = express.Router();
let User = require('../models/user.js');

let createRouter = (passport) => {

  router.post('/users/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      console.log(req.body);
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401, info.errorFront);
        return res;
      }
      res.json(user);
    })(req, res, next);
  });

  router.post('/users/register', passport.authenticate('register', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true
  }));

  router.get('/users', async (req, res) => {
    try {
      let users = await User.find({});
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(401).send(err);
    }
  });

  router.get('/users/:id', async (req, res) => {
    try {
      let user = await User.findById(req.body.id);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(401).send(err);
    }
  });

  router.put('/users/:id', async (req, res) => {
    try {
      let user = await User.findByIdAndUpdate(req.body.id, req.body.user);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(401).send(err);
    }
  });

  router.delete('/users/:id', async (req, res) => {
    try {
      let user = await User.findByIdAndRemove(req.body.id);
      if (!user) {
        return res.status(401).send("User not found with id " + req.params.id);
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(401).send(err);
    }
  });

  router.get('/auth', (req, res) => {
    if (req.isAuthenticated()) res.json(req.user);
    else res.status(200).send(null);
  });

  router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) res.status(401).send(err);
      req.logout();
      res.status(200).send(null);
    });
  });

  return router;
}

module.exports = createRouter;
