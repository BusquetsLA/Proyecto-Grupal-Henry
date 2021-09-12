const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user_id: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    items: [{type:mongoose.Schema.Types.ObjectId, ref:'order_detail'}],
    status: {type:String, enum:['created', 'processing', 'cancelled', 'completed'], required:true},
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
