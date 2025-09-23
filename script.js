let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight
console.log(ctx);
const Canvas_Width = canvas.width = 600;
const Canvas_Height = canvas.Height = 600;

let gamespeed = 2;
const backgroundImage1 = new Image();
backgroundImage1.src = "layer-1.png"
const backgroundImage4 = new Image();
backgroundImage4.src = "layer-5.png"
 let bx = 0;
 let bbx = 2400;

let player = {
  x: 100,
  y: 400,
  radius: 20,
  dx: 0,
  dy: 0,
  gravity: 0.5,
  jumppower: -10,
  onground: false
};
let groundheight = 80;
let platforms = [
  { x: 250, y: 450, width: 120, height: 20, dx: -1 },
  { x: 400, y: 320, width: 100, height: 20, dx: 0 },
  { x: 100, y: 200, width: 150, height: 20, dx: 1 }
]
let keys = {};
window.addEventListener("keydown", e => keys[e.code] = true);
window.addEventListener("keyup", e => keys[e.code] = false);

function drawGround() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, Canvas_Height - groundHeight, Canvas_Width, groundHeight);
}
function drawPlatforms() {
  ctx.fillStyle = "brown";
  platforms.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));
}
function updatePlatforms() {
  platforms.forEach(p => {
    p.x += p.dx;
    if (p.x + p.width < 0) p.x = Canvas_Width;
    if (p.x > Canvas_Width) p.x = -p.width;
  });
}
function updatePlayer() {
 
  if (keys["ArrowLeft"]) player.dx = -player.speed;
  else if (keys["ArrowRight"]) player.dx = player.speed;
  else player.dx = 0;

  if (keys["Space"] && player.onGround) {
    player.dy = player.jumpPower;
    player.onGround = false;
  }

player.dy += player.gravity;
  player.x += player.dx;
  player.y += player.dy;

 
  if (player.x - player.radius < 0) player.x = player.radius;
  if (player.x + player.radius > Canvas_Width) player.x = Canvas_Width - player.radius;

  
  if (player.y + player.radius > Canvas_Height - groundHeight) {
    player.y = Canvas_Height - groundHeight - player.radius;
    player.dy = 0;
    player.onGround = true;
  }

 
  platforms.forEach(p => {
    if (
      player.y + player.radius >= p.y &&
      player.y + player.radius <= p.y + p.height &&
      player.x >= p.x &&
      player.x <= p.x + p.width &&
      player.dy >= 0
    ) {
      player.y = p.y - player.radius;
      player.dy = 0;
      player.onGround = true;
      player.x += p.dx;
    }
  });
}

function drawPlayer() {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function animate(){
    ctx.clearRect(0,0,Canvas_Width,Canvas_Height);
    ctx.drawImage(backgroundImage1,bx,0);
    ctx.drawImage(backgroundImage4,bx,0);
    ctx.drawImage(backgroundImage1,bbx,0);
    ctx.drawImage(backgroundImage4,bbx,0);
    if(bx < -2400) bx = 2400 + bbx - gamespeed;
    else  bx -= gamespeed;
    if(bbx <-2400) bbx = 2400 + bx - gamespeed;
    else bbx -= gamespeed;
    drawGround();
    updatePlatforms();
    drawPlatforms()
   drawPlayer();
    requestAnimationFrame(animate)
}
animate();

