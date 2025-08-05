import React, { useState, useEffect } from 'react';
import { getAllStudents } from '../services/api';
import StudentCard from './StudentCard';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (error) {
      setError('Failed to fetch students');
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading students...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="student-list">
      <h2>All Students ({students.length})</h2>
      {students.length === 0 ? (
        <p>No students found. Add some students to get started!</p>
      ) : (
        <div className="students-grid">
          {students.map(student => (
            <StudentCard 
              key={student._id} 
              student={student} 
              onUpdate={fetchStudents}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
