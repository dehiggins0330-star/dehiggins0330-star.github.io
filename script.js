// ---------------------------
// Particle Background
// ---------------------------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const colors = ['#0ff','#f0f','#ff0'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*3 + 1;
    this.speedX = (Math.random()-0.5) * 0.5;
    this.speedY = (Math.random()-0.5) * 0.5;
    this.color = colors[Math.floor(Math.random()*colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x<0||this.x>canvas.width) this.speedX*=-1;
    if(this.y<0||this.y>canvas.height) this.speedY*=-1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function initParticles(num=100){
  particlesArray = [];
  for(let i=0;i<num;i++){
    particlesArray.push(new Particle());
  }
}
initParticles();

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
