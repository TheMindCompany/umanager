// load the things we need
var mongoose = require('mongoose');
var db = require('./db-locations.js');

module.exports.create = function () {
	db.open('school', function(err){
		if(err !== undefined){return;}
	});
	
	
	db.close();
};

module.exports.edit = function () {
	db.open('school', function(err){
		if(err !== undefined){return;}
	});
	
	
	db.close();
};

module.exports.searchObject = function () {
	db.open('school', function(err){
		if(err !== undefined){return;}
	});
	
	
	db.close();
};

module.exports.searchArray = function () {
	db.open('school', function(err){
		if(err !== undefined){return;}
	});
	
	
	db.close();
};

module.exports.admin = function () {
	db.open('school', function(err){
		if(err !== undefined){return;}
	});
	
	
	db.close();
};