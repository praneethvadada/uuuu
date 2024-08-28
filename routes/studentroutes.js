import express from 'express';
import {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  studentLogin,
} from '../controllers/studentcontroller.js';
// import { adminOnly, protect } from '../middleware/authmiddlware.js'; // Adjust the path as needed

const router = express.Router();

// Protect all routes
router.post('/students/login',studentLogin)
router.post('/students', addStudent);
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);
export default router;
