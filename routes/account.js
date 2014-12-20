module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var backURL;
	var createObj = require('./objects/user');

	router.get('/', function (req, res, next){data.user.grant.isUser(req, res, next);}, function(req, res, next) {
		data.db.open('user');
		data.user.getUserById(req.session.user.id, function(err, user){
			data.db.close();
			res.render('profile', { school: req.session.school, title:"Manage Account", user: user });
		});
	}).post('/edit', function (req, res, next){data.user.grant.isUser(req, res, next);}, function(req, res, next) {
		var userObj = createObj.getUserObj(req);
		data.user.updateProfile(req.session, userObj, function(err, user){
			if(err){
				console.log(err);
			}
			res.redirect('/account');
		});
	});	

	return router;
};