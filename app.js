let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');
let cookieParser = require('cookie-parser');
let mongoose = require('mongoose');
let path = require('path');

let initPassport = require('./server/authentication/login.js');
let dbConfig = require('./server/configs/db.js');

let app = express();

let port = process.env.PORT || 3000;

mongoose.connect(dbConfig.url, dbConfig.options)

initPassport(passport);

app.use(express.static(path.join(__dirname, 'client/dist/client/')));
app.use(cookieParser());
app.use(bodyParser.json()); // parse any request as a json
app.use(bodyParser.urlencoded({extended: true})); // extended means a more complex parser algorithm

app.use(session({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: false}
));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


let apiRouter = require('./server/routes/apiRoutes.js') (passport);

app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/client/index.html'));
});

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log('Running server on port ' + port);
});
