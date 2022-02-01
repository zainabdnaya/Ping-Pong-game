let res = document.getElementById("res");
let btn0 = document.getElementById("btn0");
let btn1 = document.getElementById("btn1");
let btnClr = document.getElementById("btnClr");
let btnEql = document.getElementById("btnEql");
let btnSub = document.getElementById("btnSub");
let btnSum = document.getElementById("btnSum");
let btnMul = document.getElementById("btnMul");
let btnDiv = document.getElementById("btnDiv");


var num1 = "";
var num2 = "";
var tmp;
var op = false;


btn0.addEventListener('click', event => {

    res.innerText += '0';
    console.log(event);
    if (op == false) {
        num1 += "0";

    }
    else {
        num2 += "0";
        // res.innerText = num2;

    }
}
);

btn1.addEventListener('click', event => {
    res.innerText += '1';
    if (op == false)
    {

        num1 += "1";
        // res.innerText = num1;
    }
    else 
    {
        num2 += "1";
        // res.innerText = num2;

    }
}
);

var char_op;

btnSum.addEventListener('click', event => {
    op = true;
    char_op = '+';
    res.innerText += char_op;


}
);

btnSub.addEventListener('click', event => {
    op = true;
    char_op = '-';
    res.innerText += char_op;

}
);

btnMul.addEventListener('click', event => {

    op = true;
    char_op = '*';
    res.innerText += char_op;


}
);


btnDiv.addEventListener('click', event => {
    op = true;
    char_op = '/';
    res.innerText += char_op;


}
);



var reslt = "";

btnEql.addEventListener('click', event => {
    res.innerText = "";
     if (op == true) {
        if (char_op == '+') {
            reslt = (parseInt(num1, 2)) + (parseInt(num2, 2));

            res.innerText = (reslt.toString(2));
        }
        else if (char_op == '-') {
            reslt = (parseInt(num1, 2)) - (parseInt(num2, 2));
            if (parseInt(reslt) < 0)
                res.innerText = ((parseInt(reslt) >>> 0).toString(2));
            else
                res.innerText = (reslt.toString(2));
        }
        else if (char_op == '*') {
            reslt = (parseInt(num1, 2)) * (parseInt(num2, 2));

            res.innerText = (reslt.toString(2));
        }
        else if (char_op == '/') {
            reslt = (parseInt(num1, 2)) / (parseInt(num2, 2));
            res.innerText = (reslt.toString(2));
        }

        // console.log(" you press a clear");
        // console.log("=> num1 \t" + num1);
        // console.log("=> num2 \t" + num2);
        // console.log("num 1 = " + parseInt(num1, 2));
        // console.log("num 2 = " + parseInt(num2, 2));
        // console.log("result = " + reslt);
        // console.log("result in binary = " + reslt.toString(2));



        num1 = "";
        num2 = "";
        reslt = "";
        char_op = "";
    }
    else {
        alert("Wrong syntax :=> a ( -  or + or / or * ) b ")
    }
}
);


btnClr.addEventListener('click', event => {

    res.innerText = "";
}
);