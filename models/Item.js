const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: true
    },  
    stock: {
        type: String, 
        required: true
    }, 
    image: {
        type: String, 
        required: true
    },
    price: {
        type: String,
        require: true
    }
});


module.exports = mongoose.model("Item", itemSchema);