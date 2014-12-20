// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

// define the schema for our user model
var userSchema = mongoose.Schema({
    email:      {type: String, lowercase: true, required: true, sparse: true, unique:true},
    password:   {type: String, required: true},
    first:      {type: String, required: true},
    last:       {type: String, required: true},
    type:       {type: String, required: true},
    active:     {type: String, required: true},
    detail:     {type: mongoose.Schema.Types.ObjectId,
                 ref:  'UserDetail'}
});

// generating a hash
userSchema.methods.generateHash = function(password) {
	var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	//console.log(hash);
    return hash;
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {	
	var valid = bcrypt.compareSync(password, this.password);
	//console.log(password + ' : ' + this.password, valid);
    return valid;
};

//get data that should be returned.
userSchema.methods.getData = function(){
	return {
		id: 		this._id,
	    email:      this.email,
	    first:      this.first,
	    last:       this.last,
	    type:       this.type,
	    active:     this.active,
	    detail:     [this.detail]
	};
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

//db.users.insert({ "email" : "student@localhost", "password" : "$2a$10$YzMafNGEOUPTAXCZ2PDsh..dmKY3zidDOEVVOJfEz4G0JImrlvUEa", "first" : "CM", "last" : "Student", "type" : "student", "active" : "true", "detail" : ObjectId("5453fcdbc6650dc4101d3629"), "_id" : ObjectId("5453fcdbc6650dc4101d362b"), "joined" : ISODate("2014-10-31T21:19:23.990Z") })
//db.users.insert({ "email" : "applicant@localhost", "password" : "$2a$10$YzMafNGEOUPTAXCZ2PDsh..dmKY3zidDOEVVOJfEz4G0JImrlvUEa", "first" : "CM", "last" : "Applicant", "type" : "pending", "active" : "true", "detail" : ObjectId("5453fd1fc6650dc4101d3630"), "_id" : ObjectId("5453fd1fc6650dc4101d3632"), "joined" : ISODate("2014-10-31T21:20:31.792Z") })
//db.users.insert({ "_id" : ObjectId("5453fd925e3d1cf5ca0d59e7"), "first" : "CM", "last" : "Administrator", "type" : "admin", "email" : "admin@localhost", "active" : true, "password" : "$2a$10$YzMafNGEOUPTAXCZ2PDsh..dmKY3zidDOEVVOJfEz4G0JImrlvUEa" })
//db.users.insert({ "_id" : ObjectId("5453fd925e3d1cf5ca0d59e8"), "first" : "CM", "last" : "Teacher", "type" : "teacher", "email" : "teach@localhost", "active" : true, "password" : "$2a$10$YzMafNGEOUPTAXCZ2PDsh..dmKY3zidDOEVVOJfEz4G0JImrlvUEa" })