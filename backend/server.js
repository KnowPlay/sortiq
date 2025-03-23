import express from "express";

const app = express();

// GET Request
app.get("/", (req, res) => {
    res.send("Hello World");
})


app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});