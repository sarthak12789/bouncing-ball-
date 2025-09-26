let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let gameOver = false;
let score = 0;
const platformImg = new Image();
platformImg.src = 'bounceplat.png';

class spikes {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 30;
        this.count = 5;
        this.velocity=0.5;
        this.aceleration=0.1;
    }
    make() {
        c.fillStyle = 'black';
        for (let i = 0; i < this.count; i++) {
            let x = i * this.width + this.x;
            c.beginPath();
            c.moveTo(x, this.y);             
            c.lineTo(x + this.width / 2, this.y - this.height);
            c.lineTo(x + this.width, this.y); 
            c.closePath();
            c.fill();
        }

    }

    move_right() {
        this.x += this.velocity;
        this.velocity += this.aceleration;
    }
    move_left() {
        this.x -= this.velocity;
        this.velocity += this.aceleration;
    }
};
let s = [
    new spikes(200,innerHeight),
    new spikes(400,innerHeight),
    new spikes(670,innerHeight),
    new spikes(950,innerHeight),
    new spikes(1200,innerHeight),
    new spikes(1400,innerHeight),
    new spikes(1500,innerHeight),
    new spikes(1600,innerHeight),
    new spikes(1700,innerHeight),
    new spikes(1800,innerHeight),
    new spikes(1900,innerHeight),
    new spikes(2000,innerHeight),
    new spikes(2100,innerHeight),
    new spikes(2200,innerHeight),
    new spikes(2300,innerHeight),
    new spikes(2400,innerHeight),
    new spikes(2500,innerHeight),
    new spikes(2600,innerHeight),
    new spikes(2700,innerHeight),
    new spikes(2800,innerHeight),
    new spikes(2900,innerHeight)
];
class destination
{
    constructor()
    {
        this.x=2500;
        this.y=innerHeight;
        this.velocity=0.3;
        this.aceleration=0.05;
    }
    draw()
    {  c.fillStyle='rgba(255, 217, 0, 1)';
        c.fillRect(this.x,this.y-300,100,300);
    }

    move_right() {
        this.x += this.velocity;
        this.velocity += this.aceleration;
    }
    move_left() {
        this.x -= this.velocity;
        this.velocity += this.aceleration;
    }
}
let d= new destination();

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
        // c.fillStyle = 'rgba(15, 46, 248, 1)';
        // c.fillRect(this.x, this.y, this.width, this.height);
        c.drawImage(platformImg, this.x, this.y, this.width, this.height);

    }
    move_right() {
        this.x += this.velocity;
        this.velocity += this.aceleration;
    }
    move_left() {
        this.x -= this.velocity;
        this.velocity += this.aceleration;
    }
};
let p = [
    new plateform(250, 450),
    new plateform(500, 500),
    new plateform(770, 500),
    new plateform(1010, 500),
    new plateform(1220, 500),
    new plateform(1500, 500),
    new plateform(1700,400),
    new plateform(1900,300),
    new plateform(2000,350),
    new plateform(2200,400),
    new plateform(2400,350),
    new plateform(2600,250),
    new plateform(2800,300),
    new plateform(2900,350),
   
    
];

class Ball {
    constructor(x, y) {
        this.x = x;
        this.radius = 20;
        this.y = innerHeight-this.radius;
        this.velocityin_y = 5;
        this.gravity = 0.5;
        this.velocityin_x = 0.5;
        this.acceleration = 0.1;
        this.rightarrow = false;
        this.leftarrow = false;
        this.uparrow = false;
        this.maxleft = 50;
        this.maxright = 200;
        this.isjumping=false;
    }

    draw() {
        c.strokeStyle = "#e80404ff";
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.stroke();
        c.fillStyle = "#e80404ff";
        c.fill();
    }
    checkDestinationCollision() {
    if (
        this.x + this.radius > d.x &&
        this.x - this.radius < d.x + 100 &&
        this.y + this.radius > d.y - 300 &&
        this.y - this.radius < d.y
    ) {
        return true;
    }
    return false;
}

    checkSpikeCollision() {
        for (let spikeGroup of s) {
            for (let i = 0; i < spikeGroup.count; i++) {
                let spikeX = spikeGroup.x + i * spikeGroup.width;
                let spikeY = spikeGroup.y;
                let spikeWidth = spikeGroup.width;
                let spikeHeight = spikeGroup.height;
                if (
                    this.x + this.radius > spikeX &&
                    this.x - this.radius < spikeX + spikeWidth &&
                    this.y + this.radius > spikeY - spikeHeight
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    move_upward() {
        if (gameOver) return; 
        c.clearRect(0, 0, innerWidth, innerHeight);
        if (this.checkDestinationCollision()) {
           gameOver = true;
           drawGameWon();
           return;
      }

        
        if (this.checkSpikeCollision()) {
            gameOver = true;
            drawGameOver();
            return;
        }

        if (this.velocityin_y < 0 && this.y >= innerHeight - this.radius) {
            this.draw();
            this.isjumping=false;
            p.forEach(p => p.make());
            s.forEach(s => s.make());
            d.draw();
            this.y = innerHeight - this.radius;
            return;
        }
        for (let p1 of p) {
            if (this.y + this.radius+3 >= p1.y && this.y + this.radius+3 <= p1.y + p1.height && this.velocityin_y < 0 && this.x+this.radius-15 >= p1.x && this.x+this.radius -15<= p1.x + p1.width) {
                this.velocityin_y = 0;
                this.isjumping=false;
            }
        }
        this.y -= this.velocityin_y;
        this.velocityin_y -= this.gravity;

        this.draw();
        p.forEach(p => p.make());
        s.forEach(s => s.make());
        d.draw();
        ;
    }

    jump() {
        if (gameOver) return;
        if(!this.isjumping)
        { this.isjumping=true;
        this.velocityin_y = 18;
        }
    }

    operate() {
        if (gameOver) return;

if (gameOver) return;
this.y -= this.velocityin_y;
this.velocityin_y -= this.gravity;

if (this.velocityin_y < 0 && this.y + this.radius >= innerHeight) {
    this.y = innerHeight - this.radius;
    this.velocityin_y = 0; 
    this.isjumping = false;
}

for (let p1 of p) {
    if (this.y + this.radius >= p1.y && 
        this.y + this.radius <= p1.y + p1.height && 
        this.velocityin_y < 0 && 
        this.x + this.radius > p1.x && 
        this.x - this.radius < p1.x + p1.width) {
        this.velocityin_y = 0; 
        this.isjumping = false;
        this.y = p1.y - this.radius; 
    }
}  
        if (this.checkDestinationCollision()) {
    gameOver = true;
    drawGameWon();
    return;
}

        if (this.leftarrow == true) {
            if (this.x > this.maxleft) {
                this.x -= this.velocityin_x;
                this.velocityin_x += this.acceleration;
            } else {
                p.forEach(p => p.move_right());
                s.forEach(s => s.move_right());
                d.move_right();
            }
        }
        if (this.rightarrow == true) {
            if (this.x < innerWidth - this.maxright) {
                this.x += this.velocityin_x;
                this.velocityin_x += this.acceleration;
            } else {
                p.forEach(p => p.move_left());
                s.forEach(s => s.move_left());
                d.move_left();
            }
        }
        
        if (this.checkSpikeCollision()) {
            gameOver = true;
            drawGameOver();
            return;
        }

        c.clearRect(0, 0, innerWidth, innerHeight);
        this.draw();
        p.forEach(p => p.make());
        s.forEach(s => s.make());
        d.draw();
        requestAnimationFrame(this.operate.bind(this));
    }
}
function drawGameWon(){
    c.fillStyle = "rgba(0,0,0,0.7)";
    c.fillRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = "white";
    c.font = "50px Arial";
    c.textAlign = "center";
    c.fillText("YOU WON!", innerWidth/2, innerHeight/2);
}
function drawGameOver() {
    c.fillStyle = "rgba(0,0,0,0.7)";
    c.fillRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = "white";
    c.font = "50px Arial";
    c.textAlign = "center";
    c.fillText("GAME OVER!", innerWidth/2, innerHeight/2);
}

let ball = new Ball(50, innerHeight - 38);
ball.draw();

addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowRight": ball.rightarrow = true; break;
        case "ArrowLeft": ball.leftarrow = true; break;
        case "ArrowUp":  {
            ball.jump();
        }
    }
});

addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowRight": ball.rightarrow = false;d.velocity=0.7;s.forEach(s => s.velocity = 0.7); p.forEach(p => p.velocity = 0.7); ball.velocityin_x = 0.1; break;
        case "ArrowLeft": ball.leftarrow = false; d.velocity=0.7;s.forEach(s => s.velocity = 0.7);p.forEach(p => p.velocity = 0.7); ball.velocityin_x = 0.1; break;
    }
});

ball.operate();