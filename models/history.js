var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var historySchema = mongoose.Schema({
        narrative : String,
        creator_id : Schema.Types.ObjectId,
        project_id : Schema.Types.ObjectId,
        state : String,
        priority : String,
        size : String,
        how : String,
        what_i_want : String,
        so_that : String, //de_manera
        give_it : String,
        criteria : String,
        since : String,
        when : String,
        sprint_id : Schema.Types.ObjectId,
        time_estimate : Number,
        time_did : {
          time: Number,
          date : String
        }
});
// create the model for historys and expose it to our app
module.exports = mongoose.model('History', historySchema);
