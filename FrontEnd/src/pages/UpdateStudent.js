import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateStudent } from '../services/api';
import StudentForm from '../components/StudentForm';

const UpdateStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!student) {
    return (
      <div>
        <p>No student data found.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const handleSubmit = async (studentData) => {
    try {
      setLoading(true);
      setError('');
      await updateStudent(student._id, studentData);
      navigate('/');
    } catch (error) {
      setError(error.message || 'Failed to update student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-student-page">
      <h1>Update Student</h1>
      {error && <div className="error-message">{error}</div>}
      <StudentForm 
        onSubmit={handleSubmit} 
        initialData={student}
        isEditing={true}
      />
      {loading && <div className="loading">Updating student...</div>}
      <button onClick={() => navigate('/')} className="back-btn">
        Back to Home
      </button>
    </div>
  );
};

export default UpdateStudent;
