var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var memberSchema = mongoose.Schema({
        project_id   : Schema.Types.ObjectId,
        name         : String,
        members      :[{
          member_id  : Schema.Types.ObjectId,
          email      : String,
          name       : String
        }]
});
// create the model for users and expose it to our app
module.exports = mongoose.model('Team', memberSchema);
