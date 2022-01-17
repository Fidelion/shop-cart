const express = require('express');
const { httpGetAllProducts } = require('./products.controller');
const { middlewareDecode } = require('../../middleware/auth');

const productsRouter = express.Router();

productsRouter.get('/:name?', middlewareDecode, httpGetAllProducts);

module.exports = productsRouter;