// load the things we need
var mongoose = require('mongoose');
var db = require('./db-locations.js');
var UserSchedule = require('./models/user-schedule');
var Catalog = require('./catalog');
var findCatalog = require('./functions/findCatalog');
var Schedule = require('./models/schedule');
var Subject = require('./models/subject');
var Course = require('./models/subject-course');
var User = require('./models/user');


function scheduleIndexOf(o, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].schedule.id.toString() == o) {
            return i;
        }
    }
}

module.exports.getCourseSchedule = function (req, cb){
	var courseSchedule;
	
	db.open('school');
	Schedule
		.findOne({_id:req.body.grab})
		.exec(function(err, schedule){
			if(err){cb(err, null);return;}
			
			courseSchedule = schedule.getData();
			Course
				.findOne({_id:courseSchedule.course})
				.exec(function(err, course){
					if(err){cb(err, null);return;}

					courseSchedule.course = course.getData();
					Subject
						.findOne({_id:courseSchedule.course.subject})
						.exec(function(err, subject){
							db.close();
							if(err){cb(err, null);return;}

							courseSchedule.course.subject = subject.getData();
							db.open('user');
							User
								.findOne({_id:schedule.instructor})
								.exec(function(err, user){
									db.close();
									if(err){cb(err, null);return;}

									courseSchedule.instructor = user.getData();
									cb(null, courseSchedule);
									return;									
								});
						});
				});
		});
};

module.exports.userCurrentSessionSchedule = function (req, cb) {
	var mySchedule = [];
	Catalog.getCurrent(function(err, catalog){
		if(err){cb(err, null);return;}

	console.log('getting catalog id :' + catalog);
		db.open('user');
		UserSchedule
			.find({user: req.session.user.id, active: true, 'session.code': catalog})
			.populate({ path: 'user', select: '_id first last type' })
			.exec(function(err, history){
				if(err){cb(err, null);return;}
				
				for(i in history){
					mySchedule.push(history[i].getData());
				}
				if(req.session.user.type == 'teacher'){
					var j = 0;
					for(i in history){
						UserSchedule
							.find({'schedule.id':history[i].schedule.id, active: true})
							.populate({ path: 'user', match: { type: 'student'}, select: '_id first last type' })
							.exec(function(err, students){
								if(err){return cb(err, null);}
								var studentList = [];
								if(students.length > 1){
									for(k in students){
										if(students[k].user != null){
											//console.log(students[k].getData());
											studentList.push(students[k].getData());
										}
									}
								}
								var search = studentList.length ? scheduleIndexOf(studentList[0].schedule.id, mySchedule) : 'na';
								if(search !== 'na'){
									mySchedule[search].students = studentList;
								}
								j++;
								if(j == history.length){
									db.close();
									
									cb(null, mySchedule);
									return;
								}
							});
					}
				} else {
					db.close();
					
					cb(null, mySchedule);
					return;
				}
			});	
		});
};


module.exports.userNextSessionSchedule = function (req, cb) {
	var mySchedule = [];
	Catalog.getNext(function(err, catalog){
		if(err){cb(err, null);return;}
		console.log('getting catalog id :' + catalog);
		db.open('user');
		UserSchedule
			.find({user: req.session.user.id, active: true, 'session.code': catalog})
			.populate({ path: 'user', select: '_id first last type' })
			.exec(function(err, history){
				if(err){cb(err, null);return;}
				
				for(i in history){
					mySchedule.push(history[i].getData());
				}
				if(req.session.user.type == 'teacher'){
					var j = 0;
					for(i in history){
						UserSchedule
							.find({'schedule.id':history[i].schedule.id, active: true})
							.populate({ path: 'user', match: { type: 'student'}, select: '_id first last type' })
							.exec(function(err, students){
								if(err){return cb(err, null);}
								var studentList = [];
								if(students.length > 1){
									for(k in students){
										if(students[k].user != null){
											//console.log(students[k].getData());
											studentList.push(students[k].getData());
										}
									}
								}
								var search = studentList.length ? scheduleIndexOf(studentList[0].schedule.id, mySchedule) : 'na';
								if(search !== 'na'){
									console.log(studentList[0].schedule.id, search);
									mySchedule[search].students = studentList;
								}
								j++;
								if(j == history.length){
									console.log(mySchedule);
									db.close();
									
									cb(null, mySchedule);
									return;
								}
							});
					}
				} else {
					db.close();
					
					cb(null, mySchedule);
					return;
				}
			});	
		});
};

