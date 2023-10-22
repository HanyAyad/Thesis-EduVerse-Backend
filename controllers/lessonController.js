const Lesson = require('../models/lessonModel');
const Course = require('../models/courseModel');
const asyncHandler = require('express-async-handler');

const createLesson = asyncHandler(async (req, res) => {
    const {courseId}= req.params;
    try {
        const findCourse = await Course.findById(courseId);
        console.log(findCourse); //Debugger
        if(findCourse){
            if(req.body.title){
                res.body.slug= slugify(req.body.title.toLowerCase());
            }
            const lesson = await Lesson.create(req.body);
            await Course.findByIdAndUpdate(courseId,{$push:{lessons: lesson._id}}, {new:true});
            res.status(201).json(
                { status: true, 
                message: "Lesson Created Successfully", 
                data: lesson,
                course:findCourse});
          }
                else{
                    res.status(404).json({
                        status:false,
                        message:"Course Not Found"
                    })
                }
    } catch (error) {
        throw new Error(error);
    }
});

const deleteLesson = asyncHandler(async (req, res) => {
    const {courseId,lessonId}=req.params;
    try {
        const findCourse= await Course.findByIdAndUpdate(courseId,{$pull:{lessons:lessonId}}, {new:true});
        const findLesson= await Lesson.findByIdAndDelete(lessonId);
        res.status(200).json({
            status:true,
            message:"Lesson Deleted Successfully",
            data:findLesson,
            findCourse
        })
    } catch (error) {
        throw new Error(error);
    }
});

const getLesson = asyncHandler(async (req, res) => {
    const {lessonId}=req.params;
    try {
        const lesson = await Lesson.findById(lessonId);
        res.status(200).json({
            status: true,
            message: "Lesson Fetched Successfully",
            data: lesson
        });
    
} catch (error) {
    throw new Error(error);
}

});

const getAllCourseLessons = asyncHandler(async (req, res) => {
    const {courseId}=req.params;
    try {
        const lessons = await Course.findById(courseId).select("lessons");
        res.status(200).json({
            status: true,
            message: "All Lessons Fetched Successfully",
            data: lessons
        });
    } catch (error) {
        throw new Error(error);
    }
});

const updateLesson = asyncHandler(async (req, res) => {
    const {lessonId}=req.params;
    try {
        const updatedLesson= await Lesson.findByIdAndUpdate(lessonId,req.body,{new:true});
        res.status(200).json({
            status:true,
            message:"Lesson Updated Successfully",
            data:updatedLesson
        })
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createLesson, deleteLesson, getLesson, getAllCourseLessons, updateLesson};