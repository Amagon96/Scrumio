const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const taskSchema = Schema({
    asignees        :[{
        type        : Schema.Types.ObjectId,
        ref         : 'User'
    }],
    supervisor      :[{
        type        : Schema.Types.ObjectId,
        ref         : 'User'
    }],
    sprint          :{
        type        : Schema.Types.ObjectId,
        ref         : 'Sprint'
    },
    title           : {
        type        : String,
        default     : 'Tarea Sin Titulo'
    },
    description     : {
        type        : String,
        default     : 'No additional description',
    },
    difficulty      : {
        type        : Number,
        default     : 1,
        min         : 1,
        max         : 5
    },
    priority        :{
        type        : String,
        default     : 'Low' // Debe ser una selección unicamente de Low-Middle-High
    },
    hours           : {
        type        : Number,
        min         : 1,
        max         : 8,
        default     : 1
    }

});

taskSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Task', taskSchema);
/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const taskSchema = Schema({
    title           : {
        type        : String,
        default     : Tarea Sin Titulo
    },
    description     : {
        type        : String,
        default     : 'No additional description',
    },
    difficulty      : {
        type        : Number,
        default     : 1,
        min         : 1,
        max         : 5
    },
    priority        :{
        type        : String,
        default     : 'Low' // Debe ser una selección unicamente de Low-Middle-High
    },
    hours           : {
        type        : Number,
        min         : 1,
        max         : 8,
        default     : 1
    },
    sprint          : {
        type        : Schema.Types.ObjectId,
        ref         : 'Sprint'
    }

});

taskSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Task', taskSchema);
*/