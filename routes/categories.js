const express = require('express');
const ProductCategory = require('../models/ProductCategory');

const router = express.Router();

/**
 * @swagger
 * 
 * /categories/create:
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
router.post('/create', (req, res, next) => {
    const category = new ProductCategory({
        title: req.body.title,
        description: req.body.description
    });
    category.save().then(category => {
        res.status(200).json({
            id: category.id
        });
    });
});


/**
 * @swagger
 * 
 * /categories/update:
 *   post:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         type: string
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
router.post('/update', (req, res, next) => {
    ProductCategory.findByIdAndUpdate(req.body.id, {
        title: req.body.name,
        description: req.body.description
    }, (err, category) => {
        if (err !== null) {
            res.status(500).json();
        } else {
            res.status(200).json();
        }
    });
});

module.exports = router;
