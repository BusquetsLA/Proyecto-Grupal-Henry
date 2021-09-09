const { Router } = require('express');

const {
    getReviews,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewControllers.js');

const router = Router();

router.get('/', getReviews);
router.post('/addReview', createReview);
router.put('/update/:id', updateReview);
router.delete('/delete/:id', deleteReview);

module.exports = router;