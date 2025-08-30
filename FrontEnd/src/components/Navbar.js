import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/admin">Dashboard</Link> | 
    <Link to="/admin/add">Add Student</Link> | 
    <Link to="/admin/attendance">Attendance</Link> | 
    <Link to="/admin/course-selection">Courses</Link> | 
    <Link to="/admin/payment-status">Payments</Link> | 
    <Link to="/admin/unpaid-students">Unpaid List</Link>
  </nav>
);

export default Navbar;