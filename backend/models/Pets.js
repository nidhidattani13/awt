const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: String,
  age: { type: String, required: true },
  gender: { type: String, required: true },
  size: String,
  color: String,
  description: { type: String, required: true },
  healthStatus: String,
  houseTrained: Boolean,
  goodWithKids: Boolean,
  goodWithAnimals: Boolean,
  specialNeeds: String,
  adoptionFee: Number,
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: String,
  zipcode: String,
  imageUrl: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
