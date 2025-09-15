const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const colors = ['#0ff','#f0f','#ff0'];

let mouse = {x:null, y:null};
const cursor = document.getElementById('cursor');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  cursor.style.top = e.y + 'px';
  cursor.style.left = e.x + 'px';
});

class Particle {
  constructor(x,y){
    this.x = x || Math.random()*canvas.width;
    this.y = y || Math.random()*canvas.height;
    this.size = Math.random()*3+1;
    this.speedX = (Math.random()-0.5)*0.5;
    this.speedY = (Math.random()-0.5)*0.5;
    this.color = colors[Math.floor(Math.random()*colors.length)];
    this.life = 100;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
    if(this.x<0||this.x>canvas.width) this.speedX*=-1;
    if(this.y<0||this.y>canvas.height) this.speedY*=-1;
  }
  draw(){
    ctx.globalAlpha = Math.max(this.life/100,0);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
    ctx.globalAlpha =1;
  }
}

function initParticles(num=100){
  particlesArray = [];
  for(let i=0;i<num;i++) particlesArray.push(new Particle());
}

function handleCursorTrails(){
  if(mouse.x && mouse.y){
    for(let i=0;i<2;i++){
      particlesArray.push(new Particle(mouse.x,mouse.y));
    }
  }
  particlesArray = particlesArray.filter(p=>p.life>0);
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  handleCursorTrails();
  particlesArray.forEach(p=>{
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

initParticles();
animate();
