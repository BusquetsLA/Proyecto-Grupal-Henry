const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true, lowercase: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, required: true, default: false},
        reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'review'}],
        orders: [{type:mongoose.Schema.Types.ObjectId, ref: 'Order'}],
        suscribed: {type: Boolean, default: false},
        blocked: {type: Boolean, default: false},
        logged: {type: Boolean, default:false},
        cart: [{
            product: {type:mongoose.Schema.Types.ObjectId, ref:'products'},
            quantity: {type:Number, required: true, default:1}
        }]
    },
    { timestamp: true }
)

const User = mongoose.model('User', userSchema);

module.exports = User;
