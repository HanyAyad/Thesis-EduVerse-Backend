const { default: slugify } = require('slugify');
const CourseCategory = require('../models/courseCategoryModel');
const asyncHandler = require('express-async-handler');


/*Create New Category */
const postCourseCategory = asyncHandler(async (req, res) => {
    try {
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase());
        }
        const courseCategory = await CourseCategory.create(req.body);
        res.status(201).json(
           { status: true, 
            message: "Course Category Created Successfully", 
            data: courseCategory});

    } catch (error) {
        throw new Error(error);
    }
});

/*Get All Categories */
const getAllCourseCategories = asyncHandler(async (req, res) => {
try {
    const allcourseCategories = await CourseCategory.find({});
    res.status(200).json({
        status: true,
        message: "All Course Categories Fetched Successfully",
        data: allcourseCategories
    });

} catch (error) {
    throw new Error(error);
}
});

/*Get Course Category By Slug */
const getCourseCategory = asyncHandler(async (req, res) => {
    const {slug}=req.params;
    try {
        const courseCategory = await CourseCategory.findOne({slug:slug});
        res.status(200).json({
            status: true,
            message: "Course Category Fetched Successfully",
            data: courseCategory
        });
    } catch (error) {
        throw new Error(error);
    }
});


/*Delete Course Category By Id */
const deleteCourseCategory = asyncHandler(async (req, res) => {
    const {id}=req.params;
    try {
        const deletedCourseCategory = await CourseCategory.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Course Category Deleted Successfully",
            data: deletedCourseCategory
        });
    } catch (error) {
        throw new Error(error);
    }
});



module.exports = { postCourseCategory, getAllCourseCategories, getCourseCategory, deleteCourseCategory };