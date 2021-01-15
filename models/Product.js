const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory'
    }
});

module.exports = mongoose.model('Product', ProductSchema);