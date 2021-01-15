const express = require('express');
const Product = require('../models/Product');
const ProductCategory = require('../models/ProductCategory');

const router = express.Router();

/**
 * @swagger
 * 
 * /products/register:
 *   post:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         in: query
 *         required: false
 *         type: string
 *       - name: description
 *         in: query
 *         required: false
 *         type: string
 * 
 */
router.post('/register', (req, res, next) => {
    console.log(req.headers);
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });
    console.log(product);
    if (req.body.category !== undefined) {
        ProductCategory.findById(req.body.category.id, (err, category) => {
            product.category = category;
            product.save().then(() => {
                res.status(200).json({
                    id: product.id
                });
            });
        });
    } else {
        product.save().then(() => {
            res.status(200).json({
                id: product.id
            });
        });
    }
});

module.exports = router;
