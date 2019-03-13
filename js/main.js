import { getCalc } from "./getCalc.js";
import { doInterestArray, getInterestArray } from "./getInterestArray.js";
import { months, minMonths, maxMonths } from "./common.js";

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
        var maxMonths = Number($('#meses').val()) + minMonths;
        console.log('maxMonths: ' + maxMonths);
        if($('#meses').val() >= (maxMonths - minMonths)){
            $('input#intEnd').val(maxMonths);
        }
        if($('input[type=checkbox]').is(':checked')){
            getInterestArray();
        } else {
            interestArray.length = 0;
        }
        getCalc();
    });
});