import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../services/api';
import StudentForm from '../components/StudentForm';

const AddStudent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (studentData) => {
    try {
      setLoading(true);
      setError('');
      await addStudent(studentData);
      navigate('/');
    } catch (error) {
      setError(error.message || 'Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-student-page">
      <h1>Add New Student</h1>
      {error && <div className="error-message">{error}</div>}
      <StudentForm onSubmit={handleSubmit} />
      {loading && <div className="loading">Adding student...</div>}
      <button onClick={() => navigate('/admin')} className="back-btn">
        Back to Home
      </button>
    </div>
  );
};

export default AddStudent;
