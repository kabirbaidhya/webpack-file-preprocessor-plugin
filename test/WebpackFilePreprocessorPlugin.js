var assert = require('assert');
var expect = require('chai').expect;

describe('Basic Mocha String Test', function () {
 it('should return number of charachters in a string', function () {
        assert.equal("Hello".length, 5);
    });
 it('should return first charachter of the string', function () {
    expect("Hello".charAt(0)).to.eq('H');
    });
});