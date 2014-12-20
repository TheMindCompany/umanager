var mongoose = require('mongoose');
var db = require('./../db-locations');

// Models
var User = require('./../models/user');
var UserDetail = require('./../models/user-detail');
var UserContact = require('./../models/user-contact');
var UserTranscript = require('./../models/user-transcript');
var UserTranscriptHistory = require('./../models/user-transcript-history');

module.exports.UserInformation = function(email, cb){
	var profile = [];
	
	//search for user object
	User
		.findOne({email:email})
		.exec(function(err, user){
			if (err) {cb(err, null);return;}
			profile = user.getData();
			
			// search for detail object
			UserDetail
			.findOne({detail:user.detail._id})
			.exec(function(err, details){
				if (err) {cb(err, null);return;}
				profile.detail = [];
				profile.detail = details.getData();
				
				//search for contact objects
				var contactId = [];
				profile.detail.contact = [];
				for (var n in details.contact){
					if(n === 0) {contactId.push(details.contact[n]);}
				}
				for(var i =0;i<details.contact.length; i++){
					UserContact
						.find({_id:contactId[i]})
						.exec(function(err, contact){
							if (err) {cb(err, null);return;}
							for(n in contact){
								profile.detail.contact.push(contact[n].getData());
							}
						});
				}
				
				// search for transcript history object
				if(details.transcripts){
					UserTranscriptHistory
						.findOne({_id:details.transcripts})
						.exec(function(err, history){
							if (err) {cb(err, null);return;}
							profile.detail.transcripts = history.getData();
							
							//search for college transcript objects
							var transcriptId = [];
							profile.detail.transcripts.college = [];
							for (var i = 0; i < history.college.length; i++){
								transcriptId.push(history.college[i]);
							}
							for(var i = 0; i < transcriptId.length; i++){
								UserTranscript
									.findOne({_id:transcriptId[i]})
									.exec(function(err, transcripts){
										if (err) {cb(err, null);return;}
										profile.detail.transcripts.college.push(transcripts.getData());
									});
							}
							
							// search for ge transcript object
							UserTranscript
								.findOne({_id:history.general})
								.exec(function(err, ge){
									if (err) {cb(err, null);return;}
									profile.detail.transcripts.general = ge.getData();
									
									cb(null, profile);
									return;
								});
						});
				} else {
					//console.log('running profile: ', profile.detail.transcripts);
					cb(null, profile);
					return;
				}
			 	});
		});
};

module.exports.UserInformationList = function(type){
	var users = [];
	User
		.find({type:type})
		.exec(function(err, data){
			if (err) {return err;}
			for(var i = 0; i < data.length(); i++){
				users.push(data.getData());
			}
			return users;
		});
};

module.exports.User = function(email){
	var user;
	User
		.findOne({email:email})
		.exec(function(err, data){
			if (err) {return err;}
			user = data.getData();
			return user;
		});
};

module.exports.Detail = function(id){
	var detail;
	UserDetail
		.findOne({_id:id})
		.exec(function(err, data){
			if (err) {return err;}
			detail = data.getData();
			return detail;
		});
};

module.exports.Contact = function(id){
	var contact;
	UserContact
		.findOne({_id:id})
		.exec(function(err, data){
			if (err) {return err;}
			contact = data.getData();
			return contact;
		});
};

module.exports.Transcript = function(id){
	var transcript;
	UserTranscript
		.findOne({_id:id})
		.exec(function(err, data){
			if (err) {return err;}
			transcript = data.getData();
			return transcript;
		});
};

module.exports.TranscriptHistory = function(id){
	var history;
	UserTranscriptHistory
		.findOne({_id:id})
		.exec(function(err, data){
			if (err) {return err;}
			history = data.getData();
			return history;
		});
};