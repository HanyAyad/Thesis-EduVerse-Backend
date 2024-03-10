const express = require('express');
const { registerUser, loginUser, updateUser, getUserById } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const userRouter = express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/getuser/:id",authMiddleware,getUserById)
userRouter.put("/updateprofile",authMiddleware,updateUser)


module.exports = userRouter;