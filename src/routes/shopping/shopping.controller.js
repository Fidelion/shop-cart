const products = require('../../models/products.mongo');
const users = require('../../models/users.mongo');

async function httpGetCart(req, res) {
    const userId = req.header('userid-key');

    const user = await users.findById({
        _id: userId
    });

    if(!user) {
        return res.status(400).json({
            error: 'User does not match userId'
        });
    }

    user.populate('cart.items.productId')
        .then(user => {
            return res.status(200).json({
                cart: user.cart.items
            });
        }).catch(err => res.send({
            msg: err
        }));
}

async function httpAddProducts(req, res) {
    const prodId = req.body.productId;
    
    const userId = req.header('userid-key');

    const user = await users.findById({
        _id: userId
    });

    if(!user) {
        return res.status(400).json({
            error: 'User does not match userId'
        });
    }
    
    products.findById(prodId)
        .then(product => {
        return user.addToCart(product);
        })
        .then(result => {
        res.status(201).json(result)
        });
}

async function httpGetAllProducts(req, res) {
    const products = getAllProducts(cart);

    return res.status(200).json(products);
}

async function httpGetTopProducts(req, res) {

    const stats = await users.aggregate([
        {
            $match: { 'cart.items.quantity': { $gt: 0 }}
        },
        {
            $group: {
                _id: '$cart.items.productId',
                productCount: { $max: '$cart.items.quantity' }
            }
        }
    ]).limit(10).sort('cart.items.quantity');

    return res.status(200).json(stats);
}


module.exports = {
    httpGetCart,
    httpAddProducts,
    httpGetAllProducts,
    httpGetTopProducts,
}