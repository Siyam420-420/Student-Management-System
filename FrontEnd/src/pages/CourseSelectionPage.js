import React, { useEffect, useState } from 'react';
import { getAllStudents, getAllCourses } from '../services/api';
import CourseSelector from '../components/CourseSelector';

const CourseSelectionPage = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const studentsRes = await getAllStudents();
      setStudents(studentsRes.data || []);
      const coursesRes = await getAllCourses();
      setCourses(coursesRes.data || []);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Course Selection</h1>
      {students.map(student => (
        <CourseSelector
          key={student._id}
          student={student}
          availableCourses={courses}
          onUpdate={async () => {
            const refresh = await getAllStudents();
            setStudents(refresh.data || []);
          }}
        />
      ))}
    </div>
  );
};

export default CourseSelectionPage;
