module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var backURL;
	
	
	router.get('/history', function (req, res, next){data.user.grant.StudentTeacher(req, res, next);}, function(req, res, next) {
		if(req.session.user.type == 'teacher'){
			res.redirect('/catalog/schedule');
		} else {
			var id = req.body.grab ? req.body.grab : req.session.user.id;
			data.schedule.getUserCourseHistory(id, function(err, history){
				if(err){
					res.render('history', { school: req.session.school, title: 'Student Transcript', user: req.session.user, history: {schedule:{code: ''}, course:{code:''}}});			
				}else{
					res.render('history', { school: req.session.school, title: 'Student Transcript', user: req.session.user, history: history });		
				}
			});
		}
	});
	
	router.post('/history/:id', function (req, res, next){data.user.grant.StudentTeacherAdmin(req, res, next);}, function(req, res, next) {
		var id = req.body.grab ? req.body.grab : req.params.id;
		console.log(id);
		data.schedule.getUserCourseHistory(id, function(err, history){
			if(err){
				res.render('history', { school: req.session.school, title: 'Student Transcript', user: req.session.user, history: {schedule:{code: ''}, course:{code:''}}});			
			}else{
				res.render('history', { school: req.session.school, title: 'Student Transcript', user: req.session.user, history: history });		
			}
		});
	});


	function inSchedule(o, arr) {
	    for (var i = 0; i < arr.length; i++) {
	    	//console.log(arr[i].course.id.toString(), o.course.id.toString(),arr[i].course.id.toString() == o.course.id.toString());
	        if (arr[i].course.id.toString() == o.course.id.toString()) {
	            return true;
	        }
	    }
	    return false;
	}
	/* GET/POST class to schedule page. */
	router.get('/add', function (req, res, next){data.user.grant.StudentAdmin(req, res, next);}, function(req, res, next) {
		res.redirect('/catalog');
	}).post('/add', function (req, res, next){data.user.grant.StudentAdmin(req, res, next);}, function(req, res, next) {
		data.schedule.getCourseSchedule(req, function(err, schedule){
			if(err){
				console.log(err);
				res.render('addrequest', { school: req.session.school, title: 'Confirm Add Course', user: req.session.user, schedule:{code:'', course:{code:''}}});
			}
			data.schedule.userNextSessionSchedule(req, function(err, mySchedule){
				if(err){
					console.log(err);
					res.render('addrequest', { school: req.session.school, title: 'Confirm Add Course', user: req.session.user, schedule:{code:'', course:{code:''}}});
				}
				if(inSchedule(schedule, mySchedule)){
					res.render('addrequest', { school: req.session.school, title: 'Confirm Add Course', user: req.session.user, schedule: schedule, enrolled:'You are already enrolled.' });					
				} else {
					res.render('addrequest', { school: req.session.school, title: 'Confirm Add Course', user: req.session.user, schedule: schedule });					
				}
			});
		});
	}).post('/add/complete', function (req, res, next){data.user.grant.Student(req, res, next);}, function(req, res, next) {
		data.schedule.addCourse(req, function(err, schedule){
			res.redirect('/catalog/schedule');
		});
	});

	/* GET/POST drop to schedule page. */
	router.get('/drop', function (req, res, next){data.user.grant.StudentTeacher(req, res, next);}, function(req, res, next) {
		res.redirect('/catalog/schedule');
	}).post('/drop', function (req, res, next){data.user.grant.StudentTeacher(req, res, next);}, function(req, res, next) {		
		data.schedule.getUserSchedule(req, function(err, schedule){
			if(err){
				res.render('drop', { school: req.session.school, title: 'Confirm Drop Course', user: req.session.user , schedule: {schedule:{code: ''}, course:{code:''}}});			
			}else{
				res.render('drop', { school: req.session.school, title: 'Confirm Drop Course', user: req.session.user, schedule: schedule });
			}
		});
	}).post('/drop/complete', function (req, res, next){data.user.grant.StudentTeacher(req, res, next);}, function(req, res, next) {		
		data.schedule.dropCourse(req, function(err, schedule){
			res.redirect('/catalog/schedule');
		});
	});
	
	return router;
};
