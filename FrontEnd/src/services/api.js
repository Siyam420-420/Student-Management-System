import axios from 'axios';

const API_BASE_URL = 'http://localhost:4200/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all students
export const getAllStudents = async () => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add new student
export const addStudent = async (studentData) => {
  try {
    const response = await api.post('/students', studentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update student
export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;
