const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: String,
    descruption: String,
    price: Number,
    category: String
});

module.exports = mongoose.model('Product', ProductSchema);