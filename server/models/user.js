let mongoose = require("mongoose");
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});
userSchema.plugin(passportLocalMongoose);
let User = mongoose.model('User', userSchema);

module.exports = User;
