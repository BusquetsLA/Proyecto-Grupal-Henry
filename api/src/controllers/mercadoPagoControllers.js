require('dotenv').config()
const { ACCESS_TOKEN } = process.env
const mercadopago = require ('mercadopago')
const Order = require('../models/Order.js')
const User = require('../models/User.js')

mercadopago.configure({ access_token: ACCESS_TOKEN })

async function getId(req, res, next){
    const {user_id} = req.params
    try{
        const user = await User.findById(user_id)
        if(user.cart.length === 0){
            return res.status(404).send("Carrito vacío!")
        }
        let items = user.cart
        let total = items.reduce((acc, { quantity, price }) => acc += quantity * price, 0)
        const order = await Order.create({user_id, items, total})
        user.orders.push(order._id)
        user.cart = []
        await user.save()
        const items_mp = order.items.map(item => ({
            title: item.name,
            unit_price: parseFloat(item.price),
            quantity: item.quantity
        }))
        let preference = {
            items: items_mp,
            external_reference : `${order._id}`,
            payment_methods: {
                excluded_payment_types: [
                  {
                    id: "atm"
                  }
                ],
                installments: 12
            },
            auto_return: "approved",
            back_urls: {
                success: 'http://localhost:3000/Proyecto-Grupal-Henry-client#/paymentstatus/success',
                failure: 'http://localhost:3000/Proyecto-Grupal-Henry-client#/paymentstatus/failure',
                pending: 'http://localhost:3000/Proyecto-Grupal-Henry-client#/paymentstatus/pending',
            }
        }
        const response = await mercadopago.preferences.create(preference)
        console.log("Response: ", response.body)
        global.id = response.body.id
        console.log("Preference id: ", response.body.id)
        return res.status(200).send({ id: global.id })
    }catch(error){
        next(error)
    }
}

async function getPayments(req, res, next){
    const {payment_id, external_reference, merchant_order_id} = req.query
    const payment_status = req.query.status
    try{
        const order = await Order.findById(external_reference)
        order.payment_id= payment_id
        order.payment_status= payment_status
        order.merchant_order_id = merchant_order_id
        order.status = "completed"
        await order.save()
        console.log("Compra completada")
        return res.redirect("https://afl0r3s.github.io/Proyecto-Grupal-Henry-client/#/")
    }catch(error){
        next(error)
    }
}

async function getPaymentOrder(req, res, next){
    const {id} = req.params
    try{
        const mp = new mercadopago(ACCESS_TOKEN)
        const payment = mp.get(`/v1/payments/search`, {'external_reference': id})
        return res.status(200).send(payment)
    }catch(error){
        next(error)
    }
}

module.exports = {
    getId,
    getPayments,
    getPaymentOrder
}