module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var backURL;
	
	/* POST credentials page. */
	router.post('/', function(req, res, next) {
		var user;
		data.user.authenticate(req, res, function(err){
			if(err){
				console.log(err);
				backURL=req.header('Referer') || '/';
				res.redirect(backURL);
			} else {
				if(req.session.user.type != 'admin'){
					res.redirect('/catalog/schedule');
				} else if(req.session.user.type != 'applicant'){
					res.redirect('/catalog');
				} else {
					res.redirect('/manage/applications');
				}
			}
		});
	});
	
	/* GET sign-out credentials page. */
	router.get('/signout', function(req, res, next) {
		data.user.deauthenticate(req, res, function (err){
			if(err){
				console.log(err);
				next(null, false, 'There was a problem signing you out correctly.');
			}
			res.redirect('/');
		});
	});

	/* POST register page. */
	router.post('/create', function(req, res, next) {
		data.user.create(req, function(err){
			if(err){
				console.log(err);
				next(null, false, {error:err});
			}
		});
		res.redirect('/');
	});

	/* POST password reset page. */
	router.post('/create/reset', function (req, res, next){data.user.grant.StudentTeacherAdmin(req, res, next);}, function(req, res, next) {
		backURL=req.header('Referer') || '/';
		res.redirect(backURL);
	});
	
	/* GET/POST register page. */
	router.get('/register', function(req, res, next) {
		res.render('register', { school: req.session.school, title: 'Register for ' + req.session.school.name, user: req.session.user });
	}).post('/register', function(req, res) {
		backURL=req.header('Referer') || '/';
		res.redirect(backURL);
	}).post('/register/approve', function (req, res, next){data.user.grant.Admin(req, res, next);},function(req, res) {
		data.user.approveRegister(req, function(err, data){ 
			res.redirect('/credentials/manage/applications');
		});
	}).post('/register/decline', function (req, res, next){data.user.grant.Admin(req, res, next);},function(req, res) {
		data.user.declineRegister(req, function(err, data){ 
			res.redirect('/credentials/manage/applications');
		});
	});

	/* GET/POST add page. */
	router.get('/manage/applications', function (req, res, next){data.user.grant.Admin(req, res, next);}, function(req, res, next) {
			data.user.getUserArrayByType('applicant', function (err, applicants) {
				if(err){
					console.log(err);
					next(err);
				}
				res.render('manageapplications', { school: req.session.school, title: 'Approve Applications', user: req.session.user, applicants: applicants });
			});
	});

	/* GET/POST add page. */
	router.get('/manage/users', function (req, res, next){data.user.grant.Admin(req, res, next);}, function(req, res, next) {
		res.render('manageusers', { school: req.session.school, title: 'Edit / (De)authorize User Profile', user: req.session.user });
	});
	
	
	return router;
};
