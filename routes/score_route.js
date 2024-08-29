import express from 'express';
import ScoreController from '../controllers/score_controller';

const router = express.Router();

// Routes for Score management
router.post('/scores', ScoreController.create);
router.get('/scores/student/:studentId', ScoreController.getAllByStudentId);
router.get('/scores/question/:questionId', ScoreController.getAllByQuestionId);
router.get('/scores/:id', ScoreController.getOne);
router.put('/scores/:id', ScoreController.update);
router.delete('/scores/:id', ScoreController.delete);

export default router;