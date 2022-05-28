const mongoose = require('mongoose');
const schema = mongoose.Schema

const userSchema = new schema({
  
    _id: schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true }
});

const User = module.exports = mongoose.model('User', userSchema);