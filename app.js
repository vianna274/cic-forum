let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');
let cookieParser = require('cookie-parser');
let mongoose = require('mongoose');

let initPassport = require('./src/authentication/login.js');
let dbConfig = require('./src/configs/db.js');

let app = express();

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
    link: '/profile',
    text: 'Profile'
  },
  {
    link: '/login',
    text: 'Login'
  },
  {
    link: '/contact',
    text: 'Contact Us'
  }
];

mongoose.connect(dbConfig.url, dbConfig.options)

initPassport(passport);

app.use(express.static('public')); // Use everything from /public/ as static
app.use(cookieParser());
app.use(bodyParser.json()); // Parser any request as a json
app.use(bodyParser.urlencoded({extended: true})); // means a more complex parser algorithm

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(session({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: false}
));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


let authenticateRouter = require('./src/routes/authenticateRoutes.js') (passport);
let signupRouter = require('./src/routes/signupRoutes.js') (nav);
let loginRouter = require('./src/routes/loginRoutes.js') (nav);
let profileRouter = require('./src/routes/profileRoutes.js') (nav);

app.use('/account', authenticateRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    nav: nav,
    message: req.flash('message')
  });
});

app.get('/failed', (req, res) => {
  res.render('index', {
    title: 'Failed',
    nav: nav,
    message: req.flash('message')
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Running server on port ' + port);
  }
});
