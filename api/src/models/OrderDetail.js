const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Recordad que hay q ver si hacemos una entidad cart o nol
const OrderDetail = new Schema({
    name: {type:String, required:true},
    price: {type:Schema.Types.Decimal128, required:true},
    quantity: {type:Number, required:true}
});

module.exports = mongoose.model('order_detail', OrderDetail);