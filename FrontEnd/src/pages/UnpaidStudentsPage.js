import React, { useEffect, useState } from 'react';
import { getUnpaidStudents } from '../services/api';

const UnpaidStudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getUnpaidStudents();
      setStudents(res.data || []);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Unpaid Students</h1>
      <ul>
        {students.length === 0
          ? <li>All students have paid.</li>
          : students.map(s => (
            <li key={s._id}>
              {s.name} (ID: {s.Id}) – Status: {s.paymentStatus} – Due: {s.dueAmount}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default UnpaidStudentsPage;
