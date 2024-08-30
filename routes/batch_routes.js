import express from 'express';
import BatchController from '../controllers/batch_controller.js';

const router = express.Router();

// Routes for Batch management
router.post('/batches', BatchController.create);
router.get('/batches', BatchController.getAll);
router.get('/batches/:id', BatchController.getOne);
router.put('/batches/:id', BatchController.update);
router.delete('/batches/:id', BatchController.delete);

export default router;