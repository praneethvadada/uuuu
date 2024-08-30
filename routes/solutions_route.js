import express from 'express';
import SolutionController from '../controllers/solutionController.js';

const router = express.Router();

// Routes for Solution management
router.post('/solutions', SolutionController.create);
router.get('/solutions/:questionId', SolutionController.getAllByQuestionId);
router.get('/solutions/:id', SolutionController.getOne);
router.put('/solutions/:id', SolutionController.update);
router.delete('/solutions/:id', SolutionController.delete);

export default router;