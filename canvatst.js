//Canvas basics

//getElementById()  methodr returns an Element object representing the element whose id property matches the specified string. 
//Since element IDs are required to be unique if specified, they're a useful way to get access to a specific element quickly.
var canvas = document.getElementById("myCanvas");

// getcontext The getContext() function returns the drawing context - which is an object that has all the drawing properties and functions you use to draw on the canvas.

var ctx = canvas.getContext("2d");



var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 1;
var dy = -1;
var r = 10;
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

function keyDownHandler(e) {
    if (e.key == "w" || e.key == "ArrowUp") {
        uppress = true;
        if (e.key == "ArrowUp") {
            paddleY_left -= 15;

            if (paddleY_left + paddleHeight > canvas.height) {
                paddleY_left = canvas.height - paddleHeight;
            }
        }
        else {
            paddleY_right -= 15;

            if (paddleY_right + paddleHeight > canvas.height) {
                paddleY_right = canvas.height - paddleHeight;
            }
        }
    }
    else if (e.key == "s" || e.key == "ArrowDown") {
        downpress = true;
        if (e.key == "ArrowDown") {
            paddleY_left += 15;
            if (paddleY_left < 0) {
                paddleY_left = 0;
            }
        }
        else {
            paddleY_right += 15;
            if (paddleY_right < 0) {
                paddleY_right = 0;
            }
        }
    }
}

function keyUpHandler(e) {
    if (uppress) {
        uppress = false;
    }
    else if (downpress) {
        downpress = false;
    }
}
var speed = 1;
var score_left = 0;
var score_right = 0;


function collisionDetection() 
{
    for (var i = 0; i < 2; i++) {
        var paddle_left = paddle_lX;
        var paddle_right = paddle_rX;
        var paddle_top = paddleY_left;
        var paddle_bottom = paddleY_left + paddleHeight;
        var ball_left = x - ballRadius;
        var ball_right = x + ballRadius;
        var ball_top = y - ballRadius;
        var ball_bottom = y + ballRadius;
        var paddle_left_right = paddle_left + paddleWidth;
        var paddle_right_left = paddle_right - paddleWidth;
        var paddle_top_bottom = paddle_top + paddleHeight;
        var paddle_bottom_top = paddle_bottom - paddleHeight;

        if (i == 0) {
            if (ball_left <= paddle_left_right && ball_right >= paddle_left && ball_bottom >= paddle_top && ball_top <= paddle_bottom) {
                dx = -dx;
                x = paddle_left_right + ballRadius;
            }
        }
        else {
            if (ball_left <= paddle_right_left && ball_right >= paddle_right && ball_bottom >= paddle_top && ball_top <= paddle_bottom) {
                dx = -dx;
                x = paddle_right_left - ballRadius;
            }
        }
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        dy = -dy;
    }
    if (x + dx < ballRadius) {
        score_right++;
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 1;
        dy = -1;
    }
    else if (x + dx > canvas.width - ballRadius) {
        score_left++;
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = -1;
        dy = -1;
    }
    x
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
    draw_center_line();
    draw_padle_Left();
    draw_padle_Right();
    score_record();
    drawBall();
    x += dx;
    y += dy;
    collisionDetection();
    if (score_right == 5 || score_left == 5) {
        score_right = 0;
        score_left = 0;
        alert("Game Over");
        // canvas.focus();
    }
}

setInterval(draw, speed);