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
          return done(null, false , {errorFront: 'User does not exist'});
        }
        if (!isValidPassword(user, password)) {
          return done(null, false, {errorFront: 'Invalid password try again'} );
        }
        req.login(user, (error) => {
          if (error) return done(null, false, {errorFront: 'Database Failed'});
          console.log("Request Login supossedly successful.");
          return done(null, user);
        });
      } catch(err) {
        console.log(err);
        return done(err, false);
      }
    }));

  passport.use('register', new LocalStrategy({passReqToCallback: true},
    async (req, username, password, done) => {
      let findOrCreateUser = async () => {
        try {
          let user = await User.findOne({'username': username});

          if (user) {
            return done(null, false, {errorFront: 'User already exists'} );
          }
          let newUser = instantiateUser(username, password, req);
          await newUser.save();
          req.login(user, (error) => {
            if (error) return done(null, false, {errorFront: 'Database Failed'});
            console.log("Request Register supossedly successful.");
            return done(null, user);
          });
        } catch (err) {
          console.log(err);
          return done(err, false);
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
