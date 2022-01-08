//Canvas basics

//getElementById()  methodr returns an Element object representing the element whose id property matches the specified string. 
//Since element IDs are required to be unique if specified, they're a useful way to get access to a specific element quickly.
var canvas = document.getElementById("myCanvas");

// getcontext The getContext() function returns the drawing context - which is an object that has all the drawing properties and functions you use to draw on the canvas.

var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;




var uppress = false;
var downpress = false;
var press_right = false;
var press_left = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == 87 || e.key == 38) {
        uppress = true;
        if (e.key == 38)
            press_left = true;
        else
            press_right = true;
    }
    else if (e.key == 83 || e.key == 40) {
        downpress = true;
        if (e.key == 40)
            press_left = true;
        else
            press_right = true;
    }
}

function keyUpHandler(e) {
    if (e.key == 87 || e.key == 38) {
        uppress = false;
        if (e.key == 38)
            press_left = false;
        else
            press_right = false;
    }
    else if (e.key == 83 || e.key == 40) {
        downpress = false;
        if (e.key == 40)
            press_left = false;
        else
            press_right = false;
    }
}

function drawBall() {
    var init_angle = 0;
    var final_angle = Math.PI * 2;
    ctx.beginPath();
    ctx.arc(x, y, 10, init_angle, final_angle);
    ctx.fillStyle = "#FFFF";
    ctx.fill();
    ctx.closePath();
}


var ballRadius = 10;
var paddleWidth = 15;
var paddleHeight = 75;
var paddleY = (canvas.height - paddleHeight) / 2;

function draw_padle_Left() {
    ctx.beginPath();
    ctx.rect(canvas.width - 25, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function draw_padle_Right() {
    ctx.beginPath();
    ctx.rect(10, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function draw_center_line() {
    ctx.beginPath();
    ctx.rect(canvas.width / 2, 0, 1, canvas.height);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    draw_padle_Right();
    draw_center_line();
    draw_padle_Left();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    if (uppress) {
        paddleY += 7;
        if (paddleY + paddleHeight > canvas.height) {
            paddleY = canvas.height - paddleHeight;
        }
    }
    else if (downpress) {
        paddleY -= 7;
        if (paddleY < 0) {
            paddleY = 0;
        }
    }
    x += dx;
    y += dy;
}

setInterval(draw, 15)

