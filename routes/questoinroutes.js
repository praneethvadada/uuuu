import express from 'express';
import QuestionController from '../controllers/questionController.js';
const router = express.Router();

// Routes for Question management
router.post('/questions', QuestionController.create);
router.get('/questions', QuestionController.getAll);
router.get('/questions/:id', QuestionController.getOne);
router.put('/questions/:id', QuestionController.update);
router.delete('/questions/:id', QuestionController.delete);
router.get('/questions/filter', QuestionController.filter); // Add filter route if needed

export default router;