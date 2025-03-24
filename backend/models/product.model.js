import mongoose from 'mongoose'; // Importing mongoose

// Creating a new mongoose schema
const productSchema = new mongoose.Schema({
    name: { // Creating a name field
        type: String,
        required: true,
    },
    price: {  // Creating a price field
        type: Number,
        required: true,
        default: 0,
    },
    image: { // Creating an image field
        type: String,
        required: true,
    },
}, {
    timestamps: true, // createdAt and updatedAt
});

// Creating a model
const Product = mongoose.model('Product', productSchema);

// Exporting the model
export default Product; 