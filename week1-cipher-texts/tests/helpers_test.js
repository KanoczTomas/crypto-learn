'use strict';

var should = require('should');
var helpers = require('../helpers');

describe('helper function tests:', function(){
    describe('xorStrings', function(){
        it('should take any 2 strings as arguments', function(){
            (function(){helpers.xorStrings('a', 'b')}).should.not.throw();
            (function(){helpers.xorStrings(1 , 'b')}).should.throw('Arguments must be strings!');
            (function(){helpers.xorStrings('a' , 3)}).should.throw('Arguments must be strings!');
            (function(){helpers.xorStrings('a', undefined)}).should.throw('Too few arguments! Provide at least 2 strings!');
        });
        it('should return a string', function(){
            helpers.xorStrings('a', 'b').should.be.a.String();
        });
        it('should return a string with length min(input1,input2)', function(){
            helpers.xorStrings('abcd', '123').length.should.be.equal(3);
            helpers.xorStrings('12345', 'abc').length.should.be.equal(3);
            helpers.xorStrings('1', 'a').length.should.be.equal(1);
            helpers.xorStrings('1', '').length.should.be.equal(0);
        });
        it('should xor 2 strings correctly', function(){
            helpers.xorStrings('this is a test message', 'this is another test').should.be.equal(Buffer.from('0000000000000000004e1b111b11524d11160015', 'hex'));
            helpers.xorStrings('xor with self', 'xor with self').should.be.equal('00000000000000000000000000');
        });
    });
    describe('xorStringsInHex', function(){
        it('should take 2 hex strings as arguments');
        it('should return a string');
        it('should xorStringsInHex.hex should be false');
        it('should return a string with length min(input1,input2)');
        it('should xor 2 strings correctly');
    });
    describe('hexToString', function(){
        it('should take a hex string input only');
        it('should return a string');
        it('should return the correct string given a hex input');
    });
    describe('stringToHex', function(){
        it('should take 1 string argument');
        it('should return a string');
        it('should return the correct string in hex format');
    });
    describe('stringToBin', function(){
        it('should take 1 argument as string');
        it('should return a binary string');
        it('should return correct string in binary');
    });
});