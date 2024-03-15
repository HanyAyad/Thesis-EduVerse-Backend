const { createLesson, deleteLesson, getLesson, getAllCourseLessons } = require('../controllers/lessonController');
const { isTeacher, authMiddleware } = require('../middlewares/authMiddleware');

const lessonRouter= require('express').Router();

lessonRouter.post('/createlesson/:courseId',authMiddleware,isTeacher,createLesson); 
lessonRouter.get('/thisCourseLessons',authMiddleware,getAllCourseLessons);
lessonRouter.delete('/:courseId/:lessonId',authMiddleware,isTeacher,deleteLesson);

module.exports = lessonRouter;