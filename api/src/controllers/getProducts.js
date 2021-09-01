const Product = require('../models/Product');

async function getProducts(){
    return await Product.find();
}

module.exports = getProducts;