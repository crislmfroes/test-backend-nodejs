const app = require('./app');
const request = require('supertest');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const ProductCategory = require('./models/ProductCategory');

describe("Test the NodeJS backend application", () => {
    beforeEach(() => {
        mongoose.Promise = Promise;
        mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
    });
    test("Test route for registering product", async () => {
        const response = await request(app).post('/products/register').send({
            title: 'product',
            description: 'My product',
            price: 100.00
        }).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.body.id).toBeDefined();
    });
    test("test route for registering category", async () => {
        const response = await request(app).post('/categories/create').send({
            title: 'category',
            description: 'My category'
        }).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.body.id).toBeDefined();
    });
    test("test route for associating product to category", async () => {
        const product = new Product();
        await product.save();
        const category = new ProductCategory();
        await category.save();
        const response = await request(app).post('/products/associate').send({
            product_id: product.id,
            category_id: category.id
        }).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.status).toBe(200);
    });
    test("test route for updating category data", async () => {
        const category = new ProductCategory({
            name: 'my category',
            description: 'my category'
        });
        await category.save();
        const response = await request(app).post('/categories/update').send({
            id: category.id,
            name: 'my category edited',
            description: 'my category edited'
        }).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.status).toBe(200);
    });
    afterEach(done => {
        mongoose.disconnect(done);
    });
});