let express = require('express');

let app = express();

let port = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Running server on port ' + port);
  }
});
