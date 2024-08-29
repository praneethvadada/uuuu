import express from 'express';
import DomainController from '../controllers/domain_controller';
const router = express.Router();

// Routes for Domain management
router.post('/domains', DomainController.create);
router.get('/domains', DomainController.getAll);
router.get('/domains/:id', DomainController.getOne);
router.put('/domains/:id', DomainController.update);
router.delete('/domains/:id', DomainController.delete);

export default router;