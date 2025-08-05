import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddStudent from './pages/AddStudent';
import UpdateStudent from './pages/UpdateStudent';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
