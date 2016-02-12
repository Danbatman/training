'use strict';



function returnEven (element){
	return element % 2 === 0;
}

function returnSup100 (element){
	return element >= 100;
}


module.exports = function(nombres){

	return nombres
	.filter(returnEven)
	.filter(returnSup100);

};
