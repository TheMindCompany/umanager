// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userTranscriptHistorySchema = mongoose.Schema({
    general: {type:  mongoose.Schema.Types.ObjectId,
              ref:   'UserTranscript'},
    college: [{type: mongoose.Schema.Types.ObjectId,
               ref:  'UserTranscript'}]
});

//get data that should be returned.
userTranscriptHistorySchema.methods.getData = function(){
	return {
		id: this._id,
		general: [this.general],
		college: [this.college]
	};
};

// create the model for users and expose it to our app
module.exports = mongoose.model('UserTranscriptHistory', userTranscriptHistorySchema);

//db.usertranscripthistories.insert({ "general" : ObjectId("5453fcdbc6650dc4101d3625"), "_id" : ObjectId("5453fcdbc6650dc4101d3627"), "college" : [  ObjectId("5453fcdbc6650dc4101d3626") ] })
//db.usertranscripthistories.insert({ "general" : ObjectId("5453fd1fc6650dc4101d362c"), "_id" : ObjectId("5453fd1fc6650dc4101d362e"), "college" : [  ObjectId("5453fd1fc6650dc4101d362d") ] })
