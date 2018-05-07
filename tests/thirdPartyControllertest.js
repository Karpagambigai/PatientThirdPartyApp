var should = require('should'),
    sinon = require('sinon');

describe('ThirdParty Controller Tests', function () {
    describe('Post', function () {
        it('should not allow a empty name on post', function () {
            var Patientthirdpartyuser = function (patientthirdpartyuser) {
                this.save = function () {}
            }

            var req = {
                body: {
                    patientname: 'Test Patient'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var thirdpartyController = require('../controllers/thirdpartyController')(Patientthirdpartyuser);
            thirdpartyController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Name is required').should.equal(true);
        })
    })
})
