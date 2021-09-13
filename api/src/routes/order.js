const { Router } = require('express')
const {
    getOrders,
    getOrderById,
    addOrderItem,
    deleteOrderItem
} = require('../controllers/orderControllers.js')

const router = Router()

router.get('/:user_id', getOrders)
router.get('/:user_id/:order_id', getOrderById)
router.post('/:user_id/:order_id', addOrderItem)
router.delete('/:user_id/:order_id/:product_id', deleteOrderItem)

module.exports = router