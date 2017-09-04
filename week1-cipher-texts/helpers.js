'use strict';

function xor(a, b, hex){
        
    if(hex === undefined) hex=false;
    if(a === undefined || b === undefined) throw new Error('Too few arguments! Provide at least 2 strings!');
    if ( typeof a !== 'string' || typeof b !== 'string') throw new Error('Arguments must be strings!');
    if (typeof hex !== 'boolean')throw new Error('3rd argument must be boolean!');
    
    var min_length = (a.length > b.length) ? b.length : a.length;
    
    if(hex){
            a = hexToString(a);
            b = hexToString(b);
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
    var string = '';
    for (var i = 0; i < hex.length; i += 2) {
      string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
}

function stringToHex (str){
    return str.split('').map(function (elm){ return elm.charCodeAt(0).toString(16)}).join("");
}

function stringToBin (str){
    return str.split('').map(function (elm){ return elm.charCodeAt(0).toString(2)}).join("");
}

module.exports = {
    xorStrings: xorStrings,
    xorStringsInHex: xorStringsInHex,
    hexToString: hexToString,
    stringToHex: stringToHex,
    stringToBin: stringToBin
};