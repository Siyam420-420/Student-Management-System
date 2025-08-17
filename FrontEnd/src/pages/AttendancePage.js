import React, { useState, useEffect } from 'react';
import AttendanceMarker from '../components/AttendanceMarker';
import { getAllStudents } from '../services/api';

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const courseId = "PUT_YOUR_COURSE_ID_HERE"; // Replace with real courseId or select UI later

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await getAllStudents();
        setStudents(res.data || []);
      } catch (error) {
        console.error("Failed to fetch students", error);
      }
    }
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Attendance Management</h1>
      <AttendanceMarker students={students} courseId={courseId} />
    </div>
  );
};

export default AttendancePage;
