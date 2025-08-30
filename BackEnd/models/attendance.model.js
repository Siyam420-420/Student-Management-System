import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["PRESENT", "ABSENT", "LATE", "EXCUSED"], required: true },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
