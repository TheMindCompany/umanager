// load the things we need
var mongoose = require('mongoose');
var SchoolSubject = require('./subject');

// define the schema for our user model
var SubjectCourseSchema = mongoose.Schema({
    code:         {type: String},
    units:        {type: Number},
    type:         {type: String},
    name:         {type: String},
    subject:      {type: mongoose.Schema.Types.ObjectId,
    	           ref: 'Subject'},
    description:  {type: String},
    requirements: {type: String}
});

//db.subjectcourses.insert({_id: ObjectId("54593884a2b7eba1c5f6fab0"), code: '010', units: 3, name: 'Introduction to Information Systems', subject: ObjectId("545658a4f1832e26bc308e19"), description: 'Use information technology to master their current or future jobs and to help ensure the success of their organization.  To accomplish this goal, this text helps students to become informed users; that is, persons knowledgeable about information systems and information technology. The focus is not on merely learning the concepts of IT but rather on applying those concepts to facilitate business processes.', requirements: ''})
//db.subjectcourses.insert({_id: ObjectId("54593884a2b7eba1c5f6fab1"), code: '130', units: 3, name: 'Introduction to Data Systems', subject: ObjectId("545658a4f1832e26bc308e19"), description: 'Data system is a term used to refer to an organized collection of symbols and processes that may be used to operate on such symbols. Any organized collection of symbols and symbol-manipulating operations can be considered a data system.', requirements: ''})
//db.subjectcourses.insert({_id: ObjectId("54593884a2b7eba1c5f6fab2"), code: '235', units: 3, name: 'Data System Applications', subject: ObjectId("545658a4f1832e26bc308e19"), description: 'Learn about various data systems and how they interact with systems.  This class helps students to understand the differences in data systems and how to select a data system for implementation', requirements: ''})
//db.subjectcourses.insert({_id: ObjectId("54593884a2b7eba1c5f6fab3"), code: '354', units: 3, name: 'System Architecture Design', subject: ObjectId("545658a4f1832e26bc308e19"), description: 'Learn about fundamental management systems architecture design.', requirements: ''})
//db.subjectcourses.insert({_id: ObjectId("54593884a2b7eba1c5f6fab4"), code: '010', units: 3, name: 'Introduction to Computer Information Systems', subject: ObjectId("5456580ff1832e26bc308e18"), description: 'Learn about CIS and todays technology field.', requirements: ''})
//db.subjectcourses.insert({_id: ObjectId("54593884a2b7eba1c5f6fab5"), code: '110', units: 3, name: 'Intermediate Linux Configuration', subject: ObjectId("5456580ff1832e26bc308e18"), description: 'Learn about configuring the Linux kernel and the flavors of distribution for enterprise use.', requirements: ''})
//db.subjectcourses.insert({_id: ObjectId("54593884a2b7eba1c5f6fab6"), code: '225', units: 3, name: 'Advanced Data Manipulation', subject: ObjectId("5456580ff1832e26bc308e18"), description: 'Learn about manipulating data from programmatic and distributed application.', requirements: ''})
//db.subjectcourses.insert({_id: ObjectId("54593884a2b7eba1c5f6fab7"), code: '351', units: 3, name: 'Enterprise Application Development', subject: ObjectId("5456580ff1832e26bc308e18"), description: 'Learn about developing enterprise level application and the different considerations that should take priority.', requirements: ''})

//get data that should be returned.
SubjectCourseSchema.methods.getData = function(){
	return {
		id:          this._id,
	    code:        this.code,
	    units:       this.units,
	    type:       this.type,
	    name:        this.name,
	    subject:     this.subject,
	    description: this.description,
	    requirements:this.requirements
	};
};

// create the model for users and expose it to our app
module.exports = mongoose.model('SubjectCourse', SubjectCourseSchema);
