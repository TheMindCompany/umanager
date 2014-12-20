var User = require('./../models/user');

module.exports = function(updateData, cb){
	var id = updateData.id;
	delete updateData.id;
	console.log('user update', id, updateData);
	User.findOneAndUpdate({_id:id}, updateData, {}, function(err, user){
		console.log('found : ', user);
		if(err){return cb(err, null);}
		return cb(null, user.getData());
	});
};
