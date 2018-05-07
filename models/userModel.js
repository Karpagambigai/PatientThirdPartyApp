var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var usermodel = new Schema({
    username: {type: String},
    password: {type: String}
});

module.exports = mongoose.model('User', usermodel);
