const mongoose = require('mongoose')
const DB = process.env.DB

// connect to db
const connectMongoDB = async () => {
    try{
        await mongoose.connect(DB)
        console.log("Connected to MongoDB")
    }
    catch(err){
        console.log(err)
    }

}

connectMongoDB()

const db = mongoose.connection;

module.exports = db