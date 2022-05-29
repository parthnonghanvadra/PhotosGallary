const mongoose = require('mongoose');
const schema = mongoose.Schema

const albumSchema = new schema({
  _id: schema.Types.ObjectId,
  user: {type: schema.Types.ObjectId, ref: 'User', required: true},
  name: {type: String, required: true},
  lastUpdatedDate: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Album', albumSchema);
