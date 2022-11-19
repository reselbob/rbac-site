'use strict';

const supertest = require('supertest');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

//const {server, shutdown} = require('../index');
describe('UI Tests: ', () => {
    it('Can get page title from UI', async () => {
        expect(1).to.eq(1);

        driver.get('http:localhost:8080/admin').then(async () => {
            await driver.getTitle().then(function (title) {
                console.log(title)
                expect(title).to.be.a("string");
                expect(title).to.eq('Site Admin');
                driver.close();
                driver.quit();
            });
        });
    }).timeout(10000);
});
