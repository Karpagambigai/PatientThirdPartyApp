var express = require('express');

var routes = function (Patientthirdpartyuser) {
    var thirdPartyRouter = express.Router();
    var thirdPartyController = require('../controllers/thirdPartyController')(Patientthirdpartyuser);

    thirdPartyRouter.route('/')
        .get(thirdPartyController.get)
        .post(thirdPartyController.post);

    thirdPartyRouter.use('/:thirdpartyid', thirdPartyController.returnOne);

    thirdPartyRouter.route('/:thirdpartyid')
        .get(thirdPartyController.getOne)
        .put(thirdPartyController.put)
        .patch(thirdPartyController.patch)
        .delete(thirdPartyController.delete);

    return thirdPartyRouter;
};

module.exports = routes;
