const replayBtn = document.getElementById('replaybutton');

replayBtn.addEventListener('click', () => {
    location.reload(); 
});


let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let gameOver = false;
let score = 0;
const platformImg = new Image();
platformImg.src = 'bounceplat.png';
const backgroundImg = new Image();
backgroundImg.src = 'background.jpg'; 


class spikes {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 30;
        this.count = 5;
        this.velocity = 0.5;
        this.aceleration = 0.1;
    }
    make() {
        c.fillStyle =  'rgba(35, 4, 241, 1)';
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
}


class UpsideDownSpikes {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 30;
        this.count = 5;
        this.velocity = 0.5;
        this.aceleration = 0.1;
    }

    make() {
        c.fillStyle = 'rgba(8, 63, 8, 1)';
        for (let i = 0; i < this.count; i++) {
            let x = i * this.width + this.x;
            c.beginPath();
            c.moveTo(x, this.y);
            c.lineTo(x + this.width / 2, this.y + this.height);
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
}

let s = [
    new spikes(200,innerHeight),
    new spikes(400,innerHeight),
    new spikes(670,innerHeight),
    new spikes(950,innerHeight),
    new spikes(1200,innerHeight),
    new spikes(1400,innerHeight)
];

let upsideSpikes = [
    new UpsideDownSpikes(300, 0), 
    new UpsideDownSpikes(800, 0),
    new UpsideDownSpikes(1300, 0),
];

class destination
{
    constructor()
    {
        this.x=1600;
        this.y=innerHeight;
        this.velocity=0.5;
        this.aceleration=0.1;
    }
    draw() {
    c.fillStyle = 'rgba(255, 217, 0, 1)';
    c.fillRect(this.x, this.y - 300, 100, 300);

    
    c.fillStyle = 'black'; 
    c.font = '20px Arial'; 
    c.textAlign = 'center'; 
    c.fillText("destination", this.x + 50, this.y - 150); 
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
let d = new destination();

class plateform {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.initialX = x;
        this.width = Math.random() * 40 + 100;
        this.height = 20;
        this.velocity = 0.5;
        this.aceleration = 0.1;
    }
    make() {
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
}

let p = [
    new plateform(250, 450),
    new plateform(500, 500),
    new plateform(770, 500),
    new plateform(1010, 500),
    new plateform(1220, 500),
    new plateform(1500, 500),
];

class Ball {
    constructor(x, y) {
        this.x = x;
        this.radius = 20;
        this.y = innerHeight - this.radius; 
        this.velocityin_y = 18;
        this.gravity = 0.5;
        this.velocityin_x = 0.5;
        this.acceleration = 0.1;
        this.rightarrow = false;
        this.leftarrow = false;
        this.maxleft = 50;
        this.maxright = 200;
        this.isjumping = false;
        this.canJump = true;
    }

    draw() {
        c.strokeStyle = "#ff0000ff";
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.stroke();
        c.fillStyle = "#fffb00ff";
        c.fill();
    }

    checkDestinationCollision() {
    const destLeft = d.x;
    const destRight = d.x + 100;
    const destTop = d.y - 300;
    const destBottom = d.y;

    
    const ballLeft = this.x - this.radius;
    const ballRight = this.x + this.radius;
    const ballTop = this.y - this.radius;
    const ballBottom = this.y + this.radius;

    return (
        ballRight > destLeft &&
        ballLeft < destRight &&
        ballBottom > destTop &&
        ballTop < destBottom
    );
}


    checkSpikeCollision() {
    
    for (let spikeGroup of s) {
        for (let i = 0; i < spikeGroup.count; i++) {
            let spikeX = spikeGroup.x + i * spikeGroup.width;
            let spikeY = spikeGroup.y;
            let spikeWidth = spikeGroup.width;
            let spikeHeight = spikeGroup.height;
            
            const ax = spikeX, ay = spikeY;
            const bx = spikeX + spikeWidth / 2, by = spikeY - spikeHeight;
            const cx = spikeX + spikeWidth, cy = spikeY;

            const points = [
                {x: this.x - this.radius * 0.7, y: this.y + this.radius * 0.7},
                {x: this.x, y: this.y + this.radius},
                {x: this.x + this.radius * 0.7, y: this.y + this.radius * 0.7}
            ];

            for (const pt of points) {
                if (pointInTriangle(pt.x, pt.y, ax, ay, bx, by, cx, cy)) {
                    return true;
                }
            }
        }
    }

    for (let spikeGroup of upsideSpikes) {
        for (let i = 0; i < spikeGroup.count; i++) {
            let spikeX = spikeGroup.x + i * spikeGroup.width;
            let spikeY = spikeGroup.y;
            let spikeWidth = spikeGroup.width;
            let spikeHeight = spikeGroup.height;

            
            const ax = spikeX, ay = spikeY;
            const bx = spikeX + spikeWidth / 2, by = spikeY + spikeHeight;
            const cx = spikeX + spikeWidth, cy = spikeY;

            const points = [
                {x: this.x - this.radius * 0.7, y: this.y - this.radius * 0.7},
                {x: this.x, y: this.y - this.radius},
                {x: this.x + this.radius * 0.7, y: this.y - this.radius * 0.7}
            ];

            for (const pt of points) {
                if (pointInTriangle(pt.x, pt.y, ax, ay, bx, by, cx, cy)) {
                    return true;
                }
            }
        }
    }

    return false;
}


    jump() {
        if (gameOver) return;
        if(this.canJump)
        { 
            this.isjumping = true;
            this.canJump = false; 
            this.velocityin_y = 18;
        }
    }

    operate() {
        if (gameOver) return; 
        
      
        this.velocityin_y -= this.gravity;
        this.y -= this.velocityin_y;

        if (this.y + this.radius > innerHeight) {
            this.y = innerHeight - this.radius;
            this.velocityin_y = 0;
            this.isjumping = false;
            this.canJump = true;
        }

        for (let p1 of p) {
         if (
                this.y + this.radius >= p1.y && this.y + this.radius <= p1.y + p1.height &&
                this.x + this.radius - 15 >= p1.x && this.x - this.radius + 15 <= p1.x + p1.width &&
                this.velocityin_y < 0
            ) {
                this.y = p1.y - this.radius;
                this.velocityin_y = 0;
                this.isjumping = false;
                this.canJump = true;
                break;
            }
        }

    
        for (let p1 of p) {
            if (
                this.y - this.radius <= p1.y + p1.height && this.y - this.radius >= p1.y &&
                this.x + this.radius - 15 >= p1.x && this.x - this.radius + 15 <= p1.x + p1.width &&
                this.velocityin_y > 0
            ) {
                this.y = p1.y + p1.height + this.radius;
                this.velocityin_y = -this.velocityin_y * 0.5;
                break;
            }
        }
        
        
        if (this.checkDestinationCollision()) { gameOver = true; drawGameWon(); return; }
        if (this.checkSpikeCollision()) { gameOver = true; drawGameOver(); return; }

        if (this.leftarrow) {
            if (this.x > this.maxleft) {
                this.x -= this.velocityin_x;
                this.velocityin_x += this.acceleration;
            } else {
                p.forEach(p1 => p1.move_right());
                s.forEach(s1 => s1.move_right());
                upsideSpikes.forEach(spike => spike.move_right());
                d.move_right(); 
            }
        }

        if (this.rightarrow) {
            if (this.x < innerWidth - this.maxright) {
                this.x += this.velocityin_x;
                this.velocityin_x += this.acceleration;
            } else {
                p.forEach(p => p.move_left());
                s.forEach(s => s.move_left());
                upsideSpikes.forEach(s => s.move_left());
                d.move_left();
            }
        }
           c.clearRect(0, 0, innerWidth, innerHeight);
        c.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        this.draw();
        p.forEach(p => p.make());
        s.forEach(s => s.make());
        upsideSpikes.forEach(spike => spike.make());
        d.draw();
        drawScore();

        
        requestAnimationFrame(this.operate.bind(this));
    }
}
function sign(p1x, p1y, p2x, p2y, p3x, p3y) {
    return (p1x - p3x) * (p2y - p3y) - (p2x - p3x) * (p1y - p3y);
}

function pointInTriangle(px, py, ax, ay, bx, by, cx, cy) {
    const d1 = sign(px, py, ax, ay, bx, by);
    const d2 = sign(px, py, bx, by, cx, cy);
    const d3 = sign(px, py, cx, cy, ax, ay);

    const has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    const has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

    return !(has_neg && has_pos);
}

function drawScore() {
    c.fillStyle = "black";
    c.font = "24px Arial";
    c.textAlign = "left";
    c.fillText("Score: " + score, 10, 30); 
}

function drawGameWon() {
    c.fillStyle = "rgba(0,0,0,0.7)";
    c.fillRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = "white";
    c.font = "50px Arial";
    c.textAlign = "center";
    c.fillText("YOU WON!", innerWidth / 2, innerHeight / 2);
    const replayBtn = document.getElementById('replaybutton');
    if (replayBtn) {
        replayBtn.style.display = 'block';
    }
}

function drawGameOver() {
    c.fillStyle = "rgba(0,0,0,0.7)";
    c.fillRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = "white";
    c.font = "50px Arial";
    c.textAlign = "center";
    c.fillText("GAME OVER!", innerWidth / 2, innerHeight / 2);
    const replayBtn = document.getElementById('replaybutton');
    if (replayBtn) {
        replayBtn.style.display = 'block';
    }
}


let ball = new Ball(50, innerHeight - 38);
ball.draw();

addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowRight":
            ball.rightarrow = true;
            break;
        case "ArrowLeft":
            ball.leftarrow = true;
            break;
        case "ArrowUp":
            ball.jump();
            break;
    }
});

addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowRight":
            ball.rightarrow = false;
            ball.velocityin_x = 0.7
            p.forEach(plat => {
                plat.velocity = 0.5;
            });
            s.forEach(spike => {
                spike.velocity = 0.5;
            });
            upsideSpikes.forEach(spike => {
                spike.velocity = 0.5;
            });
            d.velocity = 0.5;
            d.aceleration = 0.1;

            break;

        case "ArrowLeft":
            ball.leftarrow = false;
            ball.velocityin_x = 0.7;
            p.forEach(plat => {
                plat.velocity = 0.5;
            });
            s.forEach(spike => {
                spike.velocity = 0.5;
            });
            upsideSpikes.forEach(spike => {
                spike.velocity = 0.5;
            });
            d.velocity = 0.5;
            d.aceleration = 0.1;

            break;
    }
});


ball.operate(); 