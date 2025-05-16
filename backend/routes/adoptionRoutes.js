const express = require('express');
const router = express.Router();
const Adoption = require('../models/AdoptionRequest');
const authMiddleware = require('../middleware/verifyToken');

// Submit an adoption request
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { petId, name, email, phone, address, adoptionType, duration, comments } = req.body;

    const newAdoption = new Adoption({
      petId,
      userId: req.user.id,
      name,
      email,
      phone,
      address,
      adoptionType,
      duration,
      comments,
      status: 'pending' // Default status
    });

    const saved = await newAdoption.save();
    res.status(201).json({ message: 'Adoption application submitted', adoption: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit application' });
  }
});

// Get user's applications
router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const myApps = await Adoption.find({ userId: req.user.id }).populate('petId');
    res.json({ applications: myApps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch your applications' });
  }
});

// Get all adoption applications (admin only)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    console.log('Admin applications request received');
    
    const user = req.user;
    console.log('Requesting user:', user);
    
    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    
    if (!user || user.role !== 'admin') {
      console.log('Access denied - user is not admin');
      return res.status(403).json({ message: 'Access denied' });
    }

    console.log('Fetching applications...');
    const applications = await Adoption.find()
      .populate('petId')
      .populate('userId', 'firstName lastName email role');
      
    console.log('Found applications:', applications.length);
    res.json({ applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

// Update application status (admin only)
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { id } = req.params;
    const { status, adminNotes } = req.body;
    
    // Validate status value
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    
    const application = await Adoption.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Update the application
    application.status = status;
    if (adminNotes !== undefined) {
      application.adminNotes = adminNotes;
    }
    
    // Add admin action timestamp
    application.statusUpdatedAt = Date.now();
    application.statusUpdatedBy = user.id;
    
    await application.save();
    
    res.json({ 
      message: 'Application status updated successfully',
      application
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update application status' });
  }
});

// Get application details (accessible by admin or application owner)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    
    const application = await Adoption.findById(id)
      .populate('petId')
      .populate('userId', 'firstName lastName email');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check permission - admin or application owner
    if (user.role !== 'admin' && application.userId.toString() !== user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json({ application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch application details' });
  }
});

module.exports = router;