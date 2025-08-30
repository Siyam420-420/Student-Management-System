import React, { useState } from 'react';
import { addAttendance } from '../services/api';

const AttendanceMarker = ({ students, courseId }) => {
  const initialAttendance = students.reduce((acc, s) => ({ ...acc, [s._id]: 'PRESENT' }), {});
  const [attendance, setAttendance] = useState(initialAttendance);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (studentId, status) => {
    setAttendance({ ...attendance, [studentId]: status });
  };

  const handleSubmit = async () => {
    const date = new Date().toISOString().split('T')[0]; // today's date
    setLoading(true);
    setMsg('');
    
    try {
      console.log('Course ID being used:', courseId);
      console.log('Student IDs being used:', Object.keys(attendance));
      
      // Create an array of attendance records to submit
      const attendancePromises = Object.entries(attendance).map(([studentId, status]) => {
        console.log('Submitting for student:', studentId, 'with status:', status);
        return addAttendance({ studentId, courseId, date, status });
      });

      // Submit all attendance records
      const results = await Promise.all(attendancePromises);
      
      setMsg(`Attendance marked successfully for ${results.length} students.`);
    } catch (error) {
      console.error('Error submitting attendance:', error);
      setMsg('Error submitting attendance: ' + (error.message || 'Invalid student or course ID'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      {students.map(student => (
        <div key={student._id} style={{ margin: '12px 0' }}>
          {student.name}
          <select
            value={attendance[student._id]}
            onChange={e => handleChange(student._id, e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
            <option value="LATE">Late</option>
            <option value="EXCUSED">Excused</option>
          </select>
        </div>
      ))}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Attendance'}
      </button>
      {msg && <p style={{color: msg.includes('Error') ? 'red' : 'green'}}>{msg}</p>}
    </div>
  );
};

export default AttendanceMarker;