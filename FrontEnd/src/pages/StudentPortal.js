import React, { useState } from 'react';
import { getAllStudents, getAttendanceByStudentId } from '../services/api';
import DownloadButton from '../components/DownloadButton'; // Import the new component

const StudentPortal = () => {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!studentId) return;
    
    setLoading(true);
    setError('');
    
    try {
      const studentsRes = await getAllStudents();
      const foundStudent = studentsRes.data.find(s => s.Id.toString() === studentId);
      
      if (!foundStudent) {
        setError('No student found with this ID');
        setStudent(null);
        setAttendance([]);
        return;
      }
      
      setStudent(foundStudent);
      
      try {
        const attendanceRes = await getAttendanceByStudentId(foundStudent._id);
        setAttendance(attendanceRes.data || []);
      } catch (err) {
        console.error('Error fetching attendance:', err);
        setAttendance([]);
      }
    } catch (err) {
      setError('Error searching for student');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-portal" style={{ padding: '20px' }}>
      <h1>Student Portal</h1>
      
      <form onSubmit={handleSearch} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Enter your Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ padding: '10px', marginRight: '10px', width: '200px' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {error && <div className="error" style={{ color: 'red' }}>{error}</div>}
      
      {student && (
        <div className="student-info">
          <h2>Student Information</h2>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>ID:</strong> {student.Id}</p>
          <p><strong>Payment Status:</strong> {student.paymentStatus}</p>
          <p><strong>Due Amount:</strong> ${student.dueAmount}</p>
          
          <h3>Enrolled Courses</h3>
          {student.courses && student.courses.length > 0 ? (
            <ul>
              {student.courses.map((course, index) => (
                <li key={index}>
                  {typeof course === 'object' ? course.name : `Course ID: ${course}`}
                </li>
              ))}
            </ul>
          ) : (
            <p>No courses enrolled</p>
          )}
          
          <h3>Attendance Records</h3>
          {attendance.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Course</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.status}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {record.courseId ? record.courseId.name : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No attendance records found</p>
          )}
          
          {/* Add the Download Button */}
          <DownloadButton student={student} attendance={attendance} />
        </div>
      )}
    </div>
  );
};

export default StudentPortal;