var inSchedule = function(obj, arr){
    for (var i = 0; i < arr.length; i++) {
    	console.log(arr[i].code, obj.code, arr[i].code == obj.code);
        if (arr[i].code == obj.code) {
            return true;
        }
    }
    return false;
};

module.exports.getUserCourseHistory = function (id, cb){
	var history = {};
	var courses = [];
	
	db.open('user');
	UserSchedule
		.find({user: id, active: true})
		.populate({path:'user', select:'first last email _id'})
		.exec(function(err, data){
			db.close();
			if(err){cb(err,null);return;}
			var sessions = [];
			
			for(i in data){
				courses.push(data[i].getData());
				if(!inSchedule(data[i].session, sessions)){
					sessions.push(data[i].session);
				}
			}
			history.sessions = sessions;
			history.courses = courses;
			return cb(null, history);
		});
};

module.exports.getUserSchedule = function(req, cb){
	db.open('user');
	UserSchedule
		.findOne({_id:req.body.grab})
		.populate({path:'user', select:'first last email _id'})
		.exec(function(err, data){
			console.log(err, data);
			db.close();
			if(err){cb(err,null);return;}
			
			
			return cb(null, data.getData());
		});
};


module.exports.addCourse = function(req, cb){

	var daily = {};
	daily.sun = req.body.sun;
	daily.mon = req.body.mon;
	daily.tue = req.body.tue;
	daily.wed = req.body.wed;
	daily.thur = req.body.thur;
	daily.fri = req.body.fri;
	daily.sat = req.body.sat;
	
	findCatalog.nextDetail(function(err, catalog){
		db.open('user');
		var schedule = new UserSchedule({
			user:	req.body.id,
		    session:    catalog,
		    schedule:{
		    	id:			req.body.scheduleid,
			    daily:       daily,
			    start_time:  req.body.start_time,
			    min_length:  req.body.min_length,
			    location:    req.body.location
		    },
		    course:      {
		    	id:		 req.body.courseid,
			  type:      req.body.type,
			  code:      req.body.coursecode,
		  	 units:      req.body.units,
	  		  name:      req.body.coursename,
	    instructor:      {first: req.body.instructorfirst,
	  			          last:  req.body.instructorlast} },
	  		active:  true,
			activity:''
		});
		
		schedule.save(function (err) {
	        db.close();
	        if (err){
	            return cb(err, null);
	        }
	        db.open('school');
	        Schedule
	        	.findOneAndUpdate({_id:req.body.scheduleid},{$inc: {registered: 1}},{},function(err, data){
	            	db.close();
	        		if (err){
	                    return cb(err, null);
	                }
	        		return cb(null, schedule.getData());
	        	});
	    });		
	});
	
	
};

module.exports.dropCourse = function(req, cb){
	var updateData = {
			activity:req.body.reason,
			active:false
	};

	db.open('user');
	UserSchedule.findOneAndUpdate({_id:req.body.id}, updateData, {}, function(err, user){
		db.close();
		if(err){return cb(err, null);}

        db.open('school');
        Schedule
        	.findOneAndUpdate({_id:user.schedule.id},{$inc: {registered: -1}},{},function(err, data){
            	db.close();
        		if (err){
                    return cb(err, null);
                }
        		return cb(null, user.getData());
        	});
	});
};
