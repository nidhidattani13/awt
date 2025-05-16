const AdoptionRequest = require('../models/AdoptionRequest');

const submitAdoptionRequest = async (req, res) => {
  try {
    const { name, email, phone, address, adoptionType, duration, comments, petId } = req.body;

    const newRequest = new AdoptionRequest({
      name,
      email,
      phone,
      address,
      adoptionType,
      duration,
      comments,
      petId
    });

    await newRequest.save();
    res.status(201).json({ message: 'Adoption request submitted successfully' });
  } catch (error) {
    console.error('Adoption request error:', error);
    res.status(500).json({ message: 'Error submitting adoption request' });
  }
};

module.exports = { submitAdoptionRequest };
