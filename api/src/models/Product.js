const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: mongoose.Types.Decimal128,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        weight: {
            type: mongoose.Types.Decimal128,
            required: true
        },
        height: {
            type: mongoose.Types.Decimal128,
            required: true
        },
        width: {
            type: mongoose.Types.Decimal128,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        category: {
            type: [mongoose.Types.ObjectId]
        }
    },
    { timestamp: true }
);

const Product = mongoose.model('product', productSchema);

module.exports = Product;