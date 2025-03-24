import express from "express"; // Importing express package
import dotenv from "dotenv"; // Importing dotenv package
import { connectDB } from "./config/db.js";  // Importing connectDB function from db.js
import Product from "./models/product.model.js"; // Importing the Product model
//import { mongo } from "mongoose";      
import mongoose from 'mongoose';


dotenv.config(); // Configuring dotenv

const app = express(); // Creating an express app

app.use(express.json()); // Enabling JSON parsing, allows to accept JSON data in the req.body

/*
CRUD OPERATIONS
*/

// READ: GET /api/products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({}); // Fetching all the products from the database
        //res.json(products); // Sending the products as a response
        return res.status(200).json({ success: true, data: products }); // Sending a success message
    } catch (error) {
        console.log("Error in Fetching Products:", error.message); // Logging the error message
        return res.status(500).json({ message: "Server Error" }); // Sending a server error message
    }
});

// CREATE: POST /api/products
app.post("/api/products", async (req, res) => {
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
        console.log("Error in Create Product:", error.message); // Logging the error message
        return res.status(500).json({ success: false, message: "Internal Server Error" }); // Returning server error message
    }
});

// UPDATE: PUT /api/products/:id
app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params; // Getting the id from the request parameters

    const product = req.body; // Getting the product from the request body
    //console.log("id:", id); // Logging the id
    //console.log(product); // Logging the product

    if (!mongoose.Types.ObjectId.isValid(id)) { // Checking if the id is a valid MongoDB id or not
        return res.status(404).json({ success: false, message: "Product Not Found" }); // Sending an invalid product id message
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // Updating the product
        res.status(200).json({ success: true, data: updatedProduct, message: "Product Updated Successfully" }); // Sending a success message        
    } catch (error) {
        console.log("Error in Update Product:", error.message); // Logging the error message
        return res.status(500).json({ success: false, message: "Server Error" }); // Sending a server error message
    }

});

// DELETE: DELETE /api/products/:id
app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params; // Getting the id from the request parameters
    //console.log("id:", id); // Logging the id
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted" });  // Sending a success message
    } catch (error) {
        console.log("Error in Delete Product:", error.message); // Logging the error message
        return res.status(404).json({ message: "Product not found" }); // Sending a not found message
    }

    // try {
    //     const product = await Product.findById(req.params.id); // Finding the product by id
    //     if (product) {
    //         await product.remove(); // Removing the product
    //         res.json({ message: "Product removed successfully" }); // Sending a success message
    //     } else {
    //         res.status(404).json({ message: "Product not found" }); // Sending a not found message
    //     }
    // } catch (error) {
    //     console.error("Error in Delete Product:", error.message); // Logging the error message
    //     res.status(500).json({ message: "Internal Server Error" }); // Sending a server error message
    // }
});

//console.log(process.env.MONGO_URI); // Logging the MONGO_URI

// Starting the server
app.listen(8000, () => {
    connectDB(); // Connecting to MongoDB
    console.log("Server started at http://localhost:8000");
});

