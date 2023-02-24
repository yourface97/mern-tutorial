const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc    Get existing user goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });

    if(goals.length===0){
        res.status(200).json({ message: 'No goals found'});
    }
    else{
        res.status(200).json(goals);
    };
});

// @desc    Submit new goal
// @route   POST /api/goals
// @access  Private
const newGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error('Enter text field');
    }

    const goal = await Goal.create({ text: req.body.text, user: req.user.id });

    res.status(201).json({goal});
});

// @desc    Update goal by id
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const goal = await Goal.findById(req.params.id);

    if(!req.body.text){
        res.status(400);
        throw new Error('Enter text field');
    };

    if(!goal){
        res.status(400);
        throw new Error('Goal not found');
    };

    if(!user){
        res.status(401);
        throw new Error('User not found');
    };

    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not authorized');
    };

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json({updatedGoal});
});

// @desc    Delete goal by id
// @route   DELETE /api/goals/:id
// @access  Public
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if(!goal){
        res.status(400);
        throw new Error('Goal not found');
    };

    if(!user){
        res.status(401);
        throw new Error('User not found');
    };

    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not authorized');
    }

    await goal.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getGoals,
    newGoal,
    updateGoal,
    deleteGoal
}