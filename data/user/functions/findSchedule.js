var Schedule = require('./../models/schedule');
var db = require('./../db-locations');

module.exports.schedulesBySession = function(id, cb){
	var catalog = [];

	db.open('school');
	Schedule
		.find({session:id})
		.exec(function(err, data){
			db.close();
			
			if(err){cb(err,null);return;}
			for(var i = 0; i < data.length; i++){
				catalog.push(data[i].getData());
			}
			cb(null, catalog);
			return;
		});
};
