import express from "express"; // Importing express package
import dotenv from "dotenv"; // Importing dotenv package
import { connectDB } from "./config/db.js";  // Importing connectDB function from db.js

dotenv.config(); // Configuring dotenv

const app = express(); // Creating an express app

// POST Request
app.post("/products", async (req, res) => {
    const product = req.body; // Getting the product from the request body
    //console.log(product); // Logging the product

    if (!product.name || !product.price || !product.image) { // Checking if the product has all the required fields or not)
        return res.status(400).json({ success: false, message: "Please provide all fields" }); // Returning an error message
    }

    // Creating a new product
    const newProduct = new Product({
        name: product.name,
        price: product.price,
        image: product.image,
    });

    try {
        await newProduct.save(); // Saving the product to the database
        return res.status(201).json({ success: true, data: newProduct, message: "Product created successfully" }); // Returning a success message
    } catch (error) {
        console.error("Error in Create Product:", error.message); // Logging the error message
        return res.status(500).json({ success: false, message: "Internal Server Error"); // Returning server error message
    }
});

//console.log(process.env.MONGO_URI); // Logging the MONGO_URI

app.listen(8000, () => {
    connectDB(); // Connecting to MongoDB
    console.log("Server started at http://localhost:8000"); // Starting the server
});

