function doInterestArray(){
    var r;
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

export {doInterestArray, getInterestArray}