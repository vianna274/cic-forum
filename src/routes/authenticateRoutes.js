let express = require('express');
let router = express.Router();

let createRouter = (passport) => {

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  router.get('/signout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  return router;
}

module.exports = createRouter;
