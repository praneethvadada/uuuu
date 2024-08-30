import express from 'express';
import QuestionCollegeController from '../controllers/question_college_controller.js';
const router = express.Router();

// Routes for QuestionCollege management
router.post('/questionColleges', QuestionCollegeController.create);
router.get('/questionColleges/question/:questionId', QuestionCollegeController.getAllByQuestionId);
router.get('/questionColleges/batch/:batchId', QuestionCollegeController.getAllByBatchId);
router.delete('/questionColleges/:id', QuestionCollegeController.delete);

export default router;