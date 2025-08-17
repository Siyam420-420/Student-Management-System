import React, { useState } from 'react';
import { addAttendance } from '../services/api';

const AttendanceForm = ({ courses, students, onSuccess }) => {
  const [form, setForm] = useState({
    studentId: '',
    courseId: '',
    date: '',
    status: 'PRESENT'
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addAttendance(form);
      setMessage('Attendance recorded!');
      if (onSuccess) onSuccess();
    } catch {
      setMessage('Error recording attendance');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="attendance-form">
      <h3>Mark Attendance</h3>
      <select name="studentId" value={form.studentId} onChange={handleChange} required>
        <option value="">Select Student</option>
        {students && students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
      </select>
      <select name="courseId" value={form.courseId} onChange={handleChange} required>
        <option value="">Select Course</option>
        {courses && courses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
      </select>
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="PRESENT">Present</option>
        <option value="ABSENT">Absent</option>
        <option value="LATE">Late</option>
        <option value="EXCUSED">Excused</option>
      </select>
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AttendanceForm;
