const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user_id: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    items: [
      {
        _id: {type:mongoose.Schema.Types.ObjectId, ref:'product'},
        name: {type:String, required:true},
        quantity: {type:Number, required:true, default:1},
        price: {type:mongoose.Schema.Types.Decimal128, required:true}
      }
    ],
    status: {type:String, enum:['created', 'processing', 'cancelled', 'completed'], default:'created'},
    total: {type:mongoose.Schema.Types.Decimal128, default:0},
    payment_id: {type:Number, default:0},
    paymet_status: {type:String, default:''},
    merchant_order_id: {type:Number, default:0}
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
