const Order = require('../models/Order.js')
const Product = require('../models/Product.js')
const {getOrder} = require('./utils.js')

async function getOrders(req, res, next){
    const {user_id} = req.params
    try{
        const orders = await Order.find({user_id})
        return res.status(200).send(orders)
    }catch(error){
        next(error)
    }
}

async function getOrderById(req, res, next){
    const {user_id, order_id} = req.params
    try{
        const order = await getOrder(user_id, order_id)
        if(order){
            return res.status(200).send(order)
        }else{
            return res.status(404).send("Orden no encontrada")
        }
    }catch(error){
        next(error)
    }
}

async function addOrderItem(req, res, next){
    const {user_id, order_id} = req.params
    const {product_id, quantity} = req.body
    try{
        const order = await getOrder(user_id, order_id)
        const product = await Product.findById(product_id);
        if(!product){
            return res.status(404).send("Producto no encontrado")
        }
        const name = product.name
        const price = product.price
        if(order){
            let itemIndex = order.items.findIndex(item => item.product_id === product_id)
            if(itemIndex > -1){
                let productItem = order.items[itemIndex]
                productItem.quantity += quantity
                order.items[itemIndex] = productItem
            }else{
                order.items.push({product_id, name, quantity, price})
            }
            order.total += quantity*price
            await order.save()
            return res.status(200).send("Item agregado o modificado correctamente")
        }else{
            const newOrder = await Order.create({
                user_id,
                items:[{product_id, name, quantity, price}], 
                total:quantity*price
            })
            return res.status(200).send("Orden creada");
        }
    }catch(error){
        next(error)
    }
}

async function deleteOrderItem(req, res, next){
    const {user_id, order_id, product_id} = req.params
    try{
        const order = await getOrder(user_id, order_id)
        let itemIndex = order.items.findIndex(item => item.product_id === product_id)
        if(itemIndex > -1){
            let productItem = order.items[itemIndex]
            order.total -= productItem.quantity * productItem.price
            order.items.splice(itemIndex, 1)
        }
        await order.save()
        return res.statsu(200).send("Item eliminado")
    }catch(error){
        next(error)
    }
}

module.exports = {
    getOrders,
    getOrderById,
    addOrderItem,
    deleteOrderItem
}