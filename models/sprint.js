const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const sprintSchema = Schema({
    sprintNumber    : {
        type        : Number,
        required    : true
    },
    start_date      : {
        type        : Date,
        default     : Date.now,
        Required    : true
    },
    end_date         : {
        type        : Date,
        Required    : true
    },
    goals           : {
        type        : [String]
    },
    tasks           : [{
        type        : Schema.Types.ObjectId,
        ref         : 'Task'
    }],
    daysLeft        : Number
});

sprintSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Sprint', sprintSchema);
