const mongoose = require('mongoose');
const Product = require('../models/product.model');

function ensureDatabaseConnection() {
    if (mongoose.connection.readyState !== 1) {
        const error = new Error('MongoDB is not connected');
        error.code = 'DB_UNAVAILABLE';
        throw error;
    }
}

function serializeProduct(product) {
    const { _id, __v, ...fields } = product;
    return { ...fields, id: String(_id) };
}

async function getAllProducts() {
    ensureDatabaseConnection();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return products.map(serializeProduct);
}

async function createProduct(productData) {
    ensureDatabaseConnection();
    const product = await Product.create({
        name: productData.name.trim(),
        category: productData.category.trim(),
        price: Number(productData.price),
        description: productData.description?.trim() || '',
        image: productData.image?.trim() || '',
        stock: Number(productData.stock),
        rating: 0
    });
    return serializeProduct(product.toObject());
}

async function deleteProduct(id) {
    ensureDatabaseConnection();
    if (!mongoose.isValidObjectId(id)) return null;
    const product = await Product.findByIdAndDelete(id).lean();
    return product ? serializeProduct(product) : null;
}

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct
};