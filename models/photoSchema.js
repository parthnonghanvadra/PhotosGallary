const mongoose = require('mongoose');
const schema = mongoose.Schema

const photoSchema = new schema({
  
    _id: schema.Types.ObjectId,
    user: { type: schema.Types.ObjectId, ref: 'User', required: true },
    album: { type: schema.Types.ObjectId, ref: 'Album', required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    
});


const Photo = module.exports = mongoose.model('Photo', photoSchema);