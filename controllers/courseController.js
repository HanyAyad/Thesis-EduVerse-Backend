const Course = require('../models/courseModel');
const CourseCategory = require('../models/courseCategoryModel');
const asyncHandler = require('express-async-handler');

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
        res.status(201).json(
            { status: true, 
            message: "Course Created Successfully", 
            data: course});
    } catch (error) {
        throw new Error(error);
    }
});

/*Get All Courses */
const getallCourses = asyncHandler(async (req, res) => {
    try {
        const allCourses = await Course.find({});
        res.status(200).json({
            status: true,
            message: "All Courses Fetched Successfully",
            data: allCourses
        });
    } catch (error) {
        throw new Error(error);
    }
});

/*Get All Courses By Faculty */
const getAllCoursesByFaculty = asyncHandler(async (req, res) => {
    const{faculty}=req.user;
    try {
        const allCoursesByFaculty = await Course.find({faculty:faculty});
        res.status(200).json({
            status: true,
            message: "All Courses Fetched Successfully",
            data: allCoursesByFaculty
        });
    } catch (error) {
        throw new Error(error);
    }
});

/*Get Course By Slug */
const getCourse= asyncHandler(async (req, res) => {
    const{slug}=req.params;
    try {
        const course=await Course.findOne({slug:slug});
        res.status(200).json({
            status: true,
            message: "Course Fetched Successfully",
            data: course
        });

    } catch (error) {
        throw new Error(error);
    }
});

/*Update Course */
const updateCourse = asyncHandler(async (req, res) => {
    const{id}=req.params;
    try {
        const course=await Course.findByIdAndUpdate(id,req.body,{new:true});
        res.status(201).json(
            { status: true, 
            message: "Course Updated Successfully", 
            data: course});
    } catch (error) {
        throw new Error(error);
    }
});

/*Delete Course */

const deleteCourse = asyncHandler(async (req, res) => {
    const{id}=req.params;
    try {
        const course=await Course.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Course Deleted Successfully",
            data: course
        });
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = { createCourse, getallCourses, getAllCoursesByFaculty, updateCourse, deleteCourse, getCourse };