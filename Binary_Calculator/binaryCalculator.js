let res = document.getElementById("res");
let btn0 = document.getElementById("btn0");
let btn1 = document.getElementById("btn1");
let btnClr = document.getElementById("btnClr");
let btnEql = document.getElementById("btnEql");
let btnSub = document.getElementById("btnSub");
let btnSum = document.getElementById("btnSum");
let btnMul = document.getElementById("btnMul");
let btnDiv = document.getElementById("btnDiv");



//this function to khnow if any of operations are vlivked


function op_clicked() {
    if (document.getElementById('btnSum').clicked == true || document.getElementById('btnSub').clicked == true || document.getElementById('btnMul').clicked == true || document.getElementById('btnDiv').clicked == true)
        return (true);
    else
        false
}

function witch_op() {
    if (document.getElementById('btnSum').clicked == true)
        return ('+');
    if (document.getElementById('btnSub').clicked == true)
        return ('-');

    if (document.getElementById('btnMul').clicked == true)
        return ('*');

    if (document.getElementById('btnDiv').clicked == true)
        return ('/');

    else
        alert("not valid op")
}

let num1 = 0;
let num2 = 0;
let op;
if (op_clicked == false && document.getElementById('btn0').clicked == true) {
    num1 = '${num1}${0}';
}

if (op_clicked == false && document.getElementById('btn1').clicked == true) {
    num1 = '${num1}${1}';
}

else if (op_clicked == true) {
    if (document.getElementById('btn0').clicked == true) {
        num2 = '${num2}${0}';
    }

    if (document.getElementById('btn1').clicked == true) {
        num2 = '${num2}${1}';
    }

}


// if equa is clicked 

function operate(num1, num2,)