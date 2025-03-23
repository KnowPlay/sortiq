import mongoose from 'mongoose'; // Importing mongoose


export const connectDB = async () => { // Exporting the function
    try { // Trying to connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI); // Connecting to MongoDB

        console.log(`MongoDB Connected: ${conn.connection.host}`); // Logging the connection host
    } catch (error) { // Catching the error
        console.error(`Error: ${error.message}`); // Logging the error message
        process.exit(1);    // Exiting the process: 1 means error, 0 means success
    }
}