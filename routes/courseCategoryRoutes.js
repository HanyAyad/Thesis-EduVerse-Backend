const { postCourseCategory, getAllCourseCategories, getCourseCategory, updateCourseCategory, deleteCourseCategory } = require('../controllers/CourseCategoryController');
const { authMiddleware, isTeacher } = require('../middlewares/authMiddleware');

const courseCategoryRouter = require('express').Router();

/*POST Routes */
courseCategoryRouter.post('/post',authMiddleware,isTeacher,postCourseCategory);

/*GET Routes */
courseCategoryRouter.get('/getall',authMiddleware,getAllCourseCategories);
courseCategoryRouter.get('/get/:slug',authMiddleware,getCourseCategory);

/*PUT Routes */
courseCategoryRouter.put('/update/:id',authMiddleware,isTeacher,updateCourseCategory);

/*DELETE Routes */
courseCategoryRouter.delete('/delete/:id',authMiddleware,isTeacher,deleteCourseCategory);

module.exports = courseCategoryRouter;