import React, { useState, useEffect } from 'react';
import { getAllStudents } from '../services/api';
import PaymentStatus from '../components/PaymentStatus';

const PaymentStatusPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllStudents();
      setStudents(res.data || []);
    }
    fetchData();
  }, []);

  const refresh = async () => {
    const res = await getAllStudents();
    setStudents(res.data || []);
  };

  return (
    <div>
      <h1>Payment Status</h1>
      {students.map(student => (
        <PaymentStatus key={student._id} student={student} onUpdate={refresh} />
      ))}
    </div>
  );
};

export default PaymentStatusPage;
