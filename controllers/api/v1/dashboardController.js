const Student = require('../../../models/studentModel')


// redirect to home
module.exports.root = (req, res) => {
    res.redirect('/api/v1/dashboard')
}


// render homepage
module.exports.dashBoard = async (req, res) => {
    let studentData = await Student.find({}).populate('interviews')
    res.render('dashboard', { studentData, url: req.originalUrl })
}


// add student data
module.exports.addStudent = async (req, res) => {
    try{
        const { studentName, email, batch, collegeName,dsaScore,webDScore,reactScore, result } = req.body
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
            result
        })
        res.redirect('/api/v1/dashboard')
    }
    catch(err){ console.log(err) }
}