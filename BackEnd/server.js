import express from "express"; 
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./config/db.js";
import Student from "./models/students.model.js";
import Attendance from "./models/attendance.model.js"; 
import Course from "./models/course.model.js";  

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- STUDENT ROUTES --- //

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find({}).populate("courses");
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/students", async (req, res) => {
  const student = req.body;
  if (!student.name || !student.Id || !student.Date) {
    return res.status(400).json({ success: false, message: "Please provide name, ID, and date." });
  }

  try {
    const newStudent = new Student(student);
    await newStudent.save();
    res.status(201).json({ success: true, data: newStudent });
  } catch (error) {
    console.error("Error adding student:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.put("/api/students/:id", async (req, res) => {
  const { id } = req.params;
  const student = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Student Id" });
  }

  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, student, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, data: updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- ATTENDANCE ROUTES --- //

app.post("/api/attendance", async (req, res) => {
  const { studentId, courseId, date, status } = req.body;

  if (!studentId || !courseId || !date || !status) {
    return res.status(400).json({ success: false, message: "Missing attendance data." });
  }

  if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ success: false, message: "Invalid student or course ID." });
  }

  try {
    const existingAttendance = await Attendance.findOne({ studentId, courseId, date });

    if (existingAttendance) {
      existingAttendance.status = status;
      await existingAttendance.save();
      
      // Populate course information before sending response
      await existingAttendance.populate("courseId");
      return res.status(200).json({ success: true, data: existingAttendance, message: "Attendance updated." });
    }

    const attendance = new Attendance({ studentId, courseId, date, status });
    await attendance.save();
    
    // Populate course information before sending response
    await attendance.populate("courseId");
    res.status(201).json({ success: true, data: attendance, message: "Attendance recorded." });
  } catch (error) {
    console.error("Error saving attendance:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/attendance/:studentId", async (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ success: false, message: "Invalid student ID." });
  }

  try {
    // Populate courseId to get course details
    const attendanceRecords = await Attendance.find({ studentId }).populate("courseId");
    res.status(200).json({ success: true, data: attendanceRecords });
  } catch (error) {
    console.error("Error fetching attendance records:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get attendance by student ID and course ID
app.get("/api/attendance/:studentId/:courseId", async (req, res) => {
  const { studentId, courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ success: false, message: "Invalid student or course ID." });
  }

  try {
    // Populate courseId to get course details
    const attendanceRecords = await Attendance.find({ studentId, courseId }).populate("courseId");
    res.status(200).json({ success: true, data: attendanceRecords });
  } catch (error) {
    console.error("Error fetching attendance records:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- COURSE ROUTES ---

// Get all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Add new course
app.post("/api/courses", async (req, res) => {
  const { name, code, description } = req.body;
  if (!name || !code) {
    return res.status(400).json({ success: false, message: "Name and code are required." });
  }

  try {
    const newCourse = new Course({ name, code, description });
    await newCourse.save();
    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    console.error("Error adding course:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/students/:studentId/courses", async (req, res) => {
  const { studentId } = req.params;
  const { courseId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ success: false, message: "Invalid student or course ID." });
  }

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    if (!student.courses.includes(courseId)) {
      student.courses.push(courseId);
      await student.save();
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error enrolling student in course:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/api/students/:studentId/courses/:courseId", async (req, res) => {
  const { studentId, courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ success: false, message: "Invalid student or course ID." });
  }

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    student.courses = student.courses.filter(cid => cid.toString() !== courseId);
    await student.save();
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error removing course from student:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- PAYMENT ROUTES ---

app.put("/api/students/:studentId/payment", async (req, res) => {
  const { studentId } = req.params;
  const { paymentStatus, dueAmount } = req.body;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ success: false, message: "Invalid student ID." });
  }

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    if (paymentStatus) student.paymentStatus = paymentStatus;
    if (dueAmount !== undefined) student.dueAmount = dueAmount;
    await student.save();
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error updating payment status:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/students/unpaid", async (req, res) => {
  try {
    const unpaid = await Student.find({ paymentStatus: { $ne: "PAID" }, dueAmount: { $gt: 0 } });
    res.status(200).json({ success: true, data: unpaid });
  } catch (error) {
    console.error("Error fetching unpaid students:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- Start Server ---
app.listen(4200, () => {
  connectDB();
  console.log("Server started at http://localhost:4200");
});