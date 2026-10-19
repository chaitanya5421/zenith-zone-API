const productService = require('../services/product.service');

function sendProductError(res, error, action) {
    const status = error.code === 'DB_UNAVAILABLE' ? 503 : 500;
    const message = status === 503 ? 'Product database is unavailable' : `Failed to ${action} products`;
    return res.status(status).json({ error: message });
}

async function getAllProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        return sendProductError(res, error, 'fetch');
    }
}

async function createProduct(req, res) {
    const { name, category, price, stock } = req.body;
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (!name?.trim() || !category?.trim() || !Number.isFinite(parsedPrice) || parsedPrice < 0 || !Number.isInteger(parsedStock) || parsedStock < 0) {
        return res.status(400).json({ error: 'Name, category, a valid price, and a non-negative whole-number stock are required.' });
    }

    try {
        const product = await productService.createProduct({ ...req.body, price: parsedPrice, stock: parsedStock });
        return res.status(201).json(product);
    } catch (error) {
        return sendProductError(res, error, 'create');
    }
}

async function deleteProduct(req, res) {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        return sendProductError(res, error, 'delete');
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct
};