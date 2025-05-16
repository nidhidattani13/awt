const express = require('express');
const router = express.Router();
const { createPet, getAllPets, getPetById } = require('../controllers/PetController');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const auth = require('../middleware/auth');

const upload = require('../middleware/multer');
// Route: POST /api/pets

router.get('/', getAllPets);
router.get('/:id', getPetById);
router.post('/', verifyToken, upload.single('image'), createPet);

module.exports = router;
