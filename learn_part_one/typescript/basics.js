class player {
    constructor(score, paddle_x, paddle_y, paddle_width, paddle_height, paddle_speed, ctx, color) {
        this.score = score;
        this.paddle_x = paddle_x;
        this.paddle_y = paddle_y;
        this.paddle_width = paddle_width;
        this.paddle_height = paddle_height;
        this.paddle_speed = paddle_speed;
        this.ctx = ctx;
        this.color = color;
    }
    draw_padle() {
        this.ctx.beginPath();
        this.ctx.rect(this.paddle_x, this.paddle_y, this.paddle_width, this.paddle_height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    get _paddle_x() {
        return this.paddle_x;
    }
    get _paddle_y() {
        return this.paddle_y;
    }
    set _Paddle_x(value) {
        this.paddle_x = value;
    }
    set _Paddle_y(value) {
        this.paddle_y = value;
    }
    get _paddle_height() {
        return this.paddle_height;
    }
}
class ball {
    constructor(ctx, ball_x, ball_y, ball_radius, velocity_x, velocity_y, color) {
        this.ball_x = ball_x;
        this.ball_y = ball_y;
        this.ball_radius = ball_radius;
        this.velocity_x = velocity_x;
        this.velocity_y = velocity_y;
        this.ctx = ctx;
        this.color = color;
    }
    draw_ball() {
        this.ctx.beginPath();
        this.ctx.arc(this.ball_x, this.ball_y, this.ball_radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    get _ball_x() {
        return this.ball_x;
    }
    get _ball_y() {
        return this.ball_y;
    }
    get _velocity_x() {
        return this.velocity_x;
    }
    get _velocity_y() {
        return this.velocity_y;
    }
    set _ball_x(value) {
        this.ball_x = value;
    }
    set _ball_y(value) {
        this.ball_y = value;
    }
    set _velocity_x(value) {
        this.velocity_x = value;
    }
    set _velocity_y(value) {
        this.velocity_y = value;
    }
    get _ball_radius() {
        return this.ball_radius;
    }
}
class game {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth * 0.5;
        this.canvas.height = window.innerHeight * 0.5;
        this.uppress = false;
        this.downpress = false;
        this.uppress1 = false;
        this.pause = 0;
        this.downpress1 = false;
        this.paddle_left = new player(0, 10, this.canvas.height / 2, 10, 80, 1, this.ctx, "white");
        this.paddle_right = new player(0, this.canvas.width - 20, (this.canvas.height) / 2, 10, 80, 1, this.ctx, "white");
        this.center_rec = new player(0, this.canvas.width / 2, 0, 1, this.canvas.height, 0, this.ctx, "white");
        this._ball = new ball(this.ctx, this.canvas.width / 2, this.canvas.height / 2, 8, 3, -3, "red");
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        this.start();
    }
    keyDownHandler(e) {
        if (e.key === "ArrowUp" || e.key === "Up") {
            this.uppress = true;
        }
        if (e.key === "w" || e.key === "KeyW") {
            this.uppress1 = true;
        }
        if (e.key === "ArrowDown" || e.key === "Down") {
            this.downpress = true;
        }
        if (e.key === "s" || e.key === "KeyS") {
            this.downpress1 = true;
        }
    }
    keyUpHandler(e) {
        if (e.key === "ArrowUp" || e.key === "Up") {
            this.uppress = false;
        }
        if (e.key === "w" || e.key === "KeyW") {
            this.uppress1 = false;
        }
        if (e.key === "ArrowDown" || e.key === "Down") {
            this.downpress = false;
        }
        if (e.key === "s" || e.key === "KeyS") {
            this.downpress1 = false;
        }
    }
    home(event) {
        const circle = new Path2D();
        // circle.arc(150, 75, 50, 0, 2 * Math.PI);
        // this.ctx.beginPath();
        console.log("home");
        circle.arc(this.canvas.width / 2, this.canvas.height / 2 + 100, 50, 0, Math.PI * 2);
        this.ctx.fillStyle = "Black";
        this.ctx.fill(circle);
        if (this.ctx.isPointInPath(circle, event.offsetX, event.offsetY)) {
            this.ctx.fillStyle = 'green';
        }
        else {
            this.ctx.fillStyle = 'red';
        }
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill(circle);
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Home", this.canvas.width / 2 - this.ctx.measureText("Home").width / 2, this.canvas.height / 2 + 112);
        this.ctx.beginPath();
    }
    keyhook() {
        if (this.uppress === true) {
            this.paddle_left.paddle_y -= 4;
            if (this.paddle_left.paddle_y < 0) {
                this.paddle_left.paddle_y = 0;
            }
        }
        if (this.uppress1) {
            this.paddle_right.paddle_y -= 4;
            if (this.paddle_right._paddle_y < 0) {
                this.paddle_right.paddle_y = 0;
            }
        }
        if (this.downpress) {
            this.paddle_left.paddle_y += 4;
            if (this.paddle_left.paddle_y + this.paddle_left._paddle_height > this.canvas.height) {
                this.paddle_left.paddle_y = this.canvas.height - this.paddle_left._paddle_height;
            }
        }
        if (this.downpress1) {
            this.paddle_right.paddle_y += 4;
            if (this.paddle_right._paddle_y + this.paddle_right._paddle_height > this.canvas.height) {
                this.paddle_right.paddle_y = this.canvas.height - this.paddle_right._paddle_height;
                // this.paddle_right._Paddle_y();
            }
        }
    }
    collisionDetection() {
        if (this._ball.ball_y + this._ball._velocity_y < this._ball._ball_radius) {
            this._ball._velocity_y *= -1;
        }
        else if (this._ball.ball_y + this._ball._velocity_y >
            this.canvas.height - this._ball._ball_radius) {
            //ball hits the bottom
            this._ball._velocity_y *= -1;
        }
        // ball hits rihgt paddle
        if (this._ball.ball_x + this._ball._velocity_x + 5 > this.canvas.width - this._ball._ball_radius - this.paddle_right.paddle_width) {
            if (this._ball.ball_y > this.paddle_right._paddle_y &&
                this._ball.ball_y < this.paddle_right._paddle_y + this.paddle_right._paddle_height + 8) {
                this._ball._velocity_x = -this._ball._velocity_x;
            }
            else if (this._ball.ball_x + this._ball._velocity_x < this.canvas.width - this._ball.ball_radius) {
                this.paddle_right.score++;
                this._ball.ball_x = this.canvas.width / 2;
                this._ball.ball_y = this.canvas.height - this.paddle_right._paddle_height;
                this._ball._velocity_x = 2;
                this._ball._velocity_y = -2;
                this.paddle_left.paddle_y = ((this.canvas.height - this.paddle_left._paddle_height) / 2);
                this.paddle_right.paddle_y = ((this.canvas.height - this.paddle_right._paddle_height) / 2);
            }
        }
        if (this._ball.ball_x + this._ball._velocity_x - 5 <
            this._ball._ball_radius + this.paddle_left.paddle_width) {
            if (this._ball.ball_y > this.paddle_left._paddle_y &&
                this._ball.ball_y < this.paddle_left._paddle_y + this.paddle_left._paddle_height + 8) {
                this._ball._velocity_x = -this._ball._velocity_x;
            }
            else if (this._ball.ball_x + this._ball._velocity_x < 10 - this._ball.ball_radius) {
                this.paddle_left.score++;
                this._ball.ball_x = this.canvas.width / 2;
                this._ball.ball_y = this.canvas.height - this.paddle_right._paddle_height;
                this._ball._velocity_y = -2;
                this._ball._velocity_x = -2;
                this.paddle_left.paddle_y = ((this.canvas.height - this.paddle_left._paddle_height) / 2);
                this.paddle_right.paddle_y = ((this.canvas.height - this.paddle_right._paddle_height) / 2);
            }
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.paddle_left.draw_padle();
        this.paddle_right.draw_padle();
        this._ball.draw_ball();
        // this.center_rec.draw_padle();
    }
    draw_winner(name) {
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("The WINNER is " + name, this.canvas.width / 2 - this.ctx.measureText("The WINNER is " + name).width / 2, this.canvas.height / 2);
        // this.ctx.beginPath();
        // this.ctx.rect(this.canvas.width / 2 -100 , this.canvas.height / 2  + 100 , 100,50 );
        // this.ctx.fillStyle = "red";
        // this.ctx.fill();
        // this.ctx.closePath();
        // this.ctx.fill();
        // this.ctx.stroke();
        // var circle = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        // this.canvas.addEventListener("click", () => {
        //     this.ctx.fillStyle = "green";
        //     this.ctx.fill();
        //     console.log("clicked");  
        // });
        // this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2 + 100, 50, 0, Math.PI * 2);
        this.ctx.fillStyle = "grey";
        this.ctx.fill();
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Home", this.canvas.width / 2 - this.ctx.measureText("Home").width / 2, this.canvas.height / 2 + 112);
        this.pause = 1;
        document.addEventListener('mousemove', this.home.bind(this), false);
        document.addEventListener('click', this.homeClick.bind(this), false);
        // this.ctx.closePath();
    }
    homeClick(e) {
        const circle = new Path2D();
        // circle.arc(150, 75, 50, 0, 2 * Math.PI);
        // this.ctx.beginPath();
        circle.arc(this.canvas.width / 2, this.canvas.height / 2 + 100, 50, 0, Math.PI * 2);
        this.ctx.fillStyle = "Black";
        this.ctx.fill(circle);
        if (this.ctx.isPointInPath(circle, e.offsetX, e.offsetY)) {
            console.log("home2");
            this.ctx.fillStyle = 'green';
        }
        else {
            this.ctx.fillStyle = 'red';
        }
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill(circle);
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Home", this.canvas.width / 2 - this.ctx.measureText("Home").width / 2, this.canvas.height / 2 + 112);
        this.ctx.beginPath();
    }
    show_score() {
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.paddle_left.score + '', this.canvas.width / 2 - 100, 30);
        this.ctx.fillText(this.paddle_right.score + '', this.canvas.width / 2 + 100, 30);
    }
    start() {
        if (this.pause === 0) {
            this.keyhook();
            this.draw();
            // setInterval(() => {
            this._ball.ball_x += this._ball._velocity_x;
            this._ball.ball_y += this._ball._velocity_y;
            this.collisionDetection();
            this.show_score();
            if (this.paddle_left.score === 1) {
                this.draw_winner(" Right");
            }
            if (this.paddle_right.score === 1) {
                this.draw_winner(" Left");
            }
        }
        requestAnimationFrame(() => this.start());
        // }, 1);
    }
}
var begin = new game();
