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
            (function(){helpers.xorStrings(undefined, undefined)}).should.throw('Too few arguments! Provide at least 2 strings!');
            (function(){helpers.xorStrings(undefined, 'b')}).should.throw('Too few arguments! Provide at least 2 strings!');
        });
        it('should return a Buffer', function(){
            helpers.xorStrings('a', 'b').should.be.a.instanceOf(Buffer);
        });
        it('should return a buffer with length min(arg1.length,arg2.length)', function(){
            helpers.xorStrings('abcd', '123').length.should.be.equal(3);
            helpers.xorStrings('12345', 'abc').length.should.be.equal(3);
            helpers.xorStrings('1', 'a').length.should.be.equal(1);
            helpers.xorStrings('1', '').length.should.be.equal(0);
        });
        it('should xor 2 strings correctly', function(){
            (helpers.xorStrings('this is a test message', 'this is another test').equals(Buffer.from('0000000000000000004e1b111b11524d11160015', 'hex'))).should.be.true();;
            (helpers.xorStrings('xor with self', 'xor with self').equals(Buffer.from('00000000000000000000000000', 'hex'))).should.be.true();
        });
    });
    describe('hexToString', function(){
        it('should take a hex string input only', function(){
            (function(){helpers.hexToString()}).should.throw('Requires 1 argument!');
            (function(){helpers.hexToString(13)}).should.throw('Argument must be of type string, 13 is of type number');
            (function(){helpers.hexToString('test string')}).should.throw('Input must be a hexadecimal string!');
            (function(){helpers.hexToString('0123456789abcdefABCDEF')}).should.not.throw();
        });
        it('should return a string', function(){
            helpers.hexToString('09102391').should.be.a.String();
        });
        it('should return the correct string given a hex input', function(){
            helpers.hexToString('746869732069732061207465737420737472696e67').should.be.equal('this is a test string');
            helpers.hexToString('616e6f746865722074657374207468617420686173206576656e206e756d6265727320313233343536').should.be.equal('another test that has even numbers 123456');
            helpers.hexToString('01234').should.not.be.equal('test string');
            
        });
    });
    describe('xorStringsInHex', function(){
        it('should take 2 hex strings as arguments', function(){
            //relies on hexToString error handling
            (function(){helpers.xorStringsInHex('hello', 'bob')}).should.throw('Inputs must be hexadecimal strings! "hello" is not valid!');
            (function(){helpers.xorStringsInHex('1234', 'bob')}).should.throw('Inputs must be hexadecimal strings! "bob" is not valid!');
            (function(){helpers.xorStringsInHex('123456', 'bbbbb')}).should.throw('Invalid hex string "bbbbb" - missing a number? Hex strings do not have odd length!');
            (function(){helpers.xorStringsInHex('12345', 'bbbbbb')}).should.throw('Invalid hex string "12345" - missing a number? Hex strings do not have odd length!');
            (function(){helpers.xorStringsInHex('12345', 'ccc')}).should.throw('Invalid hex string "12345" - missing a number? Hex strings do not have odd length!');
            (function(){helpers.xorStringsInHex('1234', 'abcd')}).should.not.throw();
        });
        it('should return a Buffer', function(){
            helpers.xorStringsInHex('1234', 'abcd').should.be.instanceOf(Buffer);
        });
        it('should return a buffer with length min(arg1.length,arg2.length)', function(){
            helpers.xorStringsInHex('010203', '040506').length.should.be.equal(3);
            helpers.xorStringsInHex('010203', '04').length.should.be.equal(1);
            helpers.xorStringsInHex('0102', '040506').length.should.be.equal(2);
            helpers.xorStringsInHex('010203bcdf', '040506').length.should.be.equal(3);
        });
        it('should xor 2 strings correctly', function(){
            helpers.xorStringsInHex('000000', 'aabbcc').equals(Buffer.from('aabbcc', 'hex')).should.be.true();
            helpers.xorStringsInHex('11111111', '11111111').equals(Buffer.from('00000000', 'hex')).should.be.true();
            helpers.xorStringsInHex('1111111112312311', '11111111').equals(Buffer.from('00000000', 'hex')).should.be.true();
            helpers.xorStringsInHex('0101', '101010').equals(Buffer.from('1111', 'hex')).should.be.true();
        });
    });
    describe('stringToHex', function(){
        it('should take 1 string argument', function(){
            (function(){helpers.stringToHex()}).should.throw('Too few arguments!');
            (function(){helpers.stringToHex(3)}).should.throw('Argument must be of type string, 3 is of type number!');
            (function(){helpers.stringToHex('test')}).should.not.throw();
        });
        it('should return a string', function(){
            helpers.stringToHex('test').should.be.a.String();
        });
        it('should return the correct string in hex format', function(){
            helpers.stringToHex('test').should.be.equal('74657374');
            helpers.stringToHex('another very long test with 0123 and ,./!@#$!@#%$#%').should.be.equal('616e6f746865722076657279206c6f6e6720746573742077697468203031323320616e64202c2e2f2140232421402325242325');
        });
    });
    describe('stringToBin', function(){
        it('should take 1 argument as string', function(){
            (function(){helpers.stringToBin()}).should.throw('Too few arguments!');
            (function(){helpers.stringToBin(13)}).should.throw('Argument must be of type string, 13 is of type number!');
            (function(){helpers.stringToBin('test')}).should.not.throw();
        });
        it('should return a binary string', function(){
            helpers.stringToBin('test').should.be.a.String();
            /^[01]+$/.test(helpers.stringToBin('test')).should.be.true();
            /^[01]+$/.test(helpers.stringToBin('uglier test 814y 91284 18y hfjksd34y[u#@!%)#$!%*]')).should.be.true();
        });
        it('should return correct string in binary');
    });
});