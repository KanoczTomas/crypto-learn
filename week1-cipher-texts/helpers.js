'use strict';

function xor(a, b, hex){
        
    if(hex === undefined) hex=false;
    if(a === undefined || b === undefined) throw new Error('Too few arguments! Provide at least 2 strings!');
    if ( typeof a !== 'string' || typeof b !== 'string') throw new Error('Arguments must be strings!');
    if (typeof hex !== 'boolean')throw new Error('3rd argument must be boolean!');
    
    var min_length = (a.length > b.length) ? b.length : a.length;
    
    if(hex){
        //not using the regular expression in a variable
        //as calling test advences to next match so it can not 
        //match 2 different strings
        
        if(!/^[0-9a-f]+$/gi.test(a)) throw new Error('Inputs must be hexadecimal strings! "' + a + '" is not valid!');
        if(!/^[0-9a-f]+$/gi.test(b)) throw new Error('Inputs must be hexadecimal strings! "' + b + '" is not valid!');
        if((a.length%2) !== 0) throw new Error('Invalid hex string "' + a + '" - missing a number? Hex strings do not have odd length!');
        if((b.length%2) !== 0) throw new Error('Invalid hex string "' + b + '" - missing a number? Hex strings do not have odd length!');
        a = Buffer.from(a, 'hex');
        b = Buffer.from(b, 'hex');
    }
    a = Buffer.from(a, 'utf8');
    b = Buffer.from(b, 'utf8');
    var min_length = (a.length > b.length) ? b.length : a.length;
    var result = Buffer.alloc(min_length);
    for(var i = 0; i < min_length; i++){  
        result[i] = a[i] ^ b[i];
    }
    return result;
}

function xorStrings(a,b){
    return xor.call(Object.create(null), a, b, false);
}

function xorStringsInHex(a,b){
    return xor.call(Object.create(null), a, b, true);
}

function hexToString (hex) {
    if(arguments.length !== 1)throw new Error('Requires 1 argument!');
    if(typeof hex !== 'string') throw new Error('Argument must be of type string, ' + hex + ' is of type ' + typeof hex);
    var reg = /^[0-9a-f]+$/gi;
    if (!reg.test(hex)) throw new Error('Input must be a hexadecimal string!');
    var string = '';
    for (var i = 0; i < hex.length; i += 2) {
      string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
}

function stringToHex (str){
    if(arguments.length !== 1) throw new Error('Too few arguments!');
    if(typeof str !== 'string') throw new Error('Argument must be of type string, ' + str + ' is of type ' + typeof str + '!');
    return str.split('').map(function (elm){ return elm.charCodeAt(0).toString(16)}).join("");
}

function stringToBin (str){
    if(arguments.length !== 1) throw new Error('Too few arguments!');
    if(typeof str !== 'string') throw new Error('Argument must be of type string, ' + str + ' is of type ' + typeof str + '!');
    return str.split('').map(function (elm){ return elm.charCodeAt(0).toString(2)}).join("");
}

module.exports = {
    xorStrings: xorStrings,
    xorStringsInHex: xorStringsInHex,
    hexToString: hexToString,
    stringToHex: stringToHex,
    stringToBin: stringToBin
};