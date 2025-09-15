const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const colors = ['#0ff','#f0f','#ff0'];
let mouse = {x:null,y:null};
const cursor = document.getElementById('cursor');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize & particle init
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

window.addEventListener('mousemove',(e)=>{
  mouse.x = e.x;
  mouse.y = e.y;
  cursor.style.top = e.y + 'px';
  cursor.style.left = e.x + 'px';
});

// Particle class
class Particle{
  constructor(x,y){
    this.x = x||Math.random()*canvas.width;
    this.y = y||Math.random()*canvas.height;
    this.size = Math.random()*3+1;
    this.speedX=(Math.random()-0.5)*0.5;
    this.speedY=(Math.random()-0.5)*0.5;
    this.color = colors[Math.floor(Math.random()*colors.length)];
    this.life=100;
  }
  update(){
    this.x += this.speedX; this.y += this.speedY; this.life--;
    if(this.x<0||this.x>canvas.width) this.speedX*=-1;
    if(this.y<0||this.y>canvas.height) this.speedY*=-1;
  }
  draw(){
    ctx.globalAlpha = Math.max(this.life/100,0);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
    ctx.globalAlpha=1;
  }
}

function initParticles(num=100){
  particlesArray=[];
  for(let i=0;i<num;i++) particlesArray.push(new Particle());
}

function handleCursorTrails(){
  if(mouse.x && mouse.y){
    for(let i=0;i<2;i++) particlesArray.push(new Particle(mouse.x,mouse.y));
  }
  particlesArray = particlesArray.filter(p=>p.life>0);
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  handleCursorTrails();
  particlesArray.forEach(p=>{p.update();p.draw();});
  drawNeonLines();
  requestAnimationFrame(animate);
}

initParticles();
animate();

// -------------------
// Ripple effect
// -------------------
document.addEventListener('click', e=>{
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = e.pageX -10 +'px';
  ripple.style.top = e.pageY -10 +'px';
  document.body.appendChild(ripple);
  setTimeout(()=>ripple.remove(),600);
});

// -------------------
// Neon lines between project cards
// -------------------
function drawNeonLines(){
  const cards = document.querySelectorAll('.card');
  for(let i=0;i<cards.length;i++){
    for(let j=i+1;j<cards.length;j++){
      const rect1 = cards[i].getBoundingClientRect();
      const rect2 = cards[j].getBoundingClientRect();
      const x1 = rect1.left+rect1.width/2;
      const y1 = rect1.top+rect1.height/2;
      const x2 = rect2.left+rect2.width/2;
      const y2 = rect2.top+rect2.height/2;
      ctx.strokeStyle = 'rgba(0,255,255,0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1,y1);
      ctx.lineTo(x2,y2);
      ctx.stroke();
    }
  }
}
