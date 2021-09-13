const { Router } = require('express');

const other = require('./other');
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const userRouter = require('./userRoutes');
const reviewRouter = require('./review.js');

const sendMailRouter = require('./sendMail.js');
const order = require('./order.js');
const mercadoPago = require('./mercadoPago.js');


const router = Router();

router.use('/',other);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/user', userRouter);
router.use('/reviews', reviewRouter);

router.use('/email', sendMailRouter);
router.use('/order', order);
router.use('/mercadopago', mercadoPago);


module.exports =  router;