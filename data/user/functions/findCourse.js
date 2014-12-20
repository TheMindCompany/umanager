var Course = require('./../models/subject-course');
var db = require('./../db-locations');

module.exports.course = function(id, cb){
	var course;

	db.open('school');
	Course
		.findOne({_id:id})
		.populate('subject')
		.exec(function(err, data){
			db.close();
			if(err){cb(err,null);return 0;}
			
			course = data.getData();
			cb(null, course);
			return course;
		});
};

module.exports.getCourse = function(id, cb){
	var course;

	db.open('school');
	Course
		.findOne({_id:id})
		.populate('subject')
		.exec(function(err, data){
			db.close();
			if(err){cb(err,null);return;}
			
			course = data.getData();
			cb(null, course);
			return;
		});
};

module.exports.fillCourseSchedule = function(schedules, cb){
	
	db.open('school');
	for(var i = 0; i < schedules.length; i++){
		Course
			.findOne({_id:schedules[i].course})
			.populate('subject')
			.exec(function(err, data){
				console.log(i, err, data);
				
				if(err){cb(err,null);return;}
				//schedules[i].course = data;
			});
	}
	db.close();
	
	cb(null, schedules);
	return;
};
