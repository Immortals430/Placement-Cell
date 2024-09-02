import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    batch: {
        type: Number,
        required: true
    },
    collegeName: {
        type: String,
        required: true
    },
    score: {
        dsaScore: {
            type: Number,
            required: true
        },
        webDScore: {
            type: Number,
            required: true
        },
        reactScore: {
            type: Number,
            required: true
        }
    },
    interviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'interviews'
        }
    ],
    result: {
        type: String,
        enum: ['PASS', 'FAIL'],
        required: true
    }
});

const Student = mongoose.model('students', studentSchema);
export default Student;
