var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose'),
	 validators = require('mongoose-validators');

//user schema
var PageSchema = mongoose.Schema({

	title:{
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

module.exports.createPage = function (newPage, callback) {
    newPage.save(function(err, callback){
    		console.log("test");
    		if (err) return console.error(err);
    	})
	};

module.exports.getPageById = function(id, callback){
	Page.findById(id, callback);
}


