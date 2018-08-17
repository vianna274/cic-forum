let LocalStrategy = require('passport-local').Strategy;
let Account = require('../models/account.js');
let bCrypt = require('bcrypt');

let isValidPassword = (user, password) => bCrypt.compareSync(password, user.password);
let createHash = (password) => bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
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
    async (req, username, password, done) => {
      try {
        let account = await Account.findOne({'username': username});
        if (!account) {
          return done(null, false,
            req.flash('message', 'User Not found.'));
        }
        if (!isValidPassword(account, password)) {
          return done(null, false,
            req.flash('message', 'Invalid Password'));
        }
        console.log('Correct Password');
        return done(null, account);
      } catch(err) {
        console.log(err);
        return done(null, false,
          req.flash('message', err));
      }
    }));

  passport.use('signup', new LocalStrategy({passReqToCallback: true},
    async (req, username, password, done) => {
      let findOrCreateAccount = async () => {
        try {
          let account = await Account.findOne({'username': username});
          let account1 = await Account.findOne({'email': req.body.email});

          if (account || account1) {
            console.log('User already exists');
            return done(null, false, req.flash('message', 'User Already Exists'));
          }
          let newAccount = instantiateAccount(username, password, req);
          await newAccount.save();
          return done(null, newAccount);
        } catch (err) {
          console.log(err);
          return done(null , false, req.flash('message', err));
        }
      };
      process.nextTick(await findOrCreateAccount);
    }));

  // passport.serializeUser(Account.serializeUser());
  // passport.deserializeUser(Account.deserializeUser());
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    Account.findById(id, function(err, user) {
      done(err, user);
    });
  });
}

module.exports = initPassport;
