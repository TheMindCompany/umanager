module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	
	/* GET home page. */
	router.get('/', function(req, res) {
		res.render('index', { school: req.session.school, title: 'University Manager', user: req.session.user});
	});
	
	return router;
};
