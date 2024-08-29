import express from 'express';
import CollegeController from '../controllers/college_controller';
const router = express.Router();

// Routes for College management
router.post('/colleges', CollegeController.create);
router.get('/colleges', CollegeController.getAll);
router.get('/colleges/:id', CollegeController.getOne);
router.put('/colleges/:id', CollegeController.update);
router.delete('/colleges/:id', CollegeController.delete);

export default router;