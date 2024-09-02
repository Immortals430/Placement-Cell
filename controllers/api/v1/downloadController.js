import Student from "../../../models/studentModel.js";
import { stringify } from "csv-stringify";

// Download CSV
export const download = async (req, res) => {
  try {
    const students = await Student.find({}).populate("interviews");
    const data = [];

    students.forEach((elem, i) => {
      let temp = {
        "S no.": i + 1,
        "Student Name": elem.studentName,
        Batch: elem.batch,
        Email: elem.email,
        "Student College": elem.collegeName,
        "DSA Score": elem.score.dsaScore,
        "WebD Score": elem.score.webDScore,
        "React Score": elem.score.reactScore,
        "Student Result": elem.result,
        "Interview Company": elem.interviews
          .map((elem) => elem.companyName)
          .toString(),
      };
      data.push(temp);
    });

    // Generate CSV in memory
    stringify(data, { header: true }, (err, output) => {
      if (err) {
        return res.status(500).send("Error generating CSV");
      }
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=data.csv");
      res.send(output);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating CSV");
  }
};
