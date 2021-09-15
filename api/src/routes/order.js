const { Router } = require('express')
const {
    getOrders,
    getUserOrders,
    getOrderById,
    createOrder,
    addOrderItem,
    deleteOrderItem
} = require('../controllers/orderControllers.js')

const router = Router()

router.get('/', getOrders)
router.get('/:user_id', getUserOrders)
router.get('/:user_id/:order_id', getOrderById)
router.post('/:user_id', createOrder)
router.put('/:user_id/:order_id', addOrderItem)
router.delete('/:user_id/:order_id/:product_id', deleteOrderItem)

module.exports = router