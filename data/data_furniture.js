
const mongoose = require("mongoose");

// Initialize conection to localhost
mongoose.connect("mongodb://localhost:27017/mi_base");

// Create a model for storing data 
const Furniture = mongoose.model("Furniture", {
    id: Number,
    typeOf_Operation: String,
    typeOf_Furniture: String,
    direction_sent: String,
    pictures: String,
    styles: String,
    square_meters: Number,
    description: String,
    buyer_data: String
});

module.exports = Furniture;