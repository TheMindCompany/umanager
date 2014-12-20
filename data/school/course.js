// load the things we need
var mongoose = require('mongoose');
var db = require('./db-locations.js');

var Course = require('./models/subject-course');

module.exports.create = function () {
	db.open('school', function(err){
		if(err !== undefined){return;}
	});
	
	
	db.close();
};

module.exports.getCourseList = function (cb) {
	var courses = [];
	
	db.open('school');
	Course
		.find({})
		.exec(function(err, data){
			db.close();
			if(err){cb(err,null);return;}
			
			for(i in data){
				courses.push(data[i].getData());
			}
			cb(null, courses);
			return;
		});
};
