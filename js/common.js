const minMonths = 3;
var months = function(){return Number($('#meses').val());}; 
var maxMonths = function(){return months() + minMonths;};

export {minMonths, months, maxMonths};