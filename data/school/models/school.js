// load the things we need
var mongoose = require('mongoose');
var User = require('./user');
var UserContact = require('./user-contact');

// define the schema for our user model
var schoolSchema = mongoose.Schema({
    name:            {type:  String},
    president:       {type:  mongoose.Schema.Types.ObjectId,
                      ref:   User.schema},
    contact:         [{type: mongoose.Schema.Types.ObjectId,
                       ref:  UserContact.schema}]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('', schoolSchema);
