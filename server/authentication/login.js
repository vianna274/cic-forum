let LocalStrategy = require('passport-local').Strategy;
let User = require('../models/user.js');
let bCrypt = require('bcrypt');

let isValidPassword = (user, password) => bCrypt.compareSync(password, user.password);
let createHash = (password) => bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
let instantiateUser = (username, password, req) => {
  let newUser = new User();
  newUser.username = username;
  newUser.password = createHash(password);
  newUser.firstName = req.body.firstName;
  newUser.lastName = req.body.lastName;

  return newUser;
}

let initPassport = (passport) => {
  passport.use('login', new LocalStrategy({passReqToCallback: true},
    async (req, username, password, done) => {
      try {
        let user = await User.findOne({'username': username});
        if (!user) {
          return done(null, false,
            req.flash('message', 'User Not found.'));
        }
        if (!isValidPassword(user, password)) {
          return done(null, false,
            req.flash('message', 'Invalid Password'));
        }
        console.log('Correct Password');
        return done(null, user);
      } catch(err) {
        console.log(err);
        return done(null, false,
          req.flash('message', err));
      }
    }));

  passport.use('signup', new LocalStrategy({passReqToCallback: true},
    async (req, username, password, done) => {
      let findOrCreateUser = async () => {
        try {
          let user = await User.findOne({'username': username});

          if (user) {
            console.log('User already exists');
            return done(null, false, req.flash('message', 'User Already Exists'));
          }
          let newUser = instantiateUser(username, password, req);
          await newUser.save();

          return done(null, newUser);
        } catch (err) {
          console.log(err);
          return done(null , false, req.flash('message', err));
        }
      };
      process.nextTick(await findOrCreateUser);
    }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}

module.exports = initPassport;
