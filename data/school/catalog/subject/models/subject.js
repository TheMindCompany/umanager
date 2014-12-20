// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var subjectSchema = mongoose.Schema({
    code:        {type: String},
    name:        {type: String},
    description: {type: String}
});

//get data that should be returned.
subjectSchema.methods.getData = function(){
	return {
		id:          this._id,
	    code:        this.code,
	    name:        this.name,
	    description: this.description
	};
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Subject', subjectSchema);


//db.subjects.insert({ "_id" : ObjectId("5456580ff1832e26bc308e18"), "code" : "CIS", "name" : "Computer Information Systems", "description" : "Focus is on practical applications of technology to support organizations while adding value to their offerings." })
//db.subjects.insert({ "_id" : ObjectId("545658a4f1832e26bc308e19"), "code" : "MIS", "name" : "Management Information Systems", "description" : "The study of how individuals, groups, and organizations evaluate, design, implement, manage, and utilize systems to generate information to improve efficiency and effectiveness of decision making, including systems termed decision support systems, expert systems, and executive information systems." })
