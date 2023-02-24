const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

//generates jsonwebtoken for authentication
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req,res) => {
    const { email, name, password } = req.body;

    if(!email || !name || !password){
        res.status(400);
        throw new Error('Please enter all fields');
    };

    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(400);
        throw new Error('Email is already registered');
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(password, salt);

    const user = await User.create({ email, name, password: hashedPW });

    res.status(201).json({
        id: user._id,
        email: user.email,
        name: user.name,
        token: generateToken(user._id)
    });
});

// @desc    User login / auth
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            id: user._id,
            email: user.email,
            name: user.name,
            token: generateToken(user._id)
        });
    }
    else{
        res.status(400);
        throw new Error('Invalid login credentials');
    };
});

// @desc    Get user info
// @route   GET /api/users/:id
// @access  Private
const getUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    getUser
};
