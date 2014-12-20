// load the things we need
var mongoose = require('mongoose');
var db = require('./db-locations.js');


var Catalog = require('./models/school-session');
var findCatalog = require('./functions/findCatalog');
var Schedule = require('./models/schedule');
var Course = require('./models/subject-course');
var Subject = require('./models/subject');
var User = require('./user');

module.exports.create = function () {
	db.open('school');
	
	
	db.close();
};
 
module.exports.getCurrent = function (cb) {
	findCatalog.current(function(err, data){
		if(err){cb(err, null);return;}
		
		cb(null, data);
		return;
	});
};


module.exports.getNext = function (cb) {
	findCatalog.next(function(err, data){
		if(err){cb(err, null);return;}
		
		cb(null, data);
		return;
	});
};
 
module.exports.getCurrentDetail = function (cb) {
	findCatalog.currentDetail(function(err, data){
		if(err){cb(err, null);return;}
		
		cb(null, data);
		return;
	});
};


module.exports.getNextDetail = function (cb) {
	findCatalog.nextDetail(function(err, data){
		if(err){cb(err, null);return;}
		
		cb(null, data);
		return;
	});
};

function courseIndexOf(o, arr) {

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].course.toString() == o) {
            return i;
        }
    }
}

var getCourse = function(id, cb){
	Course
		.findOne({_id:id})
		.populate('subject')
		.exec(function(err, course){
			if(err){return cb(err,null);}	
			return cb(null, course.getData());
		});
};

var getCourses = function(schedulesObj, cb){
	var courses = [];
	//console.log(schedulesObj);
	for(var i in schedulesObj){
		var j = 0;
		getCourse(schedulesObj[i].course, function(err, course){
			if(err){return cb(err,null);}
			courses.push(course);
			
			if(j == i){
				return cb(null, courses);
			}
			j++;
		});
	}
};

var getCourseInstructor = function(id, cb){
	User.getUserById(id, function(err, teacher){
		if(err){return cb(err,null);}	
		
		return cb(null, teacher);
	});
};

var getCourseInstructors = function(schedulesObj, cb){
	//console.log(schedulesObj);
	for(i in schedulesObj){
		var j = 0;
		getCourseInstructor(schedulesObj[i].instructor, function(err, instructor){
			if(err){return cb(err,null);}	
			schedulesObj[j].instructor = instructor;
			if(i == j){
				return cb(null, schedulesObj);
			}
			j++;
		});
	}
};


module.exports.getCatalog = function (id, cb) {
	var catalog;
	var subjects = [];
	function isSubject(name){
	  for(var n in subjects){
	    if(subjects[n].code == name.code){
	      return true;
	    }
	  }
	  return false;
	}
	var getSubjects = function (schedules){
	  for(var n = 0; n < schedules.length; n++){
	    if(!isSubject(schedules[n].subject)){
	      subjects.push(schedules[n].subject);
	    }
	  }
	  return subjects;
	};
	// Find catalog object.
	db.open('school');
	Catalog
		.findOne({code:id})
		.exec(function(err, data){
			if(err){cb(err,null);return;}
			catalog = data.getData();
			
			// Find schedules assigned to catalog.
			Schedule
				.find({session:catalog.code})
				.exec(function(err, schedules){
					if(err){cb(err,null);return;}
					
					for(var n in schedules){
						if(schedules[n]){
							catalog.schedule[n] = schedules[n].getData();
						}
					}

					getCourses(catalog.schedule, function(err, courses){
						db.close();
						if(err){return cb(err,null);}
						db.open('user');
						for(var i in courses){
							var pos = courseIndexOf(courses[i].id, catalog.schedule);
							catalog.schedule[pos].course = courses[i];
						}
						//console.log(courses, catalog);
						catalog.subjects = getSubjects(courses);
						getCourseInstructors(catalog.schedule,function(err, schedule){
							console.log(schedule);
							db.close();
							if(err){return cb(err,null);}
							
							catalog.schedule = schedule;
							return cb(null, catalog);
						});
					});					
				});
		});
};


module.exports.getCatalogList = function (start, end, cb) {
	var catalogs = [];
	db.open('school');
	
	Catalog
		.find({start:{ $gte : start, $lt:end}})
		.exec(function(err, data){
			db.close();
			if(err){cb(err,null);return;}
			for(var i = 0; i < data.length(); i++){
				catalogs.push(data[i].getData());
			}
			cb(null, catalogs);
			return;
	});
	
};