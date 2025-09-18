import React, { useEffect, useState } from 'react';
import { decryptData } from '../utils/crypto';

interface Student {
  _id: string;
  data: string;
}

interface StudentsListProps {
  onEdit: (id: string) => void;
}

const StudentsList: React.FC<StudentsListProps> = ({ onEdit }) => {
  const [students, setStudents] = useState<any[]>([]);

  const fetchStudents = async () => {
    const res = await fetch('http://localhost:8080/api/students');
    const data: Student[] = await res.json();
    const decryptedStudents = data.map(s => {
      try {
        return { ...decryptData(s.data), _id: s._id };
      } catch {
        return { _id: s._id };
      }
    });
    setStudents(decryptedStudents);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await fetch(`http://localhost:8080/api/student/${id}`, { method: 'DELETE' });
      fetchStudents();
    }
  };

  return (
    <div>
      <h2>Students List</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.dob}</td>
              <td>{s.gender}</td>
              <td>{s.address}</td>
              <td>{s.course}</td>
              <td>
                <button onClick={() => onEdit(s._id)}>Edit</button>
                <button onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;
