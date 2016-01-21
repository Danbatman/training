'use strict';

var moment = require('moment');

var date = new Date('2016-01-11T17:31:10+00:00');

console.log('date', date);
console.log('date from now', moment(date).fromNow());
