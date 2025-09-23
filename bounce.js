let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

class spikes {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.width = 20;
            this.height = 30;
            this.count = 5;
        }
 make() {
        c.fillStyle = 'black';
        for (let i = 0; i < this.count; i++) {
            let x = i * this.width + this.x;
            c.beginPath();
            c.moveTo(x, this.y);             
            c.lineTo(x + this.width / 2, this.y- this.height);
            c.lineTo(x + this.width, this.y); 
            c.closePath();
            c.fill();
        }
    }
};
let s = [new spikes(400,innerHeight),
new spikes(640,550),
new spikes(600,300),
new spikes(800,300),
];



class plateform {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = Math.random() * 40 + 100;
        this.height = 20;
        this.velocity = 0.5;
        this.aceleration = 0.1;
    }
    make() {
        c.fillStyle = 'rgba(0, 255, 0, 1)';
        c.fillRect(this.x, this.y, this.width, this.height);
    }
    move_right() {
        c.clearRect(0, 0, innerWidth, innerHeight);
        this.x += this.velocity;
        this.velocity += this.aceleration;
        p.forEach(p => p.make());
        

    }
    move_left() {

        c.clearRect(0, 0, innerWidth, innerHeight);
        this.x -= this.velocity;
        this.velocity += this.aceleration;
        p.forEach(p => p.make());
    }
};
let p = [new plateform(250, 450),
new plateform(500, 500),
new plateform(770, 500),
new plateform(910, 500),
new plateform(1120, 500),
new plateform(1500, 500),
];

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.velocityin_y = 18;
        this.gravity = 0.5;
        this.velocityin_x = 0.5;
        this.acceleration = 0.1;
        this.rightarrow = false;
        this.leftarrow = false;
        this.uparrow = false;
        this.maxleft = 50;
        this.maxright = 200;
    }
    draw() {
        c.strokeStyle = "#e80404ff";
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.stroke();
        c.fillStyle = "#e80404ff";
        c.fill();
    }
    move_upward() {
        c.clearRect(0, 0, innerWidth, innerHeight);

        if (this.velocityin_y < 0 && this.y >= innerHeight - this.radius) {
            this.draw();
            p.forEach(p => p.make());
            s.forEach(s => s.make());
            this.y = innerHeight - this.radius;
            return;
        }
        for (let p1 of p) {
            if (this.y + this.radius >= p1.y && this.y + this.radius <= p1.y + p1.height && this.velocityin_y < 0 && this.x >= p1.x && this.x <= p1.x + p1.width) {
                this.velocityin_y = 0;
            }
        }
        // console.log(this.velocityin_y);
        this.y -= this.velocityin_y; this.velocityin_y -= this.gravity;
        this.draw();
        p.forEach(p => p.make());
        s.forEach(s => s.make());
        requestAnimationFrame(this.move_upward.bind(this));
    }
    jump() {
        this.velocityin_y = 18;
        this.move_upward();
    }

    operate() {

        if (this.leftarrow == true) {
            if (this.x > this.maxleft) {
                this.x -= this.velocityin_x;
                this.velocityin_x += this.acceleration;

            } else {
                p.forEach(p => p.move_right());
            }
        }
        if (this.rightarrow == true) {
            //c.clearRect(0,0,innerWidth,innerHeight);
            if (this.x < innerWidth - this.maxright) {
                this.x += this.velocityin_x;
                this.velocityin_x += this.acceleration;
            } else {
                p.forEach(p => p.move_left());
            }

        }
        c.clearRect(0, 0, innerWidth, innerHeight);
        this.draw();
        p.forEach(p => p.make());
        s.forEach(s => s.make());
        requestAnimationFrame(this.operate.bind(this));

    }
};

let ball = new Ball(50, innerHeight - 20);
ball.draw();
addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowRight": ball.rightarrow = true; break;
        case "ArrowLeft": ball.leftarrow = true; break;
        case "ArrowUp": if (ball.y >= innerHeight - ball.radius) {
            console.log(ball.y);
            ball.jump();
        }
    }
});
ball.operate();

addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowRight": ball.rightarrow = false; p.forEach(p => p.velocity = 0.7); ball.velocityin_x = 0.1; break;
        case "ArrowLeft": ball.leftarrow = false; p.forEach(p => p.velocity = 0.7); ball.velocityin_x = 0.1; break;

    }
}

);

