// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var UserScheduleSchema = mongoose.Schema({
    user:    {type: mongoose.Schema.Types.ObjectId,
    	      ref: 'User'},
    session: {id:         {type: mongoose.Schema.Types.ObjectId},
    		  code:       {type: String},
    	      description:{type: String} },
    course:	 {id:         {type: mongoose.Schema.Types.ObjectId},
    	      code:       {type: String},
    		  units:      {type: Number},
    		  type:       {type: String},
    		  name:       {type: String},
    		  instructor: {first: {type: String},
    			           last:  {type: String} } }, 
    schedule:{id:         {type: mongoose.Schema.Types.ObjectId},
    	      daily:      {sun:  {type: Boolean},
    	  		           mon:  {type: Boolean},
    	  		           tue:  {type: Boolean},
    	  		           wed:  {type: Boolean},
    	  		           thur: {type: Boolean},
    	  		           fri:  {type: Boolean},
    	  		           sat:  {type: Boolean} },
    	      start_time: {type: Date},
    	      min_length: {type: Number},
    	      location:   {type: String} },
    active:  {type: Boolean},
    activity:{type: Array}
});

// get data that should be returned.
UserScheduleSchema.methods.getData = function(){
	return {
		id:       this._id,
        user:     this.user,
        session: this.session,
        course:   this.course,
        schedule: this.schedule,
        active:   this.active,
        activity: this.activity
	};
};

UserScheduleSchema.methods.getUserData = function(){
	return {
		id:       this._id,
        user:     this.user
	};
};

// create the model for users and expose it to our app
module.exports = mongoose.model('UserSchedule', UserScheduleSchema);

