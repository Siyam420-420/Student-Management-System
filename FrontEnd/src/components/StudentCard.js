import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentCard = ({ student, onUpdate }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleEdit = () => {
    // This should be correct - navigating to /admin/update/:id
    navigate(`/admin/update/${student._id}`, { state: { student } });
  };

  return (
    <div className="student-card">
      <div className="student-info">
        <h3>{student.name}</h3>
        <p><strong>ID:</strong> {student.Id}</p>
        <p><strong>Date:</strong> {formatDate(student.Date)}</p>
      </div>
      <div className="student-actions">
        <button onClick={handleEdit} className="edit-btn">
          Edit
        </button>
      </div>
    </div>
  );
};

export default StudentCard;