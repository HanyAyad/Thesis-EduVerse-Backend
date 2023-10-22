const { createLesson, deleteLesson, getLesson, getAllCourseLessons, updateLesson } = require('../controllers/lessonController');
const { isTeacher, authMiddleware } = require('../middlewares/authMiddleware');

const lessonRouter= require('express').Router();

/*POST Routes */
lessonRouter.post('/:courseId',authMiddleware,isTeacher,createLesson); 

/*GET Routes */
lessonRouter.get('/:lessonId',authMiddleware,isTeacher,getLesson);
lessonRouter.get('/all/:courseId',authMiddleware,isTeacher,getAllCourseLessons);

/*PUT Routes */
lessonRouter.put('/update/:lessonId',authMiddleware,isTeacher,updateLesson);

/*DELETE Routes */
lessonRouter.delete('/:courseId/:lessonId',authMiddleware,isTeacher,deleteLesson);

module.exports = lessonRouter;