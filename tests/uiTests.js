'use strict';
const expect = require('chai').expect;
const assert = require('chai').assert;
const describe = require('mocha').describe;
const it = require('mocha').it;
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

const siteURL = process.env.SITE_URL || 'http://localhost:8080'

//const {server, shutdown} = require('../index');
describe('UI Tests: ', () => {

    const fontSizes = {}
    fontSizes['x-small'] = 6;
    fontSizes['small'] = 12;
    fontSizes['normal'] = 16;
    fontSizes['large'] = 40;
    fontSizes['x-large'] = 64;

    const getPageStyles = async (driver) => {
        const h1 = await driver.findElement(webdriver.By.tagName('h1'))
        const headingFontSize = await h1.getCssValue("font-size");
        const headingFontColor = await h1.getCssValue("color");
        const body = await driver.findElement(webdriver.By.tagName('body'));
        const fontSize = await body.getCssValue("font-size");
        const fontColor = await body.getCssValue("color");
        const backgroundColor = await body.getCssValue("background-color");
        return ({backgroundColor, headingFontSize, headingFontColor, fontSize, fontColor});
    }

    it('Can login and out from UI', async () => {
        await driver.get(siteURL + '/admin')
            .then(async () => {
                await driver.findElement(webdriver.By.id('username')).sendKeys('admin');
                await driver.findElement(webdriver.By.id('password')).sendKeys('cheese');
                await driver.findElement(webdriver.By.id('loginButton')).click();
                const text = await driver.findElement(webdriver.By.id('logoutButton')).getText();
                expect(text).to.be.eq('Logout');

                await driver.findElement(webdriver.By.id('logoutButton')).click();
                const otherText = await driver.findElement(webdriver.By.id('loginButton')).getText();
                expect(otherText).to.be.eq('Login');

                const styles = await getPageStyles(driver);
                console.log(styles);

                driver.close();
                driver.quit();
            })
            .catch(e => {
                console.log({message: e.message, probableCause: "Make sure the web site is running!"});
                assert.fail(e.message);
                driver.close();
                driver.quit();
            });

    })

});
