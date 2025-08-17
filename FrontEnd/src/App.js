import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddStudent from './pages/AddStudent';
import UpdateStudent from './pages/UpdateStudent';
import AttendancePage from './pages/AttendancePage';
import CourseSelectionPage from './pages/CourseSelectionPage';
import PaymentStatusPage from './pages/PaymentStatusPage';
import UnpaidStudentsPage from './pages/UnpaidStudentsPage';
import './App.css';

const Navbar = () => (
  <nav style={{ padding: "10px", borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
    <Link to="/" style={{ marginRight: 10 }}>Home</Link>
    <Link to="/add" style={{ marginRight: 10 }}>Add Student</Link>
    <Link to="/attendance" style={{ marginRight: 10 }}>Attendance</Link>
    <Link to="/course-selection" style={{ marginRight: 10 }}>Course Selection</Link>
    <Link to="/payment-status" style={{ marginRight: 10 }}>Payment Status</Link>
    <Link to="/unpaid-students" style={{ marginRight: 10 }}>Unpaid Students</Link>
  </nav>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/course-selection" element={<CourseSelectionPage />} />
          <Route path="/payment-status" element={<PaymentStatusPage />} />
          <Route path="/unpaid-students" element={<UnpaidStudentsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
