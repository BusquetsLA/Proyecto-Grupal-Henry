const Review = require('../models/Review');
const Product = require('../models/Product');
const User = require('../models/User');

async function getReviews(req, res, next){
    try{
        const reviews = await Review.find();
        return res.status(200).send(reviews);
    }catch(error){
        next(error);
    }
}

async function getProductReviews(req, res, next){
    const {product_id} = req.params
    try{
        const product = await Product.findById(product_id)
        if(product.reviews) {
            return res.status(200).send(product.reviews)
        }else{
            return res.status(404).send("No hay reviews")
        }
    }catch(error){
        next(error)
    }
}

async function createReview(req, res, next){
    const {title, description, product_id, user_id, calification} = req.body;
    try{
        const review = await new Review({title, description, product_id, user_id, calification});
        await review.save();
        let user = await User.findById(user_id)
        user.reviews.push(review._id)
        await user.save()
        let product = await Product.findById(product_id)
        product.reviews.push(review._id)
        await product.save()
        return res.status(200).send("Review creada correctamente");
    }catch(error){
        next(error);
    }
}

async function updateReview(req, res, next){
    const {id} = req.params;
    const {title, description, calification} = req.body;
    try{
        const review = await Review.findById(id);
        if(!review){
            return res.status(404).send("Review no encontrada");
        }else{
            await Review.updateOne({_id: id}, {title, description, calification});
            return res.status(200).send("Review actualizada correctamente");
        }
    }catch(error){
        next(error);
    }
}

async function deleteReview(req, res, next){
    const { id } = req.params;
    try {
        const review = await Review.findById(id);
        if(review){
            await Review.deleteOne({_id: id});
            return res.status(200).send("Review eliminada correctamente");
        }else{
            return res.status(404).send("Review no encontrada");
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getReviews,
    createReview,
    updateReview,
    deleteReview,
    getProductReviews
};