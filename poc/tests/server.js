var expect = require('chai').expect;
var addition = require('../server').addition;


describe('Testing serverjs', () => {
    it('addition', () => {
        var result = addition(2, 3);
        expect(result).to.equal(5);
    });
});