const Interview = require('../../../models/interviewModel')
const Student = require('../../../models/studentModel')

// render interview page
module.exports.interviewPage = async (req, res) => {
    const {companyID} = req.query
    let interviewList = await Interview.find({})
    let interviewDetail = await Interview.findById(companyID)
    .populate({
        path: 'students',
        populate: 'studentName'
    })
    let students = await Student.find({})
    res.render('interview', { interviewList, interviewDetail, companyID, students, url: req.originalUrl  })
}


// add company
module.exports.addInterview = async (req, res) => {
    let { companyName } = req.body
    await Interview.create({ companyName })
    res.redirect('/api/v1/interview')
}

// allot student to company
module.exports.addStudent = async (req, res) => {
    try{
        let { email, interviewDate, status, companyID } = req.body
        let student = await Student.findOne({email})

        if(student && companyID != 'null'){
            let { students } = await Interview.findById(companyID)
            .populate({
                path: 'students',
                populate: 'studentName'
            })
    
            for(data of students){
                if(email == data.studentName.email) return
                else continue
            }

            let company = await Interview.findById(companyID)
            let obj = {
                studentName: student._id,
                status,
                interviewDate
            }
            company.students.push(obj)
            company.save()
            student.interviews.push( companyID )
            student.save()
            res.redirect('back')
        }
        else {
            console.log("Student does not exist")
            res.redirect('back')
        }
    }
    catch(err){
        console.log(err)
    }
}


// deete company
module.exports.deleteCompany = async (req, res) => {
    let { companyID } = req.query
    await Student.updateMany({ }, { $pull: { interviews: companyID } })
    await Interview.findByIdAndDelete(companyID)
    res.redirect('back')
}