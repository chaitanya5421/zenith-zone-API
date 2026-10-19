const express = require('express');
const cors = require('cors');
const app = express();

const studentsRouter = require('../routes/students.routes');
const productsRouter = require('../routes/products.routes');

// Middleware
app.use(cors());
app.use(express.json());

// Security Headers
app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

app.use('/students', studentsRouter);
app.use('/products', productsRouter);

module.exports = app;