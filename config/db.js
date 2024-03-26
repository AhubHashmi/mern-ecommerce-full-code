import mongoose from "mongoose";

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    try {
        console.log(`Successfully connected to db ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in db ${error}`)
    }
};

export default connectDB;