// src/components/DownloadButton.js
import React from 'react';

const DownloadButton = ({ student, attendance }) => {
  const downloadStudentInfo = () => {
    // Create student information text
    const studentInfo = `
Student Information
-------------------
Name: ${student.name}
ID: ${student.Id}
Payment Status: ${student.paymentStatus}
Due Amount: $${student.dueAmount}

Enrolled Courses:
${student.courses && student.courses.length > 0 
  ? student.courses.map((course, index) => 
      `${index + 1}. ${typeof course === 'object' ? course.name : `Course ID: ${course}`}`
    ).join('\n')
  : 'No courses enrolled'
}

Attendance Records:
${attendance.length > 0 
  ? attendance.map((record, index) => 
      `${index + 1}. ${new Date(record.date).toLocaleDateString()} - ${record.status} - ${record.courseId ? record.courseId.name : 'N/A'}`
    ).join('\n')
  : 'No attendance records found'
}
    `;

    // Create a blob and download link
    const blob = new Blob([studentInfo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_info_${student.Id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button 
      onClick={downloadStudentInfo} 
      style={{
        marginTop: '20px',
        padding: '10px 15px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Download My Information
    </button>
  );
};

export default DownloadButton;