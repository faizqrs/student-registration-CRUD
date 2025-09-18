import express from 'express';
import { registerStudent, getStudents, updateStudent, deleteStudent } from '../controllers/studentController.js';

const router = express.Router();

router.post('/register', registerStudent);
router.get('/students', getStudents);
router.put('/student/:id', updateStudent); // Implement for update
router.delete('/student/:id', deleteStudent); // Implement for deletion

export default router;
