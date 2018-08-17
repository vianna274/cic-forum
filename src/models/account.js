let mongoose = require("mongoose");
let passportLocalMongoose = require('passport-local-mongoose');

let accountSchema = new mongoose.Schema({
  username: String,
  password: String,
  gender: String,
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  birthday: Date,
  course: String,
  semesterJoined: String,
  lastModified: Date,
  accountCreated: Date
});
accountSchema.plugin(passportLocalMongoose);
let Account = mongoose.model('Account', accountSchema);

module.exports = Account;
