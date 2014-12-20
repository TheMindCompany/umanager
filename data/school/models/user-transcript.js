// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var UserTranscriptSchema = mongoose.Schema({
    school:  {type: String},
    city:    {type: String},
    state:   {type: String},
    gpa:     {type: String}
});

//get data that should be returned.
UserTranscriptSchema.methods.getData = function(){
	return {
		id: this._id,
		school: this.school,
		city: this.city,
		state: this.state,
		gpa: this.gpa
	};
};

// create the model for users and expose it to our app
module.exports = mongoose.model('UserTranscript', UserTranscriptSchema);

//db.usertranscripts.insert({ "school" : "High School Deploma", "city" : "Hometown", "state" : "California", "gpa" : "3.0", "_id" : ObjectId("5453fcdbc6650dc4101d3625") })
//db.usertranscripts.insert({ "school" : "AA Degree Program", "gpa" : "3.5", "_id" : ObjectId("5453fcdbc6650dc4101d3626") })
//db.usertranscripts.insert({ "school" : "High School Deploma", "city" : "Hometown", "state" : "California", "gpa" : "3.0", "_id" : ObjectId("5453fd1fc6650dc4101d362c") })
//db.usertranscripts.insert({ "school" : "AA Degree Program", "gpa" : "3.5", "_id" : ObjectId("5453fd1fc6650dc4101d362d") })
