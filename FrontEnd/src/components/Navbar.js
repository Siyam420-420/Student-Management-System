import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link> | 
    <Link to="/add">Add Student</Link> | 
    <Link to="/attendance">Attendance</Link> | 
    <Link to="/course-selection">Courses</Link> | 
    <Link to="/payment-status">Payments</Link> | 
    <Link to="/unpaid-students">Unpaid List</Link>
  </nav>
);

export default Navbar;
