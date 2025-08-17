import React, { useState } from 'react';
import { addAttendance } from '../services/api';

const AttendanceMarker = ({ students, courseId }) => {
  const initialAttendance = students.reduce((acc, s) => ({ ...acc, [s._id]: 'PRESENT' }), {});
  const [attendance, setAttendance] = useState(initialAttendance);
  const [msg, setMsg] = useState('');

  const handleChange = (studentId, status) => {
    setAttendance({ ...attendance, [studentId]: status });
  };

  const handleSubmit = async () => {
    const date = new Date().toISOString().split('T')[0]; // today’s date
    try {
      await Promise.all(Object.entries(attendance).map(([studentId, status]) =>
        addAttendance({ studentId, courseId, date, status })
      ));
      setMsg('Attendance marked successfully.');
    } catch {
      setMsg('Error submitting attendance.');
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
      <button onClick={handleSubmit}>Submit Attendance</button>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default AttendanceMarker;
