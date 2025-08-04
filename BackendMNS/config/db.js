import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); 
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    
    // Provide more specific error information
    if (error.message.includes('authentication failed')) {
      console.error('Authentication Error: Please check your MongoDB username and password');
      console.error('Make sure the user exists and has the correct permissions');
    }
    
    if (error.message.includes('network')) {
      console.error('Network Error: Please check your internet connection and MongoDB cluster availability');
    }
    
    process.exit(1);
  }
};

export default connectDB;