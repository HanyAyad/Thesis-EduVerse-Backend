const generateToken = require('../config/jwtToken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');


/*Create A User*/
const registerUser = asyncHandler(async (req, res) => {

    const email = req.body.email;
    const findUser=await User.findOne({email: email});
    
    if(!findUser){
        const createUser= await User.create(req.body);
        res.status(201).json(
            {status:true,
            message:"User Created Successfully",
            data:createUser});
    }
    else{
        res.status(400);
        throw new Error("User Already Exists");
    }

});

/*Login User*/

const loginUser = asyncHandler(async (req, res) => {
    const {email,password}=req.body;
    const findUser= await User.findOne({email:email});
    

    if(findUser &&(await findUser.matchPassword(password))){
        res.status(200).json({
            status:true,
            message:"Login Successful",
            token: generateToken(findUser?._id),
            name: findUser?.name,
            email: findUser?.email,
            profilePic: findUser?.profilePic,
            isTeacher: findUser?.isTeacher,
            faculty: findUser?.faculty,
            courses: findUser?.courses,
        });
    }   
    else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

/*Get User By Id*/
const getUserById = asyncHandler(async (req, res) => {
    const{ id }= req.params;
    try {
        const getUser = await User.findById(id);
        res.status(200).json({
            status: true,
            message: "User Fetched Successfully",
            data: getUser
        });} catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
        }
});

/*Update User Profile*/
const updateUser = asyncHandler(async (req, res) => {
    const{_id}= req.user;
    try{
        const user=await User.findByIdAndUpdate(_id,req.body,{new:true});
        res.status(200).json({
            status:true,
            message:"User Updated Successfully",
            data:user
        });

    }catch(error){
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});



module.exports={registerUser,loginUser,updateUser,getUserById};