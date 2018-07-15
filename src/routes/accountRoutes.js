let express = require('express');
// let mongoClient = require('mongodb').MongoClient;
// let objectId = require('mongodb').ObjectID;
let router = express.Router();

let user = {
  name: 'Leonardo',
  lastname: 'Vianna',
  balance: '5000',
  birthday: '26/03/1996'
}

let fakeBD = {
  user: user
}

let createRouter = (nav) => {
  router.use((req, res, next) => {
    // if (!req.user) {
    //   res.redirect('/');
    // } else {
    //   return next();
    // }
    next();
  });

  router.route('/')
    .get((req, res) => {
      try {
        // let url = 'DataBase url';
        // let db = await mongoClient.connect(url);
        // let collection = db.collection('something');
        // let results = await collection.find({}).toArray();
        res.render('account', {
          title: 'My Account',
          nav: nav,
          results: fakeBD
        });
      } catch(err) {
        console.log(err);
      }
    });


  return router;
}

module.exports = createRouter;
