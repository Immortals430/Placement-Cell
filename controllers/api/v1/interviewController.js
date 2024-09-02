import Interview from '../../../models/interviewModel.js';
import Student from '../../../models/studentModel.js';

// Render interview page
export const interviewPage = async (req, res) => {
    try {
        const { companyID } = req.query;
        const interviewList = await Interview.find({});
        const interviewDetail = await Interview.findById(companyID)
            .populate({
                path: 'students',
                populate: 'studentName'
            });
        const students = await Student.find({});
        res.render('interview', { interviewList, interviewDetail, companyID, students, url: req.originalUrl });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error rendering interview page');
    }
};

// Add company
export const addInterview = async (req, res) => {
    try {
        const { companyName } = req.body;
        await Interview.create({ companyName });
        res.redirect('/api/v1/interview');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding interview');
    }
};

// Allot student to company
export const addStudent = async (req, res) => {
    try {
        const { email, interviewDate, status, companyID } = req.body;
        const student = await Student.findOne({ email });

        if (student && companyID !== 'null') {
            const { students } = await Interview.findById(companyID)
                .populate({
                    path: 'students',
                    populate: 'studentName'
                });

            for (const data of students) {
                if (email === data.studentName.email) return res.redirect('back');
            }

            const company = await Interview.findById(companyID);
            const obj = {
                studentName: student._id,
                status,
                interviewDate
            };
            company.students.push(obj);
            await company.save();

            student.interviews.push(companyID);
            await student.save();

            res.redirect('back');
        } else {
            console.log('Student does not exist');
            res.redirect('back');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error allotting student to company');
    }
};

// Delete company
export const deleteCompany = async (req, res) => {
    try {
        const { companyID } = req.query;
        await Student.updateMany({}, { $pull: { interviews: companyID } });
        await Interview.findByIdAndDelete(companyID);
        res.redirect('back');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting company');
    }
};
