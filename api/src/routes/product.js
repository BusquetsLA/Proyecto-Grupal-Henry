const { Router } = require('express');
const { 
    getProducts, 
    getProductById,
    createProducts,
    updateProductById,
    deleteProduct
  } = require('../controllers/productControllers');

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/addProducts', createProducts);
router.put('/update/', updateProductById);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
