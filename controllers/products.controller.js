const productService = require('../services/product.service');

async function getAllProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

module.exports = {
    getAllProducts
};