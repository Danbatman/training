'use strict';

// var moment = require('moment');
var math = require('./multiply.js');
var filterEven = require('./filterEven.js');

var date = new Date(Date.now());

console.log('date', date);
// console.log('date from now', moment(date).fromNow());


var nombres = [2, 1, 4, 501, 122];


// var pairs = filterEven(nombres); 
// console.log('Resultat', pairs); // [2, 4]



console.log('Resultat', filterEven);