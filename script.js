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

// Start menu item clicks
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
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

// Open windows via icons on single click
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

// Close windows
closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const win = btn.closest('.window');
    win.style.display = 'none';
  });
});

// Draggable & Resizable windows (same as before)
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
