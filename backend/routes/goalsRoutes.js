const express = require('express');
const router = express.Router();
const { getGoals, newGoal, updateGoal, deleteGoal } = require('../controllers/goalsController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoals).post(protect, newGoal);

router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;