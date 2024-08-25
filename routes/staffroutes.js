import express from 'express';
import { register, login } from '../controllers/staffController.js';
// import { protect } from '../middleware/authmiddlware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Example of a protected route
// router.get('/profile', protect, (req, res) => {
//     res.json({ message: 'This is a protected route', staff: req.staff });
// });

export default router;
