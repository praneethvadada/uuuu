import express from 'express';
import TrainerController from '../controllers/trainerController.js';// Assuming your controller is named trainerController

const router = express.Router();

// Routes for Trainer management
router.post('/trainers', TrainerController.create);
router.get('/trainers', TrainerController.getAll);
router.get('/trainers/:id', TrainerController.getOne);
router.put('/trainers/:id', TrainerController.update);
router.delete('/trainers/:id', TrainerController.delete); // Using deleteOne for consistency
router.post('/trainers/bulk-add', TrainerController.bulkAdd); // Specific route for bulk add
router.get('/trainers/search', TrainerController.search); // Route for searching trainers

export default router;