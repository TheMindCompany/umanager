// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userContactSchema = mongoose.Schema({
    type:   {type: String},
    phone:  {type: String},
    addr:   {type: String},
    addr_2: {type: String},
    city:   {type: String},
    state:  {type: String},
    zip:    {type: String},
    country:{type: String}
});

//get data that should be returned.
userContactSchema.methods.getData = function(){
	return {
		id: this._id,
	    type:   this.type,
	    phone:  this.phone,
	    addr:   this.addr,
	    addr_2: this.addr_2,
	    city:   this.city,
	    state:  this.state,
	    zip:    this.zip,
	    country:this.country
	};
};


// create the model for users and expose it to our app
module.exports = mongoose.model('UserContact', userContactSchema);

//db.usercontacts.insert({ "type" : "home", "phone" : "123-123-1234", "addr" : "123 UM Drive", "addr_2" : "", "state" : "California", "zip" : "12345", "country" : "USA", "_id" : ObjectId("5453fcdbc6650dc4101d3628") })
//db.usercontacts.insert({ "type" : "home", "mobile" : "321-321-4321", "addr" : "123 UM Drive", "addr_2" : "", "state" : "California", "zip" : "12345", "country" : "USA", "_id" : ObjectId("5453fd1fc6650dc4101d362f") })
