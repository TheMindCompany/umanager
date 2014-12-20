var UserDetail = require('./../models/user-detail');

module.exports = function(updateData, cb){
	var id = updateData.id;
	delete updateData.id;
	
	UserDetail.findOneAndUpdate({_id:id}, updateData, {}, function(err, detail){
		if(err){return cb(err, null);}
		return cb(null, detail.getData());
	});
};