import React, { useState, useEffect } from 'react';
import AttendanceMarker from '../components/AttendanceMarker';
import { getAllStudents, getAllCourses } from '../services/api';

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const studentsRes = await getAllStudents();
        setStudents(studentsRes.data || []);
        
        const coursesRes = await getAllCourses();
        setCourses(coursesRes.data || []);
        
        // Auto-select the first course if available
        if (coursesRes.data && coursesRes.data.length > 0) {
          setSelectedCourseId(coursesRes.data[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchData();
  }, []);

  // Add this check to make sure we have a valid course ID
  if (!selectedCourseId && courses.length > 0) {
    return <div>Loading courses...</div>;
  }

  return (
    <div>
      <h1>Attendance Management</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="course-select">Select Course: </label>
        <select 
          id="course-select"
          value={selectedCourseId} 
          onChange={(e) => setSelectedCourseId(e.target.value)}
          style={{ padding: '5px', marginLeft: '10px' }}
        >
          <option value="">-- Select a Course --</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>
              {course.name} ({course.code})
            </option>
          ))}
        </select>
      </div>

      {selectedCourseId ? (
        <AttendanceMarker students={students} courseId={selectedCourseId} />
      ) : (
        <p>Please select a course to mark attendance</p>
      )}
    </div>
  );
};

export default AttendancePage;