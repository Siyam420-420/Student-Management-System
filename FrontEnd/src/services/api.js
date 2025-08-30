import axios from 'axios';

const API_BASE_URL = 'http://localhost:4200/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Students
export const getAllStudents = async () => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addStudent = async (studentData) => {
  try {
    const response = await api.post('/students', studentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Attendance
export const addAttendance = async (attendanceData) => {
  try {
    const response = await api.post('/attendance', attendanceData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAttendanceByStudent = async (studentId) => {
  try {
    const response = await api.get(`/attendance/${studentId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Alias for getAttendanceByStudent with a more descriptive name
export const getAttendanceByStudentId = async (studentId) => {
  try {
    const response = await api.get(`/attendance/${studentId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Courses
export const getAllCourses = async () => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addCourse = async (courseData) => {
  try {
    const response = await api.post('/courses', courseData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const enrollCourse = async (studentId, courseId) => {
  try {
    const response = await api.post(`/students/${studentId}/courses`, { courseId });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const removeCourse = async (studentId, courseId) => {
  try {
    const response = await api.delete(`/students/${studentId}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Payment
export const updatePaymentStatus = async (studentId, paymentData) => {
  try {
    const response = await api.put(`/students/${studentId}/payment`, paymentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUnpaidStudents = async () => {
  try {
    const response = await api.get('/students/unpaid');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;