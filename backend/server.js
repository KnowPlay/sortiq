import express from "express"; // Importing express package
import dotenv from "dotenv"; // Importing dotenv package
import { connectDB } from "./config/db.js";  // Importing connectDB function from db.js

dotenv.config(); // Configuring dotenv

const app = express(); // Creating an express app

// GET Request
app.get("/products", (req, res) => { // Creating a GET request
    //    res.send("Hello World");
});

console.log(process.env.MONGO_URI); // Logging the MONGO_URI

app.listen(8000, () => {
    connectDB(); // Connecting to MongoDB
    console.log("Server started at http://localhost:8000"); // Starting the server
});

