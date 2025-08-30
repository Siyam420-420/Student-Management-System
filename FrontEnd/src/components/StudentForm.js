import React, { useState } from 'react';

const StudentForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    Id: initialData.Id || '',
    Date: initialData.Date ? initialData.Date.split('T')[0] : '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.Id) newErrors.Id = 'ID is required';
    if (!formData.Date) newErrors.Date = 'Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        Id: parseInt(formData.Id),
        Date: new Date(formData.Date)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <div className="form-group">
        <label htmlFor="name">Student Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="Id">Student ID:</label>
        <input
          type="number"
          id="Id"
          name="Id"
          value={formData.Id}
          onChange={handleChange}
          className={errors.Id ? 'error' : ''}
        />
        {errors.Id && <span className="error-text">{errors.Id}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="Date">Date:</label>
        <input
          type="date"
          id="Date"
          name="Date"
          value={formData.Date}
          onChange={handleChange}
          className={errors.Date ? 'error' : ''}
        />
        {errors.Date && <span className="error-text">{errors.Date}</span>}
      </div>

      <button type="submit" className="submit-btn">
        {isEditing ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
};

export default StudentForm;
