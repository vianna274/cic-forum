let express = require('express');
let bodyParser = require('body-parser');
let expressSession = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');
// let cookieParser = require('cookie-parser');

let app = express();
let initPassport = require('./src/passport/login.js');

let port = process.env.PORT || 3000;

let nav = [
  {
    link: '/',
    text: 'Home'
  },
  {
    link: '/signup',
    text: 'Sign Up'
  },
  {
    link: '/account',
    text: 'My Account'
  },
  {
    link: '/contact',
    text: 'Contact Us'
  }
];

app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: true}
));
app.use(flash());
initPassport(passport);
// let accountRouter = require('./src/routes/accountRoutes.js') (nav);
// let signupRouter = require('./src/routes/signupRoutes.js') (nav);
let passportRouter = require('./src/routes/passportRoutes.js') (passport, nav);

/* Use everything from /public/ as static */
app.use(express.static('public'));
/* Parser any request as a json*/
app.use(bodyParser.json());
/* Extended:true means a more complex parser algorithm*/
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/account', passportRouter);
// app.use('/signup', signupRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    nav: nav
  });
});
app.get('/2', (req, res) => {
  res.render('index', {
    title: 'Home22',
    nav: nav
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Running server on port ' + port);
  }
});
