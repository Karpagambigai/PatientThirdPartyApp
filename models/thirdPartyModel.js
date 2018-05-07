var mongoose = require('mongoose'),
    passport = require('passport');
    require('../config/strategies/local.strategy')();

var debug = require('debug')('app:authController');
var authController = function () {
  var post = function (req, res) {
      var db = mongoose.connect('mongodb://localhost/patientAPI');
      var User = require('../models/userModel');
      var newuser = new User(req.body);
      newuser.save();
      req.login(newuser, function(){
        res.redirect('/auth/profile');
      });
  };

  var signinget = function(req, res) {
    res.render('signin', {
      nav: [{ link: '/users', title: 'ThirdParty Users' }],
      title: 'Sign In',
    });

  };
  var profileget = function (req,res) {
      res.json(req.user);
  };

  var signinpost = function() {
      passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/'
      });
  };

  var authenticateduser = function(req, res, next) {
    if (req.user) {
      next();
    }
    else {
      res.redirect('/');
    }
  };
  
  return {
    post: post,
    profileget: profileget,
    signinget: signinget,
    signinpost: signinpost,
    authenticateduser: authenticateduser
  }
};

module.exports = authController;
