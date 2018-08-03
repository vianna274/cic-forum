let express = require('express');
let router = express.Router();
let mongoose = require("mongoose");
let Account = require('../models/account.js');

let _signup = async (req, res) => {

  const account = new Account({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
    balance: req.body.balance,
    lastModified: Date.now(),
    accountCreated: Date.now()
  });

  try {
    let dbUrl = 'mongodb://localhost:27017/LEO_BANK';

    await mongoose.connect(dbUrl);
    let alreadyExist = await Account.find({email: req.body.email});
    if (alreadyExist) {
      res.redirect('/emailOnUse');
    } else {
      await account.save();
      res.redirect('/accountCreated');
    }
  } catch (err) {
    res.status(500).send(err);
  }

}

let createRouter = (nav) => {
  router.use((req, res, next) => {
    next();
  });

  router.route('/')
    .get((req, res) => {
      try {
        res.render('signup', {
          title: "Sign Up",
          nav: nav
        });
      } catch(err) {
        res.status(500).send(err);
      }
    })
    .post((req, res) => {
      try {
        _signup(req, res);
      } catch(err) {
        res.status(500).send(err);
      }
    });

  return router;
}

module.exports = createRouter;
