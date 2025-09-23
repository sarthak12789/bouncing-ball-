let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;


let ball = {
    x: 50,
    y: canvas.height - 20,
    radius: 20,
    dx: 0,
    dy: 0,
    speed: 4,
    gravity: 0.5,
    jumpPower: -15,
    right: false,
    left: false,
    onGround: false
};

let platform = {
    x: 110,
    y: 500,
    width: 150,
    height: 20
};
let platform2 = {
    x: 220,
    y:300,
    width: 100,
    height: 20
}
function drawBall() {
    c.fillStyle = "#e80404ff";
    c.beginPath();
    c.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    c.fill();
    c.closePath();
}

function drawPlatform() {
    c.fillStyle = 'rgba(0, 255, 0, 1)';
    c.fillRect(platform.x, platform.y, platform.width, platform.height);

    c.fillStyle = 'rgba(0, 255, 0, 1)';
    c.fillRect(platform2.x, platform2.y, platform2.width, platform2.height);
}



function animate(){
    drawBall();
    drawPlatform();
    requestAnimationFrame(animate);
}
animate()






