import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Keep this import

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <h1>Student Management System</h1>
      <div className="homepage-buttons">
        <button 
          onClick={() => navigate('/admin')} 
          className="admin-btn"
        >
          Admin Login
        </button>
        <button 
          onClick={() => navigate('/student-portal')} 
          className="student-btn"
        >
          Student Portal
        </button>
      </div>
    </div>
  );
};

export default Homepage;