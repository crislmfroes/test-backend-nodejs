const app = require('./app');
const request = require('supertest');
const mongoose = require('mongoose');

describe("Test the register product path", () => {
    beforeEach(() => {
        mongoose.Promise = Promise;
        mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
    });
    test("It should return product id", async () => {
        const response = await request(app).post('/products/register').send({
            title: 'product',
            description: 'My product',
            price: 100.00
        }).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.body.id).toBeDefined()
    });
    afterEach(done => {
        mongoose.disconnect(done);
    });
});