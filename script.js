let zIndexCounter = 1;
const windows = document.querySelectorAll('.window');
const closeButtons = document.querySelectorAll('.close-btn');
const icons = document.querySelectorAll('.icon');
const desktop = document.getElementById('desktop');
const selectionBox = document.getElementById('selection-box');
const startBtn = document.getElementById('start-btn');
const startMenu = document.getElementById('start-menu');

// Start menu toggle
startBtn.addEventListener('click', () => {
  startMenu.style.display = startMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Start menu items
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const win = document.getElementById(item.dataset.window);
    if(win){
      win.style.display = 'block';
      win.style.top = '50px';
      win.style.left = '50px';
      bringToFront(win);
      startMenu.style.display = 'none';
    }
  });
});

// Bring window to front
function bringToFront(win) {
  win.style.zIndex = ++zIndexCounter;
}

// Icons open windows
icons.forEach(icon => {
  icon.style.top = Math.floor(Math.random() * (desktop.clientHeight - 80)) + 'px';
  icon.style.left = Math.floor(Math.random() * (desktop.clientWidth - 64)) + 'px';
  icon.addEventListener('click', () => {
    const win = document.getElementById(icon.dataset.window);
    if(win){
      win.style.display = 'block';
      win.style.top = '50px';
      win.style.left = '50px';
      bringToFront(win);
    }
  });
});

// Close buttons
closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const win = btn.closest('.window');
    win.style.display = 'none';
  });
});

// Draggable & Resizable windows
windows.forEach(win => {
  const titleBar = win.querySelector('.title-bar');
  let offsetX = 0, offsetY = 0, isDragging = false;

  titleBar.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    bringToFront(win);
  });

  document.addEventListener('mousemove', e => {
    if(isDragging){
      win.style.left = (e.clientX - offsetX) + 'px';
      win.style.top = (e.clientY - offsetY) + 'px';
    }
  });

  document.addEventListener('mouseup', () => isDragging = false);

  const handle = win.querySelector('.resize-handle');
  let isResizing = false, startX, startY, startWidth, startHeight;

  handle.addEventListener('mousedown', e => {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(getComputedStyle(win).width, 10);
    startHeight = parseInt(getComputedStyle(win).height, 10);
    bringToFront(win);
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if(isResizing){
      win.style.width = (startWidth + e.clientX - startX) + 'px';
      win.style.height = (startHeight + e.clientY - startY) + 'px';
    }
  });

  document.addEventListener('mouseup', () => isResizing = false);
});

// Desktop selection box
let isSelecting = false, startX, startY;
desktop.addEventListener('mousedown', e => {
  if(e.button !== 0 || e.target.closest('.window') || e.target.classList.contains('icon')) return;
  isSelecting = true;
  startX = e.clientX;
  startY = e.clientY;
  selectionBox.style.left = startX + 'px';
  selectionBox.style.top = startY + 'px';
  selectionBox.style.width = '0px';
  selectionBox.style.height = '0px';
  selectionBox.style.display = 'block';
});

desktop.addEventListener('mousemove', e => {
  if(!isSelecting) return;
  const x = Math.min(e.clientX, startX);
  const y = Math.min(e.clientY, startY);
  const width = Math.abs(e.clientX - startX);
  const height = Math.abs(e.clientY - startY);
  selectionBox.style.left = x + 'px';
  selectionBox.style.top = y + 'px';
  selectionBox.style.width = width + 'px';
  selectionBox.style.height = height + 'px';
});

desktop.addEventListener('mouseup', e => {
  if(!isSelecting) return;
  isSelecting = false;
  selectionBox.style.display = 'none';
});

// Clock
function updateClock() {
  const clock = document.getElementById('taskbar-clock');
  const now = new Date();
  const h = now.getHours().toString().padStart(2,'0');
  const m = now.getMinutes().toString().padStart(2,'0');
  const s = now.getSeconds().toString().padStart(2,'0');
  clock.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// Calculator
const calcButtons = [
  '7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'
];
const calcButtonsContainer = document.getElementById('calc-buttons');
const calcDisplay = document.getElementById('calc-display');
calcButtons.forEach(b => {
  const btn = document.createElement('button');
  btn.textContent = b;
  btn.addEventListener('click', () => {
    if(b === '='){
      try { calcDisplay.value = eval(calcDisplay.value); } 
      catch(e){ calcDisplay.value='Error'; }
    } else { calcDisplay.value += b; }
  });
  calcButtonsContainer.appendChild(btn);
});

// Terminal
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
terminalInput.addEventListener('keydown', e => {
  if(e.key === 'Enter'){
    const command = terminalInput.value;
    terminalOutput.innerHTML += `<div>> ${command}</div>`;
    try {
      const result = eval(command);
      terminalOutput.innerHTML += `<div>${result}</div>`;
    } catch(err){
      terminalOutput.innerHTML += `<div style="color:red;">Error: ${err}</div>`;
    }
    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
});

// Time Slots
document.querySelectorAll('.slot').forEach(slot=>{
  slot.addEventListener('click',()=>{
    document.getElementById('slot-info').textContent = slot.dataset.info;
  });
});
