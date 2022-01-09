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
var paddleWidth = 15;
var paddleHeight = 75;
var uppress = false;
var downpress = false;
var press_right = false;
var press_left = false;
var paddleY_right = (canvas.height - paddleHeight) / 2;
var paddleY_left = (canvas.height - paddleHeight) / 2;
var paddle_rX = canvas.width - 25;
var paddle_lX = 25;

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
    ctx.rect(canvas.width - 25, paddleY_left, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function draw_padle_Right() {
    ctx.beginPath();
    ctx.rect(25, paddleY_right, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(e) {
    if (e.key == "w" || e.key == "ArrowUp") {
        uppress = true;
        if (e.key == "ArrowUp") {
            paddleY_left -= 20;

            if (paddleY_left + paddleHeight > canvas.height) {
                paddleY_left = canvas.height - paddleHeight;
            }
        }
        else {
            paddleY_right -= 20;

            if (paddleY_right + paddleHeight > canvas.height) {
                paddleY_right = canvas.height - paddleHeight;
            }
        }
    }
    else if (e.key == "s" || e.key == "ArrowDown") {
        downpress = true;
        if (e.key == "ArrowDown") {
            paddleY_left += 20;
            if (paddleY_left < 0) {
                paddleY_left = 0;
            }
        }
        else {
            paddleY_right += 20;
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


var player_left = 0;
var player_right = 0;
var score1 = 0;
var score2 = 0;
var start_ball = false;

function collisionDetection() {
    if (start_ball == false) {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 1;
        dy = -1;
        x += dx;
        y += dy;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
        start_ball = true;
    }
    if (x + dx > canvas.width - ballRadius) {
        dx = 0;
        dy = 0;
        score1++;
        start_ball = false;
        console.log("score1: " + score1);
    }
    else if (x + dx < ballRadius) {
        dx = 0;
        dy = 0;
        score2++;
        start_ball = false;
        console.log("score2: " + score2);
    }
    //left paddle collision
    if (x - r < paddle_lX + paddleWidth && y < paddleY_left + paddleHeight && y > paddleY_left) {
        dx = -dx;
        start_ball = true;
    }
    if (Math.sqrt(Math.pow(paddle_lX + paddleWidth - x, 2) + Math.pow(paddleY_left - y, 2)) < ballRadius) {
        dx = -dx;
        start_ball = true;
    }
    if (Math.sqrt((paddle_lX + paddleWidth - x) ** 2 + (paddleY_left + paddleHeight - y) ** 2) < radius) {
        dx = -dx;
        start_ball = true;
    }
    //right paddle collision
    if (x - r < paddle_rX + paddleWidth && y < paddleY_right + paddleHeight && y > paddleY_right) {
        dx = -dx;
        start_ball = true;
    }
    if (Math.sqrt(Math.pow(paddle_rX + paddleWidth - x, 2) + Math.pow(paddleY_right - y, 2)) < ballRadius) {
        dx = -dx;
        start_ball = true;
    }
    if (Math.sqrt((paddle_rX + paddleWidth - x) ** 2 + (paddleY_right + paddleHeight - y) ** 2) < radius) {
        dx = -dx;
        start_ball = true;
    }
    else
        start_ball = false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_center_line();
    drawBall();
    draw_padle_Left();
    draw_padle_Right();
    collisionDetection();
    // if (uppress) {
    //     paddleY_left -= 20;
    //     if (paddleY_left + paddleHeight > canvas.height) {
    //         paddleY_left = canvas.height - paddleHeight;
    //     }
    // }
    // if (downpress) {
    //     paddleY_left += 20;
    //     if (paddleY_left < 0) {
    //         paddleY_left = 0;
    //     }
    // }
    // if (press_left) {
    //     paddleY_right -= 20;
    //     if (paddleY_right + paddleHeight > canvas.height) {
    //         paddleY_right = canvas.height - paddleHeight;
    //     }
    // }
    // if (press_right) {
    //     paddleY_right += 20;
    //     if (paddleY_right < 0) {
    //         paddleY_right = 0;
    //     }
    // }
    if (score1 == 10) {
        alert("Player 1 wins");
        score1 = 0;
        score2 = 0;
    }
    else if (score2 == 10) {
        alert("Player 2 wins");
        score1 = 0;
        score2 = 0;
    }
    requestAnimationFrame(draw);

}

// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//     draw_padle_Right();
//     draw_center_line();
//     draw_padle_Left();
//     collisionDetection();

// }

setInterval(draw, 1)


