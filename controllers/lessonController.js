const Lesson = require('../models/lessonModel');
const Course = require('../models/courseModel');
const asyncHandler = require('express-async-handler');
const { default: slugify } = require('slugify');


/*Create A Lesson */
const createLesson = asyncHandler(async (req, res) => {
    const {courseId}= req.params;
    try {
        const findCourse = await Course.findById(courseId);
        if(findCourse){
            if(req.body.title){
                req.body.slug= slugify(req.body.title.toLowerCase());
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


/*Delete A Lesson */
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


/*Get Lesson By Id*/
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


/*Get All Course Lessons */
const getAllCourseLessons = asyncHandler(async (req, res) => {
    const { id } = req.query;
    try {
        const course = await Course.findById(id);
        const lessons = await Lesson.find({ _id: { $in:  course.lessons} });
        res.status(200).json({
            status: true,
            message: "Course Lessons Fetched Successfully",
            data: lessons
        });
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = { createLesson, deleteLesson, getLesson, getAllCourseLessons};