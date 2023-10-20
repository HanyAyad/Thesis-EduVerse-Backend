const express = require('express');
const { registerUser, loginUser, getAllUsers, updateUser, deleteUser, getUserById } = require('../controllers/userController');
const { isTeacher, authMiddleware } = require('../middlewares/authMiddleware');
const userRouter = express.Router();

/*POST Routes */
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)

/*GET Routes */
userRouter.get("/allusers",authMiddleware,isTeacher,getAllUsers)
userRouter.get("/getuser/:id",authMiddleware,getUserById)

/*PUT Routes */
userRouter.put("/updateprofile",authMiddleware,updateUser)

/*DELETE Routes */
userRouter.delete("/deleteuser/:id",authMiddleware,deleteUser)


module.exports = userRouter;