import { calculate } from "./calculate.js";
import { doInterestArray } from "./getInterestArray.js";
import { months, minMonths, maxMonths } from "./common.js";

function getCalc() {
	var interestArray = doInterestArray();
	var interest = Number($('#interes').val());
	var debt = Number($('#deuda').val());
	var months = Number($('#meses').val());
	var decimales = Number($('#decimales').val());

	var pricingTable = ['monthly amount'];
	var totalPricingTable = ['total amount'];
	var amount = ['debt'];
	var XAxismonthsCount = ['x'];

	console.log('interestArray: ' + interestArray);
	console.log('interestArrayLength: ' + interestArray.length);

	console.log('\n\n*** new calculation ***\n');
	console.log('\napplied interest array:');
	console.table(interestArray);

	$('div.result > span').remove();
	/*
                    |       |       |       |
        months      3       6       9       12
        interest    |   10  |   15  |   20  |

                    [3, 10],[6, 15],[9, 20],[12] --> from month [3] -> interest is [10]%, from month [6] -> interest is [15]%, from month [9] -> interest is [20]%
    */
	for (var i = 0; i <= months - 1; i++) {
		var calculatedInterest = interest;
		if (interestArray && interestArray.length > 0) {
			var n;
			var arrayLength = interestArray.length;
			for (n = 0; n < arrayLength; n++) {
				//console.log('n: ' + n + ', i: ' + i);
				if (minMonths + i >= interestArray[n][0]) {
					if (minMonths + i == interestArray[arrayLength - 1][0]) {
						calculatedInterest = interestArray[arrayLength - 2][1];
					} else {
						if (minMonths + i < interestArray[n + 1][0]) {
							calculatedInterest = interestArray[n][1];
						}
					}
				}
			}
			//console.log('n: ' + n + ', interestArray:' + interestArray[n][0] + ', calculatedInterest: ' + calculatedInterest);
		}

		var res = calculate(calculatedInterest, debt, i + minMonths).toFixed(decimales);
		console.log('case' + i + ': ' + res + ' interest: ' + calculatedInterest);
		$('div.result').append(
			'<span class="int' +
				parseInt(calculatedInterest) +
				'"><span class="bold">' +
				(minMonths + i) +
				' installments: ' +
				res +
				' €' +
				'</span> => TOTAL: ' +
				(res * (minMonths + i)).toFixed(decimales) +
				' (case ' +
				i +
				')</span>'
		);
		var commonBg =
			'hsl(' + parseInt(calculatedInterest * 8) + ',' + parseInt(calculatedInterest * 8) + '%,' + '85%' + ')';
		$('span.int' + parseInt(calculatedInterest)).css('background-color', commonBg);
		$('.group_int input.curve').each(function() {
			if ($(this).val() == calculatedInterest) {
				$(this)
					.closest('div')
					.css('background-color', commonBg);
			}
		});
		pricingTable.push(Number(res));
		totalPricingTable.push(Number(res * (minMonths + i)));
		amount.push(Number(debt));
		XAxismonthsCount.push(minMonths + i);
	}

	var chart = c3.generate({
		bindto: '#chart',
		data: {
			x: 'x',
			columns: [pricingTable, totalPricingTable, amount, XAxismonthsCount],
			type: 'spline',
		},
		axis: {
			x: {
				label: 'month',
			},
			y: {
				label: 'amount',
			},
		},
	});
}

export {getCalc};
