const axios = require('axios').default;
const Product = require('../models/Product');
const Category = require('../models/Category');

async function getProducts(){
    return await Product.find();
}

async function getCategories(){
    return await Category.find();
}

module.exports = {
    getProducts,
    getCategories
}