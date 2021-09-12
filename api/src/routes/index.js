const { Router } = require('express');

const other = require('./other');
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const userRouter = require('./userRoutes');
const reviewRouter = require('./review.js');
const sendMailRouter = require('./sendMail.js');

const router = Router();

router.use('/',other);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/user', userRouter);
router.use('/reviews', reviewRouter);
router.use('/sendMail', sendMailRouter);

module.exports =  router;