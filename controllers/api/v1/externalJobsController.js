import axios from 'axios';

// Fetch external jobs from API
export const externalJobPage = async (req, res) => {
    try {
        const { data } = await axios.get('https://www.arbeitnow.com/api/job-board-api');
        res.render('externalJobs', { jobs: data.data, url: req.originalUrl });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching job data');
    }
};
