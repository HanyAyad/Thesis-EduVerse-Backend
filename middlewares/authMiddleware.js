const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');


const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded?.id);
            next();

        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not Authorized, Token Failed');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not Authorized, No Token');
    }
});

const isTeacher = asyncHandler(async (req, res, next) => {
    if (req.user?.isTeacher) {
        next();
    } else {
        res.status(401);
        throw new Error('Not Authorized as a Teacher');
    }
});

module.exports = { authMiddleware, isTeacher };