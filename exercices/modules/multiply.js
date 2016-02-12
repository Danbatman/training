'use strict';

function multiply(a, b){
	return a * b;
};

// function divide(a, b){
// 	return a / b;
// };


console.log('Je suis dans multiply');

module.exports = {
	multiply: multiply,
	d: function(a, b){ return a / b; }
};
