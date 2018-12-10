let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');
let cookieParser = require('cookie-parser');
let path = require('path');
let cors = require('cors');

// let initPassport = require('./server/authentication/auth-strategies.js');

let app = express();

let port = process.env.PORT || 3000;


app.use(session({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: false}
));
// initPassport(passport);

app.use(cookieParser());
app.use(bodyParser.json()); // parse any request as a json
app.use(bodyParser.urlencoded({extended: true})); // extended means a more complex parser algorithm


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors());
require('./server/routes')(app);

app.get('*', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the CiC Forum API!'
  })
});

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log('Running server on port ' + port);
});
