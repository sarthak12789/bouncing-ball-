let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
let spikes = {
    width: 20,
    height: 30,
    count: 100,
    draw: function() {
        c.fillStyle = 'black';
        for (let i = 0; i < this.count; i++) {
            let x = i * this.width + 100;
            c.beginPath();
            c.moveTo(x, innerHeight);             
            c.lineTo(x + this.width / 2, innerHeight - this.height);
            c.lineTo(x + this.width, innerHeight); 
            c.closePath();
            c.fill();
        }
    }
};

class plateform
{
    constructor(x,y)
    {
        this.x=x
        this.y=y
        this.width=Math.random()*40+100;
        this.height=20;
    }
    make()
    {   c.fillStyle='rgba(0, 255, 0, 1)';
        c.fillRect(this.x,this.y,this.width,this.height);
    }
};
let p1=new plateform(110,500);
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
        this.uparrow=false;
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
       c.clearRect(0, 0, innerWidth, innerHeight - 30); 

        
        if (this.velocityin_y <0&&this.y>=innerHeight-this.radius) {
            this.draw();
            p1.make();
            this.y=innerHeight-this.radius;
            return;
        }
        if(this.y+this.radius>=p1.y&&this.y+this.radius<=p1.y+p1.height&&this.velocityin_y<0&&this.x>=p1.x&&this.x<=p1.x+p1.width)
        {    
            this.velocityin_y=0;
        }
        console.log(this.velocityin_y);
        this.y -= this.velocityin_y; this.velocityin_y -= this.gravity;
        this.draw();
        p1.make();
        requestAnimationFrame(this.move_upward.bind(this));
    }
    jump() { 
        if(this.y!=p1.y)
        this.y = innerHeight;
        this.velocityin_y = 18;
        this.move_upward();
    }

    operate() {
        
        if (this.leftarrow == true) {
            if (this.x > 50) {
                this.x -= this.velocityin_x;
                this.velocityin_x += this.acceleration;
            }}
            if (this.rightarrow == true) {
                   //c.clearRect(0,0,innerWidth,innerHeight);
                if (this.x < innerWidth - 300) {
                    this.x += this.velocityin_x;
                    this.velocityin_x += this.acceleration;
                }
            
            } 
            c.clearRect(0, 0, innerWidth, innerHeight);
            this.draw();
            p1.make();
            spikes.draw()
requestAnimationFrame(this.operate.bind(this));
        
    }
};

let ball = new Ball(50, innerHeight - 20);
ball.draw();
addEventListener("keydown", () => {
    switch (event.key) {
        case "ArrowRight": ball.rightarrow = true; break;
        case "ArrowLeft": ball.leftarrow = true; break;
        case "ArrowUp":if(ball.y>=innerHeight-ball.radius) ball.jump(); 
    }
});
  ball.operate();

addEventListener("keyup", () => {
    switch (event.key) {
        case "ArrowRight": ball.rightarrow = false; ball.velocityin_x=0.1;break;
        case "ArrowLeft": ball.leftarrow = false;  ball.velocityin_x=0.1;break;
    
    }
}

);




