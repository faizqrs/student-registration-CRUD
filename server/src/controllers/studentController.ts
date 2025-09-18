import type { Request, Response } from 'express';
import { Student } from '../models/Student.js';
import { encryptData, decryptData } from '../utils/crypto.js';

export async function registerStudent(req: Request, res: Response) {
  console.log('registerStudent called with data:', req.body.data);

  try {
    const frontendEncrypted = req.body.data;
    const decryptedString = decryptData(frontendEncrypted).trim();  // Trim whitespace/newlines
    const student = JSON.parse(decryptedString);
    console.log('Parsed student data:', student);

    const backendEncrypted = encryptData(student);
    console.log('Encrypted data for DB:', backendEncrypted);

    const record = new Student({ data: backendEncrypted });
    await record.save();
    console.log('Student record saved successfully');

    res.json({ message: 'Student registered' });
  } catch (error) {
    console.error('Error in registerStudent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export async function getStudents(req: Request, res: Response) {
  console.log('getStudents called');

  try {
    const students = await Student.find({});
    console.log('Fetched students from DB:', students);

    res.json(students);
  } catch (error) {
    console.error('Error in getStudents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


// Update student data by ID
export async function updateStudent(req: Request, res: Response) {
  const { id } = req.params;
  const frontendEncrypted = req.body.data;

  try {
    // This line MUST decrypt ciphertext first before JSON.parse
    const decryptedString = decryptData(frontendEncrypted).trim();
    console.log('Decrypted update string:', decryptedString);

    const studentData = JSON.parse(decryptedString);

    const backendEncrypted = encryptData(studentData);

    const updated = await Student.findByIdAndUpdate(id, { data: backendEncrypted }, { new: true });

    if (!updated) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student updated', updated });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



// Delete student data by ID
export async function deleteStudent(req: Request, res: Response) {
  const { id } = req.params;

  console.log('deleteStudent called with id:', id);

  try {
    const deleted = await Student.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Student not found' });
    }

    console.log('Student deleted:', deleted);
    res.json({ message: 'Student deleted' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}