'use strict';

function calculate(interes, deuda, meses) {
	//original kilian's formula
	interes = interes / 100;
	var result = (deuda * interes * Math.pow(1 + interes, meses)) / (Math.pow(1 + interes, meses) - 1);
	return result;
}

function doInterestArray(){
    if ($('input[type=checkbox]').is(':checked')) {
        return [
            [Number($('input#intZero').val()), ($('input#int1').val())],
            [Number($('input#intN2').val()), ($('input#int2').val())],
            [Number($('input#intN3').val()), ($('input#int3').val())],
            [Number($('input#intEnd').val())]
        ];
    } else {
        return [];
    }
}

function getInterestArray() {
    var interestArray = doInterestArray();

    console.log('interestArrayLength: ' + interestArray.length);
    //console.table(interestArray);
    $('#arrayPrint').remove();
    var printArray = '<div id="arrayPrint">array to print: [[' + interestArray[0] + '],[' + interestArray[1] + '],[' + interestArray[2] + ']]</div>';
    $(printArray).insertAfter('div.result');
}

const minMonths = 3;
var months = function(){return Number($('#meses').val());}; 
var maxMonths = function(){return months() + minMonths;};

function getCalc() {
	var interestArray = doInterestArray();
	var interest = Number($('#interes').val());
	var debt = Number($('#deuda').val());
	var months$$1 = Number($('#meses').val());
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
	for (var i = 0; i <= months$$1; i++) {
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

console.log('months: ' + months + ' , minMonths: ' + minMonths + ' , maxMonths: ' + maxMonths);

var interestArray = doInterestArray();

$(document).ready(function(){
    $('input[type=checkbox').prop('checked', false);
    $('input#intZero').val(minMonths);
    $('input#intEnd').val(maxMonths);
    getCalc();
    $('input[type=checkbox').on('click', function(){
        if($(this).is(':checked')){
            $('input#interes').hide();
            $('.interest_curve_advice').hide();
            $('div.hidden').css({'height': ($('.hidden > div').length * 2.4) + 'em', 'padding': '0.5em', 'border': '1px solid grey'});
            getInterestArray();
        } else {
            $('div.hidden').css({'height': 0, 'padding': '0 0.5em', 'border': '1px solid transparent'});
            interestArray.length = 0;
            $('input#interes').show();
            $('.interest_curve_advice').show();
            $('#arrayPrint').remove();
        }
        getCalc();
    });
    $('#interes, #deuda, #meses, #decimales, .interest_group input').on('keyup change', function(){
        var maxMonths$$1 = Number($('#meses').val()) + minMonths;
        console.log('maxMonths: ' + maxMonths$$1);
        if($('#meses').val() >= (maxMonths$$1 - minMonths)){
            $('input#intEnd').val(maxMonths$$1);
        }
        if($('input[type=checkbox]').is(':checked')){
            getInterestArray();
        } else {
            interestArray.length = 0;
        }
        getCalc();
    });
});
