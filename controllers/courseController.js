const Course = require('../models/courseModel');
const CourseCategory = require('../models/courseCategoryModel');
const User=require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { default: slugify } = require('slugify');

/*Create New Course*/
const createCourse = asyncHandler(async (req, res) => {
    const{_id, faculty}=req.user;
    const {categoryId} = req.params;
    try {
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase());
        }
        if(_id){
            req.body.teacher=_id;
            req.body.faculty=faculty;
        }
        const course=await Course.create(req.body);
        await CourseCategory.findByIdAndUpdate(categoryId,{$push:{courses: course._id}}, {new:true});
        await User.findByIdAndUpdate(req.user._id,{$push:{courses:course._id}},{new:true});
        res.status(201).json(
            { status: true, 
            message: "Course Created Successfully", 
            data: course});
    } catch (error) {
        throw new Error(error);
    }
});

/* Get Courses By List of Ids */
const getCoursesByListofIds = asyncHandler(async (req, res) => {
    const { ids } = req.query;
    try {
        const courses = await Course.find({ _id: { $in:  ids} , faculty: req.user.faculty });
        res.status(200).json({
            status: true,
            message: "Courses Fetched Successfully",
            data: courses
        });
    } catch (error) {
        throw new Error(error);
    }
});


/*Enroll Course */
const enrollCourse = asyncHandler(async (req, res) => {
    const {courseId}=req.params;
    try {
        const course=await Course.findById(courseId);
        if(course.faculty===req.user.faculty){
            const addCourseToUser= await User.findByIdAndUpdate(req.user._id,{$push:{courses:courseId}},{new:true});
            res.status(200).json({
                status: true,
                message: "Student Enrolled To Course Successfully",
                data: addCourseToUser
            });
        }
    } catch (error) {
        
    }
});

module.exports = { createCourse, enrollCourse, getCoursesByListofIds };