import Student from '../../../models/studentModel.js';

// Redirect to home
export const root = (req, res) => {
    res.redirect('/api/v1/dashboard');
};

// Render homepage
export const dashBoard = async (req, res) => {
    try {
        const studentData = await Student.find({}).populate('interviews');
        res.render('dashboard', { studentData, url: req.originalUrl });
    } catch (err) {
        console.error(err);
    }
};

// Add student data
export const addStudent = async (req, res) => {
    try {
        const { studentName, email, batch, collegeName, dsaScore, webDScore, reactScore, result } = req.body;
        await Student.create({
            studentName,
            email,
            batch,
            collegeName,
            score: {
                dsaScore,
                webDScore,
                reactScore,
            },
            interviews: [],
            result,
        });
        res.redirect('/api/v1/dashboard');
    } catch (err) {
        console.error(err);
    }
};
