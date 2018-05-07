var express = require('express');

var routes = function () {
  var authRouter = express.Router();
  var authController = require('../controllers/authController')();

  authRouter.use('/profile', authController.authenticateduser);
  authRouter.route('/signUp')
      .post(authController.post);
  
  authRouter.route('/profile')
      .get(authController.profileget);

  authRouter.route('/signin')
      .get(authController.signinget);
  
  authRouter.route('/signin')
      .post(authController.signinpost);

  return authRouter;
};

module.exports = routes;
