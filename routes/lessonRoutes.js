const { createLesson, deleteLesson, getLesson, getAllCourseLessons, updateLesson } = require('../controllers/lessonController');
const { isTeacher, authMiddleware } = require('../middlewares/authMiddleware');

const lessonRouter= require('express').Router();

lessonRouter.post('/:courseId',authMiddleware,isTeacher,createLesson); 
lessonRouter.delete('/:courseId/:lessonId',authMiddleware,isTeacher,deleteLesson);
lessonRouter.get('/:lessonId',authMiddleware,isTeacher,getLesson);
lessonRouter.get('/all/:courseId',authMiddleware,isTeacher,getAllCourseLessons);
lessonRouter.put('/update/:lessonId',authMiddleware,isTeacher,updateLesson);

module.exports = lessonRouter;