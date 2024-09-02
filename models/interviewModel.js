import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    students: [
        {
            studentName: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'students',
                required: true
            },
            status: {
                type: String,
                enum: ['PASS', 'FAIL', 'On Hold', 'Didn’t Attempt'],
                required: true
            },
            interviewDate: {
                type: String,
                required: true
            }
        }
    ]
});

const Interview = mongoose.model('interviews', interviewSchema);
export default Interview;
