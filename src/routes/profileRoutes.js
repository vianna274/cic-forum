let express = require('express');
let router = express.Router();
let isAuthenticated = require('../authentication/middleware.js');

let createRouter = (nav) => {
  router.use((req, res, next) => {
    if (!isAuthenticated(req)) {
      res.redirect('/');
    } else {
      return next();
    }
  });

  router.route('/')
    .get((req, res) => {
      try {
        res.render('profile', {
          title: 'My Account',
          nav: nav,
          user: req.user,
          message: req.flash('message')
        });
      } catch(err) {
        res.status(500).send(err);
      }
    });

  return router;
}

module.exports = createRouter;
