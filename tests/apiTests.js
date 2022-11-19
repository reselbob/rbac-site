'use strict';
const supertest = require('supertest');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const {server,shutdown} = require('../index');

describe('API Tests: ', () => {
    after(function () {
        shutdown();
    });
    it('Can access GET item /api/css', function(done){
        supertest(server)
            .get('/api/css')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body).to.be.an('object');
                console.log(res.body);
                done();
            })
            .catch(done);
    });

    it('Can access GET item /login', function(done){
        const payload = {username:'admin', password:'cheese'};
        supertest(server)
            .post('/api/login')
            .set('Accept', 'application/json')
            .send(payload)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.eq(200);
                expect(res.body.message).to.eq('OK');
                console.log(res.body);
                done();
            })
            .catch(done);
    });
});
