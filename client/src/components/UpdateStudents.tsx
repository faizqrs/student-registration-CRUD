import React, { useEffect, useState } from 'react';
import { encryptData, decryptData } from '../utils/crypto';

interface UpdateStudentProps {
  id: string;
  onClose: () => void;
  onUpdated: () => void;
}

const UpdateStudent: React.FC<UpdateStudentProps> = ({ id, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    course: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/students`);
        const students = await res.json();
        const student = students.find((s: any) => s._id === id);
        if (!student) {
          setMessage('Student not found');
          return;
        }
        const decrypted = decryptData(student.data);
        setFormData(decrypted);
      } catch {
        setMessage('Failed to load student data');
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const payload = { data: encryptData(formData) };
    try {
      const res = await fetch(`http://localhost:8080/api/student/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'Failed to update student');
      } else {
        setMessage(data.message || 'Updated successfully');
        onUpdated();
      }
    } catch {
      setMessage('Failed to update student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
      <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />
      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
      <input name="course" placeholder="Course Enrolled" value={formData.course} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
      <button type="button" onClick={onClose} disabled={loading}>Cancel</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UpdateStudent;
