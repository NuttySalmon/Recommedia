var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose'),
    validators = require('mongoose-validators');
var uniqueValidator = require('mongoose-unique-validator');

//user schema
var UserSchema = mongoose.Schema({

    username: {
        type: String,
        index: true,
        unique: true
    },
    name: {
        type: String,
    },
    password: {
        type: String
    }

});

//UserSchema.plugin(uniqueValidator);

//UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

var User = module.exports = mongoose.model('User', UserSchema);


module.exports.createUser = function(newUser, callback) {

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });

    });

};


module.exports.getUserByUsername = function(username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
};


module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};


//validate password
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};