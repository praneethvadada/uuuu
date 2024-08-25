import express from 'express';
import {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  studentLogin,
} from '../controllers/studentcontroller.js';
import { adminOnly, protect } from '../middleware/authmiddlware.js'; // Adjust the path as needed

const router = express.Router();

// Protect all routes
router.post('/students/login',studentLogin)
router.post('/students', protect,adminOnly, addStudent);
router.get('/students', protect,adminOnly, getAllStudents);
router.get('/students/:id', protect,adminOnly, getStudentById);
router.put('/students/:id', protect,adminOnly, updateStudent);
router.delete('/students/:id', protect,adminOnly, deleteStudent);
export default router;
