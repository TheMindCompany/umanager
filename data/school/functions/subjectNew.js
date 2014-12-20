var mongoose = require('mongoose');
var db = require('./../db-locations');

var Subject = require('./../models/subject');

module.exports = function(req, cb){
	var code         = req.body.code;
	var name         = req.body.name;
	var description  = req.body.description;
	var subject = new Subject({
		code:        code,
		name:        name,
		description: description
	});
	
	subject.save(function (err) {
        if (err){
            console.log(err);
            cb(err, null);
            return err;
        }
    });
	cb(null, subject._id);
	return subject._id;
};