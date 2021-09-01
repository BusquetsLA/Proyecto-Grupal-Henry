const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Recordad que hay q ver si hacemos una entidad cart o nol
const Cart = new Schema({
    name: {type:String, required:true}
});

module.exports = mongoose.model('carts', Cart);