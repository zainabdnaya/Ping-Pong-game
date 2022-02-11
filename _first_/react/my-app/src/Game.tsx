import React, { useRef, useEffect } from 'react'
import { Socket, io } from 'socket.io-client';
import "./_Game.css"

export class player {
    score: number;
    paddle_x: number;
    paddle_y: number;
    paddle_width: number;
    paddle_height: number;
    paddle_speed: number;
    ctx: CanvasRenderingContext2D;
    color: string;
    constructor(
        score: number,
        paddle_x: number,
        paddle_y: number,
        paddle_width: number,
        paddle_height: number,
        paddle_speed: number,
        ctx: CanvasRenderingContext2D,
        color: string
    ) {
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
        this.ctx.rect(
            this.paddle_x,
            this.paddle_y,
            this.paddle_width,
            this.paddle_height
        );
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    public get _paddle_x() {
        return this.paddle_x;
    }

    public get _paddle_y() {
        return this.paddle_y;
    }

    public set _Paddle_x(value: number) {
        this.paddle_x = value;
    }

    public set _Paddle_y(value: number) {
        this.paddle_y = value;
    }

    public get _paddle_height() {
        return this.paddle_height;
    }
    public set _score(value: number) {
        this.score += value;
    }

    ToJson() {
        return (
            {
                "paddle_x": this.paddle_x,
                "paddle_y": this.paddle_y,
                "paddle_width": this.paddle_width,
                "paddle_height": this.paddle_height,
                "paddle_speed": this.paddle_speed,
                "ctx": this.ctx,
                "color": this.color,

            });
    }
}

export class ball {
    ball_x: number;
    ball_y: number;
    ball_radius: number;
    velocity_x: number;
    velocity_y: number;
    ctx: CanvasRenderingContext2D;
    color: string;
    constructor(
        ctx: CanvasRenderingContext2D,
        ball_x: number,
        ball_y: number,
        ball_radius: number,
        velocity_x: number,
        velocity_y: number,
        color: string
    ) {
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



    public get _ball_x() {
        return this.ball_x;
    }

    public get _ball_y() {
        return this.ball_y;
    }

    public get _velocity_x() {
        return this.velocity_x;
    }

    public get _velocity_y() {
        return this.velocity_y;
    }

    public set _ball_x(value) {
        this.ball_x = value;
    }

    public set _ball_y(value) {
        this.ball_y = value;
    }

    public set _velocity_x(value) {
        this.velocity_x = value;
    }

    public set _velocity_y(value) {
        this.velocity_y = value;
    }

    public get _ball_radius() {
        return this.ball_radius;
    }



}

export class Game {


    canvas: HTMLCanvasElement;
    ctx: any;
    paddle_right: player;
    paddle_left: player;
    // game_over: boolean;
    // winner: string;
    uppress: boolean;
    downpress: boolean;
    center_rec: player;
    uppress1: boolean;
    downpress1: boolean;
    _ball: ball;
    // x: number;
    // y: number;
    socket: Socket;
    sender: string;
    myId : string;
    player: number;
    email : string;


    constructor(canvas: HTMLCanvasElement,date:any) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.uppress = false;
        this.downpress = false;
        this.uppress1 = false;
        this.email = date.Email;
        console.log(this.email);
        this.downpress1 = false;
        this.paddle_left = new player(0, 10, this.canvas.height / 2, 10, 80, 1, this.ctx, "white");
        this.paddle_right = new player(0, this.canvas.width - 20, (this.canvas.height) / 2, 10, 80, 1, this.ctx, "white");
        this.center_rec = new player(0, this.canvas.width / 2, 0, 1, this.canvas.height, 0, this.ctx, "white");
        this._ball = new ball(this.ctx, this.canvas.width / 2, this.canvas.height / 2, 8, 2, -2, "red");
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        this.socket = io("http://localhost:3080");
       
        this.sender = "";
        this.player = 0;
        this.myId = "";
        this.socket.on('msgToClient', (msg) => {
            // if (msg.email  !== undefined) {
                // this.sender = msg.email;
                this.sender = msg.sessionId;
                this.myId = this.socket.id;
                // console.log(this.myId);
            // }
            if (msg.paddle_x !== undefined ) {

                this.paddle_left.paddle_x = msg.paddle_x;
                this.paddle_left.paddle_y = msg.paddle_y;
            }
            // console.log(msg);
        });
        this.socket.emit('msgToServer', this.paddle_left.ToJson()); // push a mesage to the array
        this.start();

    }

    receiveMessage(data: any) {
        // console.log(`receive: ${data}`);
    }

    keyDownHandler(e: KeyboardEvent) 
    {
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

    keyUpHandler(e: KeyboardEvent) {
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


    keyhook() {

        if (this.uppress === true) {

            this.paddle_left.paddle_y -= 4;

            if (this.paddle_left.paddle_y < 0) {
                this.paddle_left.paddle_y = 0;
            }

            this.socket.emit('msgToServer', this.paddle_left.ToJson()); // push a mesage to the array
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
            this.socket.emit('msgToServer', this.paddle_left.ToJson()); // push a mesage to the array
        }
        if (this.downpress1) {

            this.paddle_right.paddle_y += 4;
            if (this.paddle_right._paddle_y + this.paddle_right._paddle_height > this.canvas.height) {
                this.paddle_right.paddle_y = this.canvas.height - this.paddle_right._paddle_height;
            }
        }
    }

    collisionDetection() {
        if (this._ball.ball_y + this._ball._velocity_y < this._ball._ball_radius) {
            this._ball._velocity_y *= -1;
        } else if (
            this._ball.ball_y + this._ball._velocity_y >
            this.canvas.height - this._ball._ball_radius
        ) {
            //ball hits the bottom
            this._ball._velocity_y *= -1;
        }

        // ball hits rihgt paddle
        if (this._ball.ball_x + this._ball._velocity_x + 5 > this.canvas.width - this._ball._ball_radius - this.paddle_right.paddle_width) {
            if (
                this._ball.ball_y > this.paddle_right._paddle_y &&
                this._ball.ball_y < this.paddle_right._paddle_y + this.paddle_right._paddle_height + 8
            ) {
                this._ball._velocity_x = -this._ball._velocity_x;
            } else if (this._ball.ball_x + this._ball._velocity_x < this.canvas.width - this._ball.ball_radius) {
                // this.paddle_right._score(1);
                this._ball.ball_x = this.canvas.width / 2;
                this._ball.ball_y = this.canvas.height - this.paddle_right._paddle_height;
                this._ball._velocity_x = 2;
                this._ball._velocity_y = -2;
                this.paddle_left.paddle_y = ((this.canvas.height - this.paddle_left._paddle_height) / 2);
                this.paddle_right.paddle_y = ((this.canvas.height - this.paddle_right._paddle_height) / 2);
            }
        }
        if (
            this._ball.ball_x + this._ball._velocity_x - 5 <
            this._ball._ball_radius + this.paddle_left.paddle_width
        ) {
            if (
                this._ball.ball_y > this.paddle_left._paddle_y &&
                this._ball.ball_y < this.paddle_left._paddle_y + this.paddle_left._paddle_height + 8
            ) {
                this._ball._velocity_x = -this._ball._velocity_x;
            } else if (this._ball.ball_x + this._ball._velocity_x < 10 - this._ball.ball_radius) {
                // this.paddle_left._score(1);
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
        this.center_rec.draw_padle();
    }


    start() {
        if (this.email === "hamzaelkhatri@gmail.com") 
        {
            this.keyhook();
        }
        
        this.draw();
        this._ball.ball_x += this._ball._velocity_x;
        this._ball.ball_y += this._ball._velocity_y;
        this.collisionDetection();
        requestAnimationFrame(() => this.start());

    }
}


const Canvas = (props: any) => {
    {
        const canvasRef = useRef(null)
        console.log(props.date)
        useEffect(() => {
            console.log(props);
            new Game(canvasRef.current as any,props.data);
        }, []);
        return <canvas ref={canvasRef}  {...props} width={800} height={400} />
    }
}

export default Canvas;