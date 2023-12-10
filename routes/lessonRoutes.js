const { createLesson, deleteLesson, getLesson, getAllCourseLessons, updateLesson } = require('../controllers/lessonController');
const { isTeacher, authMiddleware } = require('../middlewares/authMiddleware');

const lessonRouter= require('express').Router();

/*POST Routes */
lessonRouter.post('/create/:courseId',authMiddleware,isTeacher,createLesson); 

/*GET Routes */
lessonRouter.get('/thisCourseLessons',authMiddleware,getAllCourseLessons);

/*PUT Routes */
lessonRouter.put('/update/:lessonId',authMiddleware,isTeacher,updateLesson);

/*DELETE Routes */
lessonRouter.delete('/:courseId/:lessonId',authMiddleware,isTeacher,deleteLesson);

module.exports = lessonRouter;