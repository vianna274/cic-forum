let express = require('express');
let router = express.Router();

let createRouter = (passport, nav) => {
  router.get('/', (req, res) => {
    res.render('signup', {
      message: req.flash('message'),
      nav: nav,
      title: 'Account'
    });
  });

  router.post('/login', passport.authenticate('login', {
    sucessRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
  }));

  router.get('/signup', (req, res) => {
    res.render('register', {message: req.flash('message')});
  });

  router.post('/signup', passport.authenticate('signup', {
    sucessRedirect: '/',
    failureRedirect: '/account',
    failureFlash: true
  }));

  router.get('/signout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  return router;
}

module.exports = createRouter;
