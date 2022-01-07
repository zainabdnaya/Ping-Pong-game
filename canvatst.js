//Canvas basics

//getElementById()  methodr returns an Element object representing the element whose id property matches the specified string. 
//Since element IDs are required to be unique if specified, they're a useful way to get access to a specific element quickly.

var canvas = document.getElementById("myCanvas");

// getcontext The getContext() function returns the drawing context - which is an object that has all the drawing properties and functions you use to draw on the canvas.

var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20,40,50,50);
ctx.fillStyle = "#FF0000";
ctx.fill;
ctx.closePath();


var cx = 240;
var cy = 160;
var r = 8;
var init_angle = 0;
var final_angle = Math.PI*2;
ctx.beginPath();
ctx.arc(cx, cy, r, init_angle, final_angle, true);
ctx.fillStyle = "#FFFF";
ctx.fill();
ctx.closePath();





