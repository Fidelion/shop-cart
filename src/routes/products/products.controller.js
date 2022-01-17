const { getAllProducts } = require('../../models/products.model');
const products = require('../../models/products.mongo');

const { getPagination } = require('../../services/query');

async function httpGetAllProducts(req, res) {
    const { skip, limit } = getPagination(req.query);

        if(req.query.name) {
            const { name } = req.query;
            const nameMatching = await products.find({name});
            res.status(200).json(nameMatching);
        } else {
            const products = await getAllProducts(skip, limit);
            return res.status(200).json(products);
        }
}

module.exports = {
    httpGetAllProducts
}