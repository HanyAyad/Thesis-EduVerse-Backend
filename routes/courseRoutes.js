const { createCourse, enrollCourse, getCoursesByListofIds } = require('../controllers/courseController');
const { authMiddleware, isTeacher } = require('../middlewares/authMiddleware');

const courseRouter=require('express').Router();
courseRouter.post('/post/:categoryId',authMiddleware,isTeacher,createCourse);
courseRouter.post('/enroll/:courseId',authMiddleware,enrollCourse);
courseRouter.get('/thisgetcourses', authMiddleware, getCoursesByListofIds);







module.exports=courseRouter;