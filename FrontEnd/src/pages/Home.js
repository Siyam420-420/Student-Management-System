import React from 'react';
import { Link } from 'react-router-dom';
import StudentList from '../components/StudentList';

const Home = () => {
  return (
    <div className="home-page">
      <header className="page-header">
        <h1>Student Management System</h1>
        {/* This should point to /admin/add */}
        <Link to="/admin/add" className="add-student-btn">
          Add New Student
        </Link>
      </header>
      <StudentList />
    </div>
  );
};

export default Home;