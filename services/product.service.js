const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../data/products.json');

async function getAllProducts() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Failed to read products data');
    }
}

module.exports = {
    getAllProducts
};