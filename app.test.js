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
            title: 'my category',
            description: 'my category'
        });
        await category.save();
        const response = await request(app).post('/categories/update').send({
            id: category.id,
            title: 'my category edited',
            description: 'my category edited'
        }).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.status).toBe(200);
    });
    test("test route for listing all products", async () => {
        const response = await request(app).get('/products/list').set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.status).toBe(200);
    });
    test("test route for filtering products by category and title", async () => {
        const category = new ProductCategory({
            title: 'my category',
            description: 'my category'
        });
        await category.save();
        const product = new Product({
            title: 'my product',
            description: 'my product',
            price: 100.00,
            category: category
        });
        await product.save();
        const response = await request(app).post('/products/filter').send({
            category_id: category.id,
            title: 'my'
        }).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.status).toBe(200);
    });
    test("test route for updating product data", async () => {
        const product = new Product({
            title: 'my product',
            description: 'my product',
            price: 100.00
        });
        await product.save();
        const response = await request(app).post('/products/update').send({
            title: 'my product edited',
            description: 'my product edited',
            price: 100.01,
            id: product.id
        }).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.status).toBe(200);
    });
    afterEach(done => {
        mongoose.disconnect(done);
    });
});