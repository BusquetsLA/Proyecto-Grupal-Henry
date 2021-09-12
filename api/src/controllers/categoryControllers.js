const Category = require('../models/Category');

// Todas las rutas tienen funcionalidad 

async function getCategories(_req, res, next) {
    try {
        const categories = await Category.find()
        .populate('products')
        .exec();
        return res.send(categories);
    } catch (error) {
        next(error);
    }
}

async function getCategory(req, res, next) {
    const { id } = req.params;
    try {
        const category = await Category.findById(id)
        .populate('products')
        .exec();
        if (category) {
            return res.json(category);
        }
        return await res.send('La categoría no existe');
    } catch (error) {
        next(error);
    }
}

async function createCategory(req, res, next) {
    const { image_url, name } = req.body;
    try {
        const category = new Category({ image_url, name });
        await category.save();
        return res.status(200).send(`La categoría ${name} ha sido creada`);
    } catch (error) {
        next(error);
    }
}

async function updateCategory(req, res, next) {
    const { id } = req.params;
    const { image_url, name, products } = req.body;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).send('La categoría no existe')
        } else {
            await Category.updateOne({ _id: id }, { image_url, name, products })
            return res.status(200).send(`La categoría ${name} ha sido actualizada`);
        }
    } catch (error) {
        next(error);
        return res.send(`Categoría no encontrada`);
    }
}

async function deleteCategory(req, res, next) {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if(!category){
            await Category.deleteOne({_id: id});
            return res.status(200).send('Categoría eliminada');
        }else{
            return res.status(404).send('Categoría no encontrada');
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    deleteCategory,
    updateCategory
};
