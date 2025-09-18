import React, { useState } from 'react';
import { encryptData } from '../utils/crypto';

interface RegisterStudentProps {
  onRegisterSuccess: () => void;
}

const RegisterStudent: React.FC<RegisterStudentProps> = ({ onRegisterSuccess }) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const payload = { data: encryptData(formData) };
      const res = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setMessage(data.message || 'Registered successfully');
      onRegisterSuccess();  // Notify parent to refresh student list
    } catch {
      setMessage('Registration failed');
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
      <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterStudent;
