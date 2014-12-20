module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var backURL;
	
	/* GET catalog page. */
	router.get('/', function(req, res, next) {
		data.catalog.getNext(function(err, id){
			if(err){
				console.log(err);
				backURL=req.header('Referer') || '/';
				res.redirect(backURL);
				next({error:err});
			} else {
				data.catalog.getCatalog(id, function(err, catalog){
					if(err){
						console.log(err);
						next({error:err});
					} else {
						res.render('catalog', { school: req.session.school, title: 'Class Catalog', user: req.session.user, catalog: catalog });
					}
				});
			}
		});
	});
	

	/* GET schedule page. */
	router.get('/schedule', function (req, res, next){data.user.grant.StudentTeacher(req, res, next);}, function(req, res, next) {
		data.schedule.userCurrentSessionSchedule(req, function(err, dataOne){
			data.schedule.userNextSessionSchedule(req, function(err, dataTwo){
				if(err){
					console.log(err);
					res.render('schedule', { school: req.session.school, title: 'My Schedule', user: req.session.user, schedule: {user: req.session.user.id, session:{code:'Not Registered In Any Class'}, course: {code: 'None.'}}});
				} else {
					res.render('schedule', { school: req.session.school, title: 'My Schedule', user: req.session.user, schedule: dataOne, pending: dataTwo });
				}				
			});
		});
	});

	/* GET add page. */
	router.get('/addcourse', function (req, res, next){data.user.grant.Admin(req, res, next);}, function(req, res, next) {
		data.subject.getSubjects(function (err, data){
			if(err){
				console.log(err);
				res.render('addcourse', { school: req.session.school, title: 'UM | Add Class Schedule', user: req.session.user, subjects: {code: '', name: '', description: ''}});
			} else {
				res.render('addcourse', { school: req.session.school, title: 'UM | Add Class Schedule', user: req.session.user, subjects: data });
			}
		});
	});

	/* GET add page. */
	router.get('/addschedule', function (req, res, next){data.user.grant.Admin(req, res, next);}, function(req, res, next) {
		data.course.getCourseList(function(err, courses){
			if(err){
				console.log(err);
				res.render('addschedule', { school: req.session.school, title: 'UM | Class Scheduled added', user: req.session.user, courses:{} });
			} else {
				res.render('addschedule', { school: req.session.school, title: 'UM | Class Scheduled added', user: req.session.user, courses:courses });
			}
		});
	});

	return router;
};