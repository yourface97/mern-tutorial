const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    const auth = req.headers.authorization;
    let token;

    if(auth && auth.startsWith('Bearer')){
        try{
            //Get token from header
            token = auth.split(' ')[1];

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        }
        catch(err){
            console.log(err);
            res.status(401);
            throw new Error('Not authorized');
        };
    };

    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token');
    };
});

module.exports = { protect };