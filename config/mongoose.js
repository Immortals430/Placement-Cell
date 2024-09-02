import mongoose from 'mongoose';

const DB = process.env.DB || 'mongodb://127.0.0.1/placement_cell';

// Connect to the database
const connectMongoDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
};
export default connectMongoDB;

// export const db = mongoose.connection;
