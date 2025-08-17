import React, { useState } from 'react';
import { updatePaymentStatus } from '../services/api';

const PaymentStatus = ({ student, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(student.paymentStatus || '');
  const [due, setDue] = useState(student.dueAmount || 0);
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    try {
      await updatePaymentStatus(student._id, {
        paymentStatus: selectedStatus,
        dueAmount: due
      });
      setMessage('Payment status updated!');
      if (onUpdate) onUpdate();
    } catch {
      setMessage('Update failed.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', margin: '12px', padding: '12px' }}>
      <h4>{student.name} (ID: {student.Id})</h4>
      <label>Status: </label>
      <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="PAID">Paid</option>
        <option value="UNPAID">Unpaid</option>
      </select>
      <label style={{ marginLeft: '10px' }}>Due Amount:</label>
      <input
        type="number"
        value={due}
        onChange={e => setDue(Number(e.target.value))}
        min={0}
        style={{ width: '70px', marginLeft: '5px' }}
      />
      <button onClick={handleUpdate} style={{ marginLeft: '10px' }}>Update</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PaymentStatus;
