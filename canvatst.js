//Canvas basics

//getElementById()  methodr returns an Element object representing the element whose id property matches the specified string. 
//Since element IDs are required to be unique if specified, they're a useful way to get access to a specific element quickly.
var canvas = document.getElementById("myCanvas");

// getcontext The getContext() function returns the drawing context - which is an object that has all the drawing properties and functions you use to draw on the canvas.

var ctx = canvas.getContext("2d");

//draw the cercle 

var cx = canvas.width / 2;
var cy =  canvas.height / 2;
// var r = 8;
// var init_angle = 0;
// var final_angle = Math.PI*2;
// ctx.beginPath();
// ctx.arc(cx, cy, r, init_angle, final_angle, true);
// ctx.fillStyle = "#FFFF";
// ctx.fill();
// ctx.closePath();




ctx.beginPath();
ctx.rect(cx, 0, 1, canvas.height);
ctx.fillStyle = "#fff";
ctx.fill();
ctx.closePath();


