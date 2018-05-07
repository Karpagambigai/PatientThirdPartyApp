var should = require('should'),
    request = require('supertest'),
    app = require('../app'),
    mongoose = require('mongoose'),
    Patientthirdpartyuser = mongoose.model('Patientthirdpartyuser'),
    agent = request.agent(app);

describe('User Crud Test', function () {
    it('Should allow a user to be added and return a permission and _id', function (done) {
        var newUser = {name: 'New User', patientname: 'Test Patient', email: 'testemail@gmail.com'};

        agent.post('/api/thirdparty')
            .send(newUser)
            .expect(200)
            .end(function (err, results) {
               results.body.permission.should.equal(1);
               results.body.should.have.property('_id');
               done();
            });

        afterEach(function (done) {
          Patientthirdpartyuser.remove().exec();
            done();
        })
    })
})
