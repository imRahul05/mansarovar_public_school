import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); 
const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI)
    const conn = await mongoose.connect(process.env.MONGODB_URI , {
      // These options are no longer needed in newer versions of Mongoose
      // but kept for backward compatibility
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;