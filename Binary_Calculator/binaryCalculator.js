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

function witch_op() {
    if (document.getElementById('btnSum').clicked == true)
        return ('+');
    if (document.getElementById('btnSub').clicked == true)
        return ('-');

    if (document.getElementById('btnMul').clicked == true)
        return ('*');

    if (document.getElementById('btnDiv').clicked == true)
        return ('/');
}

var num1 = "";
var num2 = "";
var tmp;
var op = false;

btn0.addEventListener('click', event => {
    if (op == false) {
        num1 += "0";

    }
    else
        num2 += "0";
}
);

btn1.addEventListener('click', event => {
    if (op == false) {
        num1 += "1";
    }
    else {
        num2 += "1";
    }
}
);

var char_op;

btnSum.addEventListener('click', event => {
    console.log(" you press a plus");
    op = true;
    char_op = '+';
}
);

btnSub.addEventListener('click', event => {
    console.log(" you press a sub");
    op = true;
    char_op = '-';

}
);

btnMul.addEventListener('click', event => {
    console.log(" you press a multiplication");
    op = true;
    char_op = '*';

}
);


btnDiv.addEventListener('click', event => {
    console.log(" you press a div");
    op = true;
    char_op = '/';

}
);



var reslt="";
btnEql.addEventListener('click', event => {
    console.log(" you press a eql");
    if (op == true) {
        if (char_op == '+') {
            reslt = parseInt(num1, 2) + parseInt(num2, 2);

            return (reslt.toString(2));
        }
        else if (char_op == '-') {
            reslt = parseInt(num1, 2) - parseInt(num2, 2);
            console.log(  "==>" + parseInt(reslt));
            if (parseInt(reslt) < 0)
                return ((parseInt(reslt)    >>> 0).toString(2));
            else
                return (reslt.toString(2));
        }
        else if (char_op == '*') {
            reslt = parseInt(num1, 2) * parseInt(num2, 2);

            return (reslt.toString(2));
        }
        else if (char_op == '/') {
            reslt = parseInt(num1, 2) / parseInt(num2, 2);
            return (reslt.toString(2));
        }
    }
    else {
        alert("Wrong syntax :=> a ( -  or + or / or * ) b ")
    }
}
);


btnClr.addEventListener('click', event => {
    console.log(" you press a clear");
    console.log("=> num1 \t" + num1);
    console.log("=> num2 \t" + num2);
    console.log("num 1 = " + parseInt(num1, 2));
    console.log("num 2 = " + parseInt(num2, 2));
    console.log("result = " + reslt);
    console.log("result in binary = " + reslt.toString(2));
}
);