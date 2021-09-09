const mongoose = require('mongoose');
const {Schema} = mongoose;

const Product = new Schema({
    image_url: {type:String, required:true},
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    stock: {type:Number, required:true},
    categories: [{type: Schema.Types.ObjectId, ref: 'categories'}],
    reviews: [{type:Schema.Types.ObjectId, ref:'review'}]
});

module.exports = mongoose.model('products', Product);