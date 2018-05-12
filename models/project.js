const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const projectSchema = Schema({
  nombre            : String,
  date_request      : String,
  date_deployed     : String,
  product_owner     : String,
  product_owner_id  : {type: Schema.Types.ObjectId, ref: 'User'},
  description       : String
});

projectSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Project', projectSchema);
