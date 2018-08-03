let mongoose = require("mongoose");

let accountSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  balance: Number,
  lastModified: Date,
  accountCreated: Date
});

let Account = mongoose.model('Account', accountSchema);

module.exports = Account;
