var mongoose = require('mongoose');
var db = require('./../db-locations');

// Models
var User = require('./../models/user');
var UserDetail = require('./../models/user-detail');
var UserContact = require('./../models/user-contact');
var UserTranscript = require('./../models/user-transcript');
var UserTranscriptHistory = require('./../models/user-transcript-history');

module.exports.Contact = function(req){
	var type   = 'home';
	var phone  = req.body.phone_user;
	var addr   = req.body.addr_user;
	var addr_2 = req.body.addr2_user;
	var city   = req.body.city_user;
	var state  = req.body.state_user;
	var zip    = req.body.zip_user;
	var country= req.body.country_user;
	var userContact = new UserContact({
        type:  type,
        phone:  phone,
        addr:   addr,
        addr_2: addr_2,
        city:   city,
        state:  state,
        zip:    zip,
        country:country
	});
	userContact.save(function (err) {
        if (err){
            console.log(err);
            return err;
        }
    });
	return userContact._id;
};

module.exports.Transcript = function(req, record){
	var school = req.body['school' + record];
	var city   = req.body['city' + record];
	var state  = req.body['state' + record];
	var gpa    = req.body['gpa' + record];
	var userTranscript = new UserTranscript({
        school:  school,
        city:    city,
        state:   state,
        gpa:     gpa
	});
    userTranscript.save(function (err) {
        if (err){
            console.log(err);
            return err;
        }
    });
	return userTranscript._id;
};

module.exports.CollegeTranscripts = function(req){
	var userCollegeTranscript;
	var userCollegeTranscripts = [];
	var transcriptCount = req.body.transcript_college_record_number;
	if (req.body.transcript_college_record_number > 0){
        for (var i = 1; i <= transcriptCount; i++){
            userCollegeTranscript = module.exports.Transcript(req, '_transcript_' + i);
            userCollegeTranscripts.push(userCollegeTranscript);
        }
	} else {
		return undefined;
	}
	return userCollegeTranscripts;
};

module.exports.TranscriptHistory = function(general, college){
	general = (general === undefined) ? {} : general;
	college = (college === undefined) ? [] : college;
	var userTranscriptHistory = new UserTranscriptHistory({
		general: general,
		college: college
	});
	userTranscriptHistory.save(function (err) {
        if (err){
            console.log(err);
            return err;
        }
    });
	return userTranscriptHistory._id;
};

module.exports.Detail = function(req, contact, transcripts){
	console.log(transcripts, contact);
	var birth  = req.body.birth_user;
	var gender = req.body.gender_user;
	var userDetail = new UserDetail({
        birth:       birth,
        gender:      gender,
        contact:     contact,
        transcripts: transcripts
	});
	userDetail.save(function (err) {
        if (err){
            console.log(err);
            return err;
        }
    });
	return userDetail._id;
};

module.exports.User = function(req, detail){
	var user = new User();
	var email    = req.body.email_user;
	var password = (req.body.pass === undefined) ? user.generateHash('newaccountbyadmin') : user.generateHash(req.body.pass);
	var first    = req.body.first_user;
	var last     = req.body.last_user;
	var type     = (req.body.type === undefined) ? 'applicant' : req.body.type;
	var active   = (req.body.active === undefined) ? true : false;
	user = new User({
        email:      email,
        password:   password,
        first:      first,
        last:       last,
        type:       type,
        active:     active,
        detail:     detail
	});
	user.save(function (err) {
        if (err){
            console.log(err);
    		return err;
        }
    });
	return user._id;
};