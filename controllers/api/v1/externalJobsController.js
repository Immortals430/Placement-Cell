const axios = require('axios')

// fetch external job from api
module.exports.externalJobPage = async (req, res) => {
    let jobs = await axios('https://www.arbeitnow.com/api/job-board-api')
    res.render('externalJobs', { jobs: jobs.data.data, url: req.originalUrl})
}