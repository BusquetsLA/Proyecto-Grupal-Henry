const Product = require('../models/Product');

async function getProducts(req, res, next) {
    const {name} = req.query;
    try {
        const products = await Product.find();
        if(!name){
            return res.status(200).send(products);
        }else{
            const productsByName = products.filter( product => product.name.toLowerCase().includes(name.toLowerCase()));
            return res.status(200).send(productsByName);
        }
    } catch (error) {
        next(error);
    }
}

async function getProductById(req, res, next) {
  const { id } = req.params;
  try {
    const detail = await Product.findById(id);
    return res.status(200).send(detail);
  } catch (error) {
    next(error);
  }
}

async function createProducts(req, res, next) {
    const {name, price, description, image_url, categories, stock} = req.body;
    try {
        const product = new Product({name, price, description, image_url, categories, stock});
        await product.save();
        return res.status(200).send('Producto creado correctamente');
    } catch (error) {
        next(error);
    }
}

async function updateProductById(req, res, next) {
    const {id} = req.params;
    const {name, image_url, price, description, categories} = req.body;
    try {
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).send("Producto no encontrado")
        }else{
            await Product.updateOne({_id: id}, {name, image_url, price, description, categories})
            return res.status(200).send("Producto actualizado correctamente");
        }
    } catch (error) {
        next(error);
    }
}

async function deleteProduct(req, res, next) {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if(product){
            await Product.deleteOne({_id: id});
            return res.status(200).send("Producto eliminado correctamente");
        }else{
            return res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProducts,
    updateProductById,
    deleteProduct
};
