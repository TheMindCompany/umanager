var Catalog = require('./../models/school-session');
var db = require('./../db-locations');

module.exports.current = function(cb){
	var catalog;
	
	db.open('school');
	Catalog
		.findOne({active:true}, {}, { sort: { 'start' : 1 } })
		.exec(function(err, data){
			//console.log(data);
			db.close();
			if(err){cb(err,null);return;}
			
			catalog = data.getData();
			cb(null, catalog.code);
			return;
		});
};

module.exports.next = function(cb){
	var catalog;
	
	db.open('school');
	Catalog
		.findOne({active:true,start: { $gt: new Date() } })
		.exec(function(err, data){
			//console.log(data);
			db.close();
			if(err){cb(err,null);return;}
			
			catalog = data.getData();
			cb(null, catalog.code);
			return;
		});
};

module.exports.currentDetail = function(cb){
	var catalog;
	
	db.open('school');
	Catalog
		.findOne({active:true}, {}, { sort: { 'start' : 1 } })
		.exec(function(err, data){
			db.close();
			if(err){cb(err,null);return;}
			
			catalog = data.getData();
			cb(null, catalog);
			return;
		});
};

module.exports.nextDetail = function(cb){
	var catalog;
	
	db.open('school');
	Catalog
		.findOne({active:true,start: { $gt: new Date() } })
		.exec(function(err, data){
			//console.log(data);
			db.close();
			if(err){cb(err,null);return;}
			
			catalog = data.getData();
			cb(null, catalog);
			return;
		});
};

module.exports.catalog = function(id, cb){
	var catalog = [];
	
	Catalog
		.findOne({code:id})
		.exec(function(err, data){
			if(err){cb(err,null);return;}
			
			catalog = data.getData();
			cb(null, catalog);
			return;
		});
};