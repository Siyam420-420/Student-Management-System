import mongoose from "mongoose";
const studentsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    Id:{
        type: Number,
        required: true
    },
    Date:{
        type: Date,
        required: true
    }
});

const Student =mongoose.model("Student", studentsSchema);
export default Student;