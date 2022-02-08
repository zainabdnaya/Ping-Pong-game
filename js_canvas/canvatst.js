//Canvas basics

//getElementById()  methodr returns an Element object representing the element whose id property matches the specified string. 
//Since element IDs are required to be unique if specified, they're a useful way to get access to a specific element quickly.
var canvas = document.getElementById("myCanvas");

// getcontext The getContext() function returns the drawing context - which is an object that has all the drawing properties and functions you use to draw on the canvas.

var ctx = canvas.getContext("2d");



var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 0.5;
var dy = -0.5;
var r = 5;
var ballRadius = 10;
var paddleWidth = 10;
var paddleHeight = 80;
var uppress = false;
var downpress = false;
var press_right = false;
var press_left = false;
var paddleY_right = (canvas.height - paddleHeight) / 2;
var paddleY_left = (canvas.height - paddleHeight) / 2;
var paddle_rX = canvas.width - 20;
var paddle_lX = 20;
var score_left = 0;
var score_right = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawBall() {
    var init_angle = 0;
    var final_angle = Math.PI * 2;
    ctx.beginPath();
    ctx.arc(x, y, r, init_angle, final_angle);
    ctx.fillStyle = "#FFFF";
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

function draw_padle_Left() {
    ctx.beginPath();
    ctx.rect(10, paddleY_left, paddleWidth, 80);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function draw_padle_Right() {
    ctx.beginPath();
    ctx.rect(canvas.width - 20, paddleY_right, paddleWidth, 80);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
var uppress1 = false;
var downpress1 = false;

function keyDownHandler(e) {
    if (e.key == "ArrowUp" || e.key == "Up") {
        uppress = true;
    }
    if (e.key == "w" || e.key == "KeyW") {
        uppress1 = true;
    }
    if (e.key == "ArrowDown" || e.key == "Down") {
        downpress = true;
    }
    if (e.key == "s" || e.key == "KeyS") {
        downpress1 = true;
    }
}

function keyUpHandler(e) {

    if (e.key == "ArrowUp" || e.key == "Up") {
        uppress = false;
    }
    if (e.key == "w" || e.key == "KeyW") {
        uppress1 = false;
    }
    if (e.key == "ArrowDown" || e.key == "Down") {
        downpress = false;
    }
    if (e.key == "s" || e.key == "KeyS") {
        downpress1 = false;
    }
}

function keyhook() {
    if (uppress) {
        paddleY_left -= 1;
        if (paddleY_left < 0) {
            paddleY_left = 0;
        }
    }
     if (uppress1) {
        paddleY_right -= 1;
        if (paddleY_right < 0) {
            paddleY_right = 0;
        }
    }
     if (downpress) {
        paddleY_left += 1;
        if (paddleY_left + paddleHeight > canvas.height ) {
            paddleY_left = canvas.height - paddleHeight;
        }
    }
     if (downpress1) {
        paddleY_right += 1;
        if (paddleY_right + paddleHeight > canvas.height ) {
            paddleY_right = canvas.height - paddleHeight;
        }
    }
}

function collisionDetection() {
    if (y + dy < ballRadius) { //ball hits the top
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) { //ball hits the bottom
        dy = -dy;
    }

    // ball hits rihgt paddle
    if (x + dx > canvas.width - ballRadius - paddleWidth) {
        if (y > paddleY_right && y < paddleY_right + paddleHeight) {
            dx = -dx;
        }
        else {
            score_right += 1;
            x = canvas.width / 2;
            y = canvas.height - paddleHeight;
            dx = 1;
            dy = -1;
            paddleY_left = (canvas.height - paddleHeight) / 2;
            paddleY_right = (canvas.height - paddleHeight) / 2;
        }
    }
    // balls hits left paddle
    if (x + dx < ballRadius + paddleWidth) {
        if (y > paddleY_left && y < paddleY_left + paddleHeight) {
            dx = -dx;
        }
        else {
            score_left += 1;
            x = canvas.width / 2;
            y = canvas.height - paddleHeight;
            dx = -1;
            dy = -1;
            paddleY_left = (canvas.height - paddleHeight) / 2;
            paddleY_right = (canvas.height - paddleHeight) / 2;
        }
    }

}

function score_record() {
    ctx.font = "30px verdana";
    ctx.fillStyle = "red";
    ctx.textAlign = "left";
    ctx.fillText(score_right, 25, 25);

    ctx.font = "30px verdana";
    ctx.fillStyle = "red";
    ctx.textAlign = "right";
    ctx.fillText(score_left, canvas.width - 25, 25);
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    draw_center_line();
    draw_padle_Left();
    draw_padle_Right();
    collisionDetection();
    score_record();
    if (score_right == 10) {
        alert("Player  in left wins");
        score_right = 0;
        score_left = 0;
    }
    else if (score_left == 10) {
        alert("Player  in right wins");
        score_right = 0;
        score_left = 0;
    }
    keyhook();
    x += dx;
    y += dy;
}
var speed = 1;

setInterval(draw, speed);