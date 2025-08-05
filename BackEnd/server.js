
import express from "express"; 
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./config/db.js";
import Student from "./models/students.model.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json({ success: true, data:students});
  } catch (error){
    console.log("error in fetching products:", error.message);
    res.status(500).json({success: false, message: "Server Error"});

  }
})

app.post("/api/students", async (req,res) => {
    const student = req.body; //user will send data
    if (!student.name || !student.Id || !student.Date){
        return res.status(404).json({success:false, message: "Please provide all the information fast"});
    }

    const newstudent = new Student(student)

    try {
      await newstudent.save();
      res.status(201).json({success: true, data: newstudent});
    } catch (error){
      console.error("Error in adding Student: ", error.message);
      res.status(500).json({success: false, message:"Server error" });

    }
    
    
});


app.put("/api/students/:id",async (req, res) => {
  const { id } = req.params;
  const student = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false, message: "Invalid Student Id"});
  }
  try {
    const updatedStudent=await Student.findByIdAndUpdate(id, student, {new: true});
    res.status(200).json({success: true, data: updatedStudent});
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error"});
  }

});


app.listen(4200,() => {
    connectDB();
    
    console.log("server started at http://localhost:4200");


});


