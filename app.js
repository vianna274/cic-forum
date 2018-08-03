let express = require('express');
let bodyParser = require('body-parser');
// let cookieParser = require('cookie-parser');

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
    link: '/account',
    text: 'My Account'
  },
  {
    link: '/contact',
    text: 'Contact Us'
  }
];

let accountRouter = require('./src/routes/accountRoutes.js') (nav);
let signupRouter = require('./src/routes/signupRoutes.js') (nav);

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

app.use('/account', accountRouter);
app.use('/signup', signupRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
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
