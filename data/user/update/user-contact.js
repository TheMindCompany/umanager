var UserContact = require('./../models/user-contact');

module.exports = function(updateData, cb){
	var id = updateData.id;
	delete updateData.id;
	
	UserContact.findOneAndUpdate({_id:id}, updateData, {}, function(err, contact){
		if(err){return cb(err, null);}
		return cb(null, contact.getData());
	});
};