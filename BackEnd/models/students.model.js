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
    },
    paymentStatus: {
        type: String,
        enum: ["PAID", "UNPAID", "PARTIAL"],
        default: "UNPAID"
    },
    dueAmount: {
        type: Number,
        default: 0
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
});


const Student =mongoose.model("Student", studentsSchema);
export default Student;