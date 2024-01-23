const Student = require('../../../models/studentModel')
const fs = require('fs')
const path = require('path')


// download csv
module.exports.download = async (req, res) => {
    let student = await Student.find({}).populate('interviews')
    let report = ''

    student.forEach((value) => {
        report += value._id + ',' + value.studentName + ',' + value.batch + ',' + value.email + ',' + value.collegeName + ',' + value.score.dsaScore + ',' + value.score.webDScore + ',' + value.score.reactScore + ',' + value.result + ',' + '"'

        value.interviews.forEach((student, i, arr) => {             
            report += student.companyName  
            if (i < arr.length - 1) {
                report += ","
            }
        })
        report += '"'
        report += "\n"
     })

    fs.writeFileSync('data.csv',
     `Student ID,Student Name,Batch,Email,Student College,DSA Score,WebD Score,React Score,Student Result,Interview Company\n
     ${report}`)
     res.download(path.resolve('data.csv'))
}