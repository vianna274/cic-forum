let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Account = require('../models/account.js');

let user = {
  name: 'Leonardo',
  lastname: 'Vianna',
  balance: '5000',
  birthday: '26/03/1996'
}

let fakeBD = {
  user: user
}

let createRouter = (nav) => {
  router.use((req, res, next) => {
    // if (!req.user) {
    //   res.redirect('/');
    // } else {
    //   return next();
    // }
    next();
  });

  router.route('/')
    .get(async (req, res) => {
      try {
        let dbUrl = 'mongodb://localhost:27017/LEO_BANK';

        await mongoose.connect(dbUrl);

        let accounts = await Account.find({});
        console.log(accounts);
        res.render('account', {
          title: 'My Account',
          nav: nav,
          results: fakeBD
        });
      } catch(err) {
        res.status(500).send(err);
      }
    });


  return router;
}

module.exports = createRouter;
