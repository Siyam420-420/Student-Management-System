import React, { useState } from 'react';
import { enrollCourse, removeCourse } from '../services/api';

const CourseSelector = ({ student, availableCourses, onUpdate }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [message, setMessage] = useState('');

  const handleEnroll = async () => {
    if (!selectedCourse) return;
    try {
      await enrollCourse(student._id, selectedCourse);
      setMessage('Enrolled successfully!');
      setSelectedCourse('');
      if (onUpdate) onUpdate(); // Refresh student list after enrolling
    } catch {
      setMessage('Failed to enroll.');
    }
  };

  const handleRemove = async (courseId) => {
    try {
      await removeCourse(student._id, courseId);
      if (onUpdate) onUpdate();
    } catch {
      setMessage('Failed to remove course.');
    }
  };

  return (
    <div style={{border: '1px solid #ccc', margin: '12px', padding: '12px'}}>
      <h4>{student.name} (ID: {student.Id})</h4>
      <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
        <option value="">Select Course</option>
        {availableCourses.map(course => (
          <option key={course._id} value={course._id}>
            {course.name}
          </option>
        ))}
      </select>
      <button onClick={handleEnroll}>Enroll</button>
      <ul>
        {student.courses && student.courses.length > 0 ? (
          student.courses.map((courseOrId) => {
      // If courseOrId is a string (id), try to find matching course
            const cid = typeof courseOrId === 'string' || typeof courseOrId === 'number'
              ? courseOrId
              : courseOrId._id;
            const course = availableCourses.find(c => c._id === cid);
            return (
              <li key={cid}>
                {course ? course.name : (courseOrId.name || String(cid))}
                <button onClick={() => handleRemove(cid)} style={{ marginLeft: '10px' }}>Remove</button>
              </li>
            );
          })
        ) : (
          <li>No courses enrolled.</li>
        )}
      </ul>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CourseSelector;
