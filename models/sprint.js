const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const sprintSchema = Schema({
    sprintNumber    : {
        type        : Number,
        required    : true
    },
    start_date      : {
        type        : String,
        default     : Date.now,
        Required    : true
    },
    end_date         : {
        type        : String,
        Required    : true
    },
    goals           : {
        type        : [String]
    },
    tasks           : [{
        type        : Schema.Types.ObjectId,
        ref         : 'Task'
    }],
    daysLeft        : Number,
    project_id      : Schema.Types.ObjectId,
});

sprintSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Sprint', sprintSchema);
