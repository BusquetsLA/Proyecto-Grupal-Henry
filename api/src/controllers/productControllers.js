const Product = require('../models/Product');
const Category = require('../models/Category');

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
        //console.log("Product: ", product);
            await product.save(async () => {
                for(let i=0; i<product.categories.length; i++){
                    let category = await Category.findById(product.categories[i])
                    category.products.push(product._id)
                    category.save()
                }
        });
        return res.status(200).send({message: `Producto: ${name} creado correctamente`});
        //return res.status(200).send('Producto creado correctamente');
    } catch (error) {
        next(error);
    }
}

async function updateProductById(req, res, next) {
    //const {id} = req.params;
    //console.log(req.body)
    const {id, name, image_url, price, description, stock, categories} = req.body;
    try {
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).send({message: `Producto no encontrado`});
        }else{
            await Product.updateOne({_id: id}, {name, image_url, price, description, stock, categories})
            .exec(async () => {
                for(let i=0; i<Product.categories.length; i++){
                    let category = await Category.findById(product.categories[i])
                    category.products.push(product._id)
                    category.save()
                }
            })
            return res.status(200).send({message: `Producto actualizado correctamente`});
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
            return res.status(200).send({message: `Producto eliminado correctamente! `});
        }else{
            return res.status(404).send({message: `Producto no encontrado.. `});
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
