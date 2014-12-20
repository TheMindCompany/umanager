// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userDetailSchema = mongoose.Schema({
    birth:       {type:   Date},
    gender:      {type:   String},
    contact:     [{type:  mongoose.Schema.Types.ObjectId,
                   ref:   'UserContact'}],
    transcripts:  {type:  mongoose.Schema.Types.ObjectId,
                   ref:   'UserTranscriptHistory'}
});

//get data that should be returned.
userDetailSchema.methods.getData = function(){
	return {
		id: this._id,
	    birth:	this.birth,
	    gender:	this.gender,
	    contact:[this.contact],
	    transcripts: [this.transcripts]
	};
};

// create the model for users and expose it to our app
module.exports = mongoose.model('UserDetail', userDetailSchema);

//db.userdetails.insert({ "birth" : ISODate("2000-01-01T00:00:00Z"), "gender" : "male", "transcripts" : ObjectId("5453fcdbc6650dc4101d3627"), "_id" : ObjectId("5453fcdbc6650dc4101d3629"), "contact" : [  ObjectId("5453fcdbc6650dc4101d3628") ], })
//db.userdetails.insert({ "birth" : ISODate("2000-01-01T00:00:00Z"), "gender" : "male", "transcripts" : ObjectId("5453fd1fc6650dc4101d362e"), "_id" : ObjectId("5453fd1fc6650dc4101d3630"), "contact" : [  ObjectId("5453fd1fc6650dc4101d362f") ] })
