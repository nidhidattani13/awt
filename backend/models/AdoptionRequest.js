const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  email: String,
  phone: String,
  address: String,
  adoptionType: {
    type: String,
    enum: ['temporary', 'permanent'],
    required: true,
  },
  duration: String,
  comments: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Adoption', adoptionSchema);
