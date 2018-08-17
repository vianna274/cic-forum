let express = require('express');
let router = express.Router();

let createRouter = (nav) => {

  router.use((req, res, next) => {
    next();
  });

  router.get('/', (req, res) => {
    res.render('login', {
      message: req.flash('message'),
      nav: nav,
      title: 'Login'
    });
  });

  return router;
}

module.exports = createRouter;
