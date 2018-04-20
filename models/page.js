var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose'),
    validators = require('mongoose-validators');

//page schema
var PageSchema = mongoose.Schema({

    title: {
        type: String,
    },
    type: {
        type: String,
    },
    details: {
        type: String
    }

});



var Page = module.exports = mongoose.model('Page', PageSchema);


//create new page
module.exports.createPage = function(newPage, callback) {
    newPage.save(function(err, callback) {
        if (err) return console.error(err);
    });
};

//get page by its id
module.exports.getPageById = function(id, callback) {
    Page.findById(id, callback);
};