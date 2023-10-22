const { createCourse, getallCourses, getAllCoursesByFaculty, getCourse, updateCourse, deleteCourse, checkEnrollment, enrollCourse } = require('../controllers/courseController');
const { authMiddleware, isTeacher } = require('../middlewares/authMiddleware');

const courseRouter=require('express').Router();

/*POST Routes */
courseRouter.post('/post/:categoryId',authMiddleware,isTeacher,createCourse);
courseRouter.post('/checkEnrollment/:courseId',authMiddleware,checkEnrollment);
courseRouter.post('/enroll/:courseId',authMiddleware,enrollCourse);

/*GET Routes */
courseRouter.get('/all',authMiddleware,isTeacher,getallCourses);
courseRouter.get('/faculty',authMiddleware,getAllCoursesByFaculty);
courseRouter.get('/:slug',authMiddleware,getCourse);

/*PUT Routes */
courseRouter.put('/update/:id',authMiddleware,isTeacher,updateCourse);

/*DELETE Routes */
courseRouter.delete('/delete/:id',authMiddleware,isTeacher,deleteCourse);





module.exports=courseRouter;