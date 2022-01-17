const express = require('express');
const { httpGetCart, httpAddProducts, httpGetAllProducts, httpGetTopProducts, httpAddCart } = require('./shopping.controller');
const { middlewareDecode } = require('../../middleware/auth');

const shoppingRouter = express.Router();

shoppingRouter.get('/all', httpGetAllProducts);
shoppingRouter.get('/top', httpGetTopProducts);
shoppingRouter.get('/', middlewareDecode, httpGetCart);
shoppingRouter.post('/', middlewareDecode, httpAddProducts);


module.exports = shoppingRouter;