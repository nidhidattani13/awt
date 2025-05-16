const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Pet = require('../models/Pet');
const Adoption = require('../models/AdoptionRequest');
const authMiddleware = require('../middleware/verifyToken');

// Admin dashboard data endpoint
router.get('/data', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    const user = req.user;
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get counts for dashboard cards
    const [userCount, petCount, adoptionCount, pendingCount] = await Promise.all([
      User.countDocuments(),
      Pet.countDocuments(),
      Adoption.countDocuments(),
      Adoption.countDocuments({ status: 'pending' })
    ]);

    // Get recent users
    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('firstName lastName email role createdAt');

    // Get recent pets
    const pets = await Pet.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Get recent applications
    const applications = await Adoption.find()
      .populate('petId', 'name species breed imageUrl')
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(10);

    // Monthly adoption stats (for chart)
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 5);
    
    // Aggregate monthly stats
    const monthlyStats = await Adoption.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: { 
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 },
          approved: {
            $sum: { $cond: [{ $eq: ["$status", "approved"] }, 1, 0] }
          },
          rejected: {
            $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] }
          },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] }
          }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Format monthly stats for chart
    const formattedStats = monthlyStats.map(stat => {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return {
        month: monthNames[stat._id.month - 1],
        year: stat._id.year,
        total: stat.count,
        approved: stat.approved,
        rejected: stat.rejected,
        pending: stat.pending
      };
    });

    res.json({
      stats: {
        users: userCount,
        pets: petCount,
        totalAdoptions: adoptionCount,
        pendingAdoptions: pendingCount
      },
      users,
      pets,
      applications,
      chartData: formattedStats
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;