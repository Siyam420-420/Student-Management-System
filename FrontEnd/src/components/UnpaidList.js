import React, { useEffect, useState } from 'react';
import { getUnpaidStudents } from '../services/api';

const UnpaidList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchUnpaid() {
      const res = await getUnpaidStudents();
      setStudents(res.data || []);
    }
    fetchUnpaid();
  }, []);

  return (
    <div className="unpaid-list">
      <h3>Students with Unpaid Dues</h3>
      <ul>
        {students.length === 0
          ? <li>All students have cleared dues!</li>
          : students.map(s => (
            <li key={s._id}>
              {s.name} - Status: {s.paymentStatus} - Due Amount: {s.dueAmount}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default UnpaidList;
