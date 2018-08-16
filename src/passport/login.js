let LocalStrategy = require('passport-local').Strategy;
let Account = require('../models/account.js');
let bCrypt = require('bcrypt');
let mongoose = require("mongoose");
let dbUrl = require('../configs/db.js').url;

let isValidPassword = (user, password) => bCrypt.compareSync(password, user.password);
let createHash = (password) => bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
let isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
let instantiateAccount = (username, password, req) => {
  let newAccount = new Account();
  newAccount.username = username;
  newAccount.password = createHash(password);
  newAccount.gender = req.body.gender;
  newAccount.firstName = req.body.firstName;
  newAccount.lastName = req.body.lastName;
  newAccount.email = req.body.email;
  newAccount.age = req.body.age;
  newAccount.course = req.body.course;
  newAccount.semesterJoined = req.body.semesterJoined;
  newAccount.course = req.body.course;
  newAccount.lastModified = req.body.lastModified;
  newAccount.accountCreated = req.body.accountCreated;

  return newAccount;
}

let initPassport = (passport) => {

  passport.use('login', new LocalStrategy({passReqToCallback: true},
    (req, username, password, done) => {
      // check in mongo if a user with username exists or not
      Account.findOne({'username': username},
        function(err, user) {
          // In case of any error, return using the done method
          if (err) {
            return done(err);
          }
          // Username does not exist, log error & redirect back
          if (!user) {
            console.log('User Not Found with username ' + username);
            return done(null, false,
              req.flash('message', 'User Not found.'));
          }
          // User exists but wrong password, log the error
          if (!isValidPassword(user, password)) {
            console.log('Invalid Password');
            return done(null, false,
              req.flash('message', 'Invalid Password'));
          }
          // User and password both match, return user from
          // done method which will be treated like success
          return done(null, user);
        });
    }));

  passport.use('signup', new LocalStrategy({passReqToCallback: true},
    (req, username, password, done) => {
      let findOrCreateAccount = async () => {
        try {
          let option = {
            useNewUrlParser: true
          };
          await mongoose.connect(dbUrl, option);
          let account = await Account.findOne({'username': username});
          let account1 = await Account.findOne({'email': req.body.email});

          if (account || account1) {
            console.log('User already exists');
            return done(null, false, req.flash('message', 'User Already Exists'));
          }
          let newAccount = instantiateAccount(username, password, req);
          await newAccount.save();
          console.log(newAccount);
          return done(null, newAccount);
        } catch (err) {
          console.log(err);
          return done(null , false, req.flash('message', err));
        }
      };
      process.nextTick(findOrCreateAccount);
    }));

  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());
}

module.exports.isAuthenticated = isAuthenticated;
module.exports = initPassport;
