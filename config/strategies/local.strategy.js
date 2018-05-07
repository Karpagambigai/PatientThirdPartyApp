var passport = require('passport'),
 { Strategy } = require('passport-local'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/patientAPI');
var User = require('../../models/userModel');
var debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
  console.log("in local starategu");
  passport.use(new Strategy(
    {
      usernameField : 'username',
      passwordField: 'password',
    }, function(username, password, done){
      debug("before query atleast")
      User.findOne({username}, function (err, user) {
        debug(user);
        debug("signing in");
        debug(err);
        if (user.password === password) {
          done(null, user);
        }
        else {
          done(null, false);
        }
      });
      var user = {username, password};
      done(null, user);
    }
  ));

}
