const Pet = require('../models/Pets');
const multer = require('multer');

// Add pet
exports.createPet = async (req, res) => {
  try {
    const {
      name, type, breed, age, gender, size, color, description, healthStatus,
      houseTrained, goodWithKids, goodWithAnimals, specialNeeds, adoptionFee,
      country, city, state, zipcode
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newPet = new Pet({
      name, type, breed, age, gender, size, color, description, healthStatus,
      houseTrained, goodWithKids, goodWithAnimals, specialNeeds, adoptionFee,
      country, city, state, zipcode,
      image: imageUrl,
      owner: req.user.id  // from verifyToken middleware
    });

    await newPet.save();

    res.status(201).json({ message: 'Pet listed successfully', pet: newPet });
  } catch (err) {
    console.error('Pet creation error:', err);
    res.status(500).json({ message: 'Server error while listing pet' });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ pets });
  } catch (err) {
    console.error('Error fetching pets:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json({ pet });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
