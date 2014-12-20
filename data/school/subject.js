// load the things we need
var mongoose = require('mongoose');
var db = require('./db-locations.js');

var Subject = require('./models/subject');

var newSubject = require('./functions/subjectNew');

var backURL;

module.exports.create = function (req, cb) {
	db.open('school');
	
	newSubject(req, function(err, id){
		if(err){
			console.log(err);
			db.close();
			cb(err,null);
			return;
		} else {
			db.close();
			cb(null, id);
			return;
		}
	});
};

module.exports.getSubjects = function (cb) {
	db.open('school');
	
	Subject
		.find({})
		.exec(function(err, subjects){
			if(err){
				db.close();
				console.log(err);
				cb(err,null);
				return;
			} else {
				db.close();
				cb(null, subjects);
				return;
			}
	});
	
};