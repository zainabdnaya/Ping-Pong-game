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
}

let num1 = 0;
let num2 = 0;
let tmp;
let op = false;

btn0.addEventListener('click', event => {
    if (op == false)
        console.log(" you press a zero  num1");
    else
        console.log("num2");
}
);

btn1.addEventListener('click', event => {
    console.log(" you press a one");
}
);


btnSum.addEventListener('click', event => {
    console.log(" you press a plus");
    op = true;
}
);

btnSub.addEventListener('click', event => {
    console.log(" you press a sub");
    op = true;

}
);

btnMul.addEventListener('click', event => {
    console.log(" you press a multiplication");
    op = true;

}
);


btnDiv.addEventListener('click', event => {
    console.log(" you press a div");
    op = true;

}
);



btnEql.addEventListener('click', event => {
    console.log(" you press a eql");
}
);


btnClr.addEventListener('click', event => {
    console.log(" you press a clear");
}
);