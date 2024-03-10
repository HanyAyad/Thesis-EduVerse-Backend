const { postCourseCategory, getAllCourseCategories, getCourseCategory, deleteCourseCategory } = require('../controllers/CourseCategoryController');
const { authMiddleware, isTeacher } = require('../middlewares/authMiddleware');

const courseCategoryRouter = require('express').Router();

courseCategoryRouter.post('/post',authMiddleware,isTeacher,postCourseCategory);
courseCategoryRouter.get('/getall',authMiddleware,getAllCourseCategories);
courseCategoryRouter.get('/get/:slug',authMiddleware,getCourseCategory);
courseCategoryRouter.delete('/delete/:id',authMiddleware,isTeacher,deleteCourseCategory);

module.exports = courseCategoryRouter;