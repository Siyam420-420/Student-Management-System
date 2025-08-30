import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import StudentPortal from './pages/StudentPortal';
import Home from './pages/Home';
import AddStudent from './pages/AddStudent';
import UpdateStudent from './pages/UpdateStudent';
import AttendancePage from './pages/AttendancePage';
import CourseSelectionPage from './pages/CourseSelectionPage';
import PaymentStatusPage from './pages/PaymentStatusPage';
import UnpaidStudentsPage from './pages/UnpaidStudentsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/admin/*" element={
            <>
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
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;