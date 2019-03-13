'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function calculate(interes, deuda, meses) {
	//original kilian's formula
	interes = interes / 100;
	var result = (deuda * interes * Math.pow(1 + interes, meses)) / (Math.pow(1 + interes, meses) - 1);
	return result;
}

exports.calculate = calculate;
