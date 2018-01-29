// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let $ = require('jquery');
let fs = require('fs');
let btnMode = null;

function writeFile(objJson){
    fs.writeFile(__dirname + '/calculor-save', JSON.stringify(objJson), function(err) {
        if(err) {
            $('#message').text('Save Error');
            throw err;
        }
        $('#message').text('Save Complete');
    }); 
}

function readFile(objJson){
    fs.readFile( __dirname + '/calculor-save', function (err, data) {
        if (err) {
            $('#message').text('Load Error');
            throw err; 
        }
        $('#message').text('Load Complete');
        return data;
    });
}

function higlight(ele_id){
    $('.highligh').removeClass('blue-highligh');
    $(ele_id).addClass('blue-highligh');
}

function validate(){
    let input_a = $('#input_a').val();
    let input_b = $('#input_b').val();
    if(input_a == "" || input_b == ""){
        $('#message').text('Please Insert All Input');
        return false;
    } 
    return true;
}
$('.highligh').on('click', () => {
    $('#message').empty();
});

$('#btn_plus').on('click', () => {
    if(validate()){
        let input_a = parseInt($('#input_a').val());
        let input_b = parseInt($('#input_b').val());
        $('#result').val(input_a + input_b);
        higlight('#btn_plus');
        btnMode = 'plus';
    }
})

$('#btn_minus').on('click', () => {
    if(validate()){
        let input_a = parseInt($('#input_a').val());
        let input_b = parseInt($('#input_b').val());
        $('#result').val(input_a - input_b);
        higlight('#btn_minus');
        btnMode = 'minus';
    }
})

$('#btn_multiply').on('click', () => {
    if(validate()){
        let input_a = parseInt($('#input_a').val());
        let input_b = parseInt($('#input_b').val());
        $('#result').val(input_a * input_b);
        higlight('#btn_multiply');
        btnMode = 'multiply';
    }
})

$('#btn_divide').on('click', () => {
    if(validate()){
        let input_a = parseInt($('#input_a').val());
        let input_b = parseInt($('#input_b').val());
        $('#result').val(input_a / input_b);
        higlight('#btn_divide');
        btnMode = 'divide';
    }
})

$('#btn_pow').on('click', () => {
    if(validate()){
        let input_a = parseInt($('#input_a').val());
        let input_b = parseInt($('#input_b').val());
        $('#result').val(Math.pow(input_a, input_b));
        higlight('#btn_pow');
        btnMode = 'pow';
    }
})

$('#btn_save').on('click', () => {
    let obj = new Object();
    obj.firstInput = $('#input_a').val();
    obj.secondInput = $('#input_b').val();
    obj.result = $('#result').val();
    obj.mode = btnMode;
    writeFile(obj);
})

$('#btn_load').on('click', () => {
    $('#message').text('Loading');
    fs.readFile( __dirname + '/calculor-save', function (err, data) {
        if (err) {
            $('#message').text('Load Error');
            throw err; 
        }
        let obj = JSON.parse(data);
        $('#input_a').val(obj.firstInput);
        $('#input_b').val(obj.secondInput);
        $('#result').val(obj.result);
        switch(obj.mode) {
            case "plus":
                higlight('#btn_plus');
                break;
            case "minus":
                higlight('#btn_minus');
                break;
            case "multiply":
                higlight('#btn_multiply');
                break;
            case "divide":
                higlight('#btn_divide');
                break;
            case "pow":
                higlight('#btn_pow');
                break;
        }
        $('#message').text('Load Complete');
    });

   
})