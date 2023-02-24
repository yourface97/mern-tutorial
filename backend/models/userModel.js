const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Enter your email']
    },
    name: {
        type: String,
        required: [true, 'Enter your name']
    },
    password: {
        type: String,
        required: [true, 'Enter a password']
    }
});

module.exports = mongoose.model('User', userSchema);