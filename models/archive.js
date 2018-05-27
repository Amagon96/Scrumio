const mongoose = require('mongoose');
const Project = require('../models/project');
const Schema = mongoose.Schema;

const projectSchema = Schema({
  project           : {
                      nombre            : String,
                      date_request      : String,
                      date_deployed     : String,
                      product_owner     : String,
                      product_owner_id  : {type: Schema.Types.ObjectId, ref: 'User'},
                      description       : String
                    },
  date_finished     : String
});

module.exports = mongoose.model('Archive', projectSchema);
