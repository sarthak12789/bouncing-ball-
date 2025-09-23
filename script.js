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
  
};

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
    
   drawPlayer();
    requestAnimationFrame(animate)
}
animate();