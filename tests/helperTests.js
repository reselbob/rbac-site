'use strict';
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const {getCssAsJson} = require('../helpers/cssHelper')

describe('Helper Tests: ', () => {
    after(function () {

    });
    it('Can access css file', async () => {
        const json = await getCssAsJson()
        expect(json).to.be.an('object');
    });
});
