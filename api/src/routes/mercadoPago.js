const { Router } = require('express')
const {
    getId,
    getPayments,
    getPaymentOrder
} = require('../controllers/mercadoPagoControllers.js')

const router = Router();

router.get('/:user_id/:order_id', getId)
router.get('/pagos', getPayments)
router.get('/pagos/:id', getPaymentOrder)

module.exports = router