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
 *       - name: price
 *         in: query
 *         required: false
 *         type: float
 * 
 */
router.post('/register', (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });
    if (req.body.category_id !== undefined) {
        ProductCategory.findById(req.body.category_id, (err, category) => {
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


/**
 * @swagger
 * 
 * /products/associate:
 *   post:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product_id
 *         in: query
 *         required: true
 *         type: string
 *       - name: category_id
 *         in: query
 *         required: true
 *         type: string
 * 
 */
router.post('/associate', (req, res, next) => {
    ProductCategory.findById(req.body.category_id, (err, category) => {
        Product.findByIdAndUpdate(req.body.product_id, {
            category: category
        }, (err, product) => {
            if (err !== null) {
                res.status(500).json();
            } else {
                res.status(200).json();
            }
        });
    });
});


/**
 * @swagger
 * 
 * /products/list:
 *   get:
 *     produces:
 *       - application/json
 * 
 * 
 */
router.get('/list', (req, res, next) => {
    Product.find((err, products) => {
        if (err !== null) {
            res.status(500).json();
        } else {
            res.status(200).json(products);
        }
    });
});


/**
 * @swagger
 * 
 * /products/filter:
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
 *       - name: category_id
 *         in: query
 *         required: false
 *         type: string
 * 
 */
router.post('/filter', (req, res, next) => {
    ProductCategory.findById(req.body.category_id, (err, category) => {
        if (err !== null) {
            res.status(500).json();
        } else {
            Product.find({
                title: new RegExp(req.body.title, 'i'),
                category: category
            }, (err, products) => {
                if (err !== null) {
                    res.status(500).json();
                } else {
                    res.status(200).json(products);
                }
            });
        }
    });
});

module.exports = router;
