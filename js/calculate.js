function calculate(interes, deuda, meses) {
	//original kilian's formula
	interes = interes / 100;
	var result = (deuda * interes * Math.pow(1 + interes, meses)) / (Math.pow(1 + interes, meses) - 1);
	return result;
}

//module.exports = calculate;

export {calculate};