//db.userschedules.insert({active: true, user: ObjectId("5453fcdbc6650dc4101d362b"), session: {id: ObjectId("54584383a52715f4297ed41d"), code: '2014-FALL', description: 'Fall 2014 Schedule'}, course: {id: ObjectId("54593884a2b7eba1c5f6fab0"), code: 'MIS-010', name: 'Introduction to Information Systems', instructor: {id: ObjectId("5453fd925e3d1cf5ca0d59e8"), first: 'CM', last: 'Teach'}}, schedule:{id: ObjectId("54593aaba2b7eba1c5f6fab8"), daily:{sun: false, mon: false, tue: true, wed: false, thur: true, fri: false, sat: false}, start_time: new Date('2014-4-20 09:30:00'), min_length: 75, location: 'IT013'}})
//db.userschedules.insert({active: true, user: ObjectId("5453fcdbc6650dc4101d362b"), session: {id: ObjectId("54584383a52715f4297ed41d"), code: '2014-FALL', description: 'Fall 2014 Schedule'}, course: {id: ObjectId("54593884a2b7eba1c5f6fab1"), code: 'MIS-130', name: 'Introduction to Data Systems', instructor: {id: ObjectId("5453fd925e3d1cf5ca0d59e8"), first: 'CM', last: 'Teach'}}, schedule:{id: ObjectId("54593aaba2b7eba1c5f6fab9"), daily:{sun: false, mon: true, tue: false, wed: true, thur: false, fri: false, sat: false}, start_time: new Date('2014-4-20 05:00:00'), min_length: 75, location: 'IT012'}})
//db.userschedules.insert({active: true, user: ObjectId("5453fcdbc6650dc4101d362b"), session: {id: ObjectId("54584383a52715f4297ed41d"), code: '2014-FALL', description: 'Fall 2014 Schedule'}, course: {id: ObjectId("54593884a2b7eba1c5f6fab2"), code: 'MIS-235', name: 'Data System Applications', instructor: {id: ObjectId("5453fd925e3d1cf5ca0d59e8"), first: 'CM', last: 'Teach'}}, schedule:{id: ObjectId("54593aaba2b7eba1c5f6faba"), daily:{sun: false, mon: false, tue: false, wed: false, thur: false, fri: true, sat: false}, start_time: new Date('2014-4-20 12:00:00'), min_length: 150, location: 'IT011'}})
//db.userschedules.insert({active: true, user: ObjectId("5453fcdbc6650dc4101d362b"), session: {id: ObjectId("54584383a52715f4297ed41d"), code: '2014-FALL', description: 'Fall 2014 Schedule'}, course: {id: ObjectId("54593884a2b7eba1c5f6fab3"), code: 'MIS-354', name: 'System Archtecture Design', instructor: {id: ObjectId("5453fd925e3d1cf5ca0d59e8"), first: 'CM', last: 'Teach'}}, schedule:{id: ObjectId("54593aaba2b7eba1c5f6fabb"), daily:{sun: false, mon: false, tue: false, wed: false, thur: false, fri: false, sat: true}, start_time: new Date('2014-4-20 10:30:00'), min_length: 150, location: 'IT010'}})
//db.userschedules.insert({active: true, user: ObjectId("5453fd925e3d1cf5ca0d59e8"), session: {id: ObjectId("54584383a52715f4297ed41d"), code: '2014-FALL', description: 'Fall 2014 Schedule'}, course: {id: ObjectId("54593884a2b7eba1c5f6fab0"), code: 'MIS-010', name: 'Introduction to Information Systems', instructor: {id: '', first: '', last: ''}}, schedule:{id: ObjectId("54593aaba2b7eba1c5f6fab8"), daily:{sun: false, mon: false, tue: true, wed: false, thur: true, fri: false, sat: false}, start_time: new Date('2014-4-20 09:30:00'), min_length: 75, location: 'IT013'}})
//db.userschedules.insert({active: true, user: ObjectId("5453fd925e3d1cf5ca0d59e8"), session: {id: ObjectId("54584383a52715f4297ed41d"), code: '2014-FALL', description: 'Fall 2014 Schedule'}, course: {id: ObjectId("54593884a2b7eba1c5f6fab1"), code: 'MIS-130', name: 'Introduction to Data Systems', instructor: {id: '', first: '', last: ''}}, schedule:{id: ObjectId("54593aaba2b7eba1c5f6fab9"), daily:{sun: false, mon: true, tue: false, wed: true, thur: false, fri: false, sat: false}, start_time: new Date('2014-4-20 05:00:00'), min_length: 75, location: 'IT012'}})
//db.userschedules.insert({active: true, user: ObjectId("5453fd925e3d1cf5ca0d59e8"), session: {id: ObjectId("54584383a52715f4297ed41d"), code: '2014-FALL', description: 'Fall 2014 Schedule'}, course: {id: ObjectId("54593884a2b7eba1c5f6fab2"), code: 'MIS-235', name: 'Data System Applications', instructor: {id: '', first: '', last: ''}}, schedule:{id: ObjectId("54593aaba2b7eba1c5f6faba"), daily:{sun: false, mon: false, tue: false, wed: false, thur: false, fri: true, sat: false}, start_time: new Date('2014-4-20 12:00:00'), min_length: 150, location: 'IT011'}})
//db.userschedules.insert({active: true, user: ObjectId("5453fd925e3d1cf5ca0d59e8"), session: {id: ObjectId("54584383a52715f4297ed41d"), code: '2014-FALL', description: 'Fall 2014 Schedule'}, course: {id: ObjectId("54593884a2b7eba1c5f6fab3"), code: 'MIS-354', name: 'System Archtecture Design', instructor: {id: '', first: '', last: ''}}, schedule:{id: ObjectId("54593aaba2b7eba1c5f6fabb"), daily:{sun: false, mon: false, tue: false, wed: false, thur: false, fri: false, sat: true}, start_time: new Date('2014-4-20 10:30:00'), min_length: 150, location: 'IT010'}})
//db.userschedules.insert({active: true, user: ObjectId("5453fd925e3d1cf5ca0d59e8"), session: {id: ObjectId("54584383a52715f4297ed41d"), code: '2014-FALL', description: 'Fall 2014 Schedule'}, course: {id: ObjectId("54593884a2b7eba1c5f6fab4"), code: 'CIS-010', name: 'Introduction to Computer Information Systems', instructor: {id: '', first: '', last: ''}}, schedule:{id: ObjectId("54593aaba2b7eba1c5f6fabc"), daily:{sun: false, mon: false, tue: false, wed: false, thur: false, fri: true, sat: false}, start_time: new Date('2014-4-20 09:00:00'), min_length: 150, location: 'CS013'}})
//db.userschedules.insert({active: true, user: ObjectId("5453fd925e3d1cf5ca0d59e8"), session: {id: ObjectId("54584383a52715f4297ed41d"), code: '2014-FALL', description: 'Fall 2014 Schedule'}, course: {id: ObjectId("54593884a2b7eba1c5f6fab5"), code: 'CIS-110', name: 'Intermediate Linux Configuration', instructor: {id: '', first: '', last: ''}}, schedule:{id: ObjectId("54593aaba2b7eba1c5f6fabd"), daily:{sun: false, mon: false, tue: true, wed: false, thur: true, fri: false, sat: false}, start_time: new Date('2014-4-20 07:30:00'), min_length: 75, location: 'CS012'}})
//db.userschedules.insert({active: true, user: ObjectId("5453fd925e3d1cf5ca0d59e8"), session: {id: ObjectId("54584383a52715f4297ed41d"), code: '2014-FALL', description: 'Fall 2014 Schedule'}, course: {id: ObjectId("54593884a2b7eba1c5f6fab6"), code: 'CIS-225', name: 'Advanced Data Manipulation', instructor: {id: '', first: '', last: ''}}, schedule:{id: ObjectId("54593aaba2b7eba1c5f6fabe"), daily:{sun: false, mon: true, tue: false, wed: true, thur: false, fri: false, sat: false}, start_time: new Date('2014-4-20 13:00:00'), min_length: 75, location: 'CS011'}})
//db.userschedules.insert({active: true, user: ObjectId("5453fd925e3d1cf5ca0d59e8"), session: {id: ObjectId("54584383a52715f4297ed41d"), code: '2014-FALL', description: 'Fall 2014 Schedule'}, course: {id: ObjectId("54593884a2b7eba1c5f6fab7"), code: 'CIS-351', name: 'Entrprise Application Development', instructor: {id: '', first: '', last: ''}}, schedule:{id: ObjectId("54593aaca2b7eba1c5f6fabf"), daily:{sun: false, mon: false, tue: false, wed: false, thur: false, fri: false, sat: true}, start_time: new Date('2014-4-20 10:00:00'), min_length: 150, location: 'CS010'}})