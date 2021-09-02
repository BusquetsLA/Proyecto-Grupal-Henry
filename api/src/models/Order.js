const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [
            {
                name: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                image: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
            },
        ],
        orderState: {
            type: String,
            enum: ['cart', 'pending', 'processing', 'canceled', 'completed'],
            default: 'cart',
            required: true,
        },
        // estado de envío
        shippingState: {
            type: String,
            enum: ['not initialized', 'initial', 'despachado', 'entregado'],
            default: 'not initialized'
        },
        // dirección de envío
        shipping: {
            type: Number,
            required: true
        },
        shippingAddress: {
            type: String,
            required: true
        },
        shippingLocated: {
            type: String,
            required: true
        },
        shippingcity: {
            type: String,
            required: true
        },
        // Pagos
        paymentId: {
            type: String,
            required: true
        },
        paymentState: {
            type: String,
            default: 'not initialized'
        },
        // Precio de envío
        shippingPrice: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;