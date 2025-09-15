// ---------------------------
// Taskbar Clock
// ---------------------------
function updateClock() {
  const clock = document.getElementById('taskbar-clock');
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// ---------------------------
// Start Menu Toggle
// ---------------------------
const startBtn = document.getElementById('start-btn');
const startMenu = document.getElementById('start-menu');
startBtn.onclick = () => {
  startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
};

// ---------------------------
// Desktop Icons & Start Menu Items
// ---------------------------
const icons = document.querySelectorAll('.icon');
const menuItems = document.querySelectorAll('#start-menu .menu-item');

function openWindow(id) {
  const win = document.getElementById(id);
  if(win) win.style.display = 'block';
}

icons.forEach(icon => {
  icon.onclick = () => {
    openWindow(icon.dataset.window);
  };
});

menuItems.forEach(item => {
  item.onclick = () => {
    openWindow(item.dataset.window);
  };
});

// ---------------------------
// Close Buttons
// ---------------------------
const closeBtns = document.querySelectorAll('.close-btn');
closeBtns.forEach(btn => {
  btn.onclick = () => {
    btn.closest('.window').style.display = 'none';
  };
});

// ---------------------------
// Dragging Windows
// ---------------------------
let drag = null;
let offsetX = 0;
let offsetY = 0;

document.querySelectorAll('.title-bar').forEach(bar => {
  bar.onmousedown = function(e) {
    drag = bar.parentElement;
    offsetX = e.clientX - drag.offsetLeft;
    offsetY = e.clientY - drag.offsetTop;
  };
});

document.onmouseup = () => drag = null;

document.onmousemove = function(e) {
  if(drag) {
    drag.style.left = (e.clientX - offsetX) + 'px';
    drag.style.top = (e.clientY - offsetY) + 'px';
  }
};

// ---------------------------
// Resizing Windows
// ---------------------------
document.querySelectorAll('.resize-handle').forEach(handle => {
  handle.onmousedown = function(e) {
    const win = handle.parentElement;
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = win.offsetWidth;
    const startHeight = win.offsetHeight;

    function resize(e) {
      win.style.width = startWidth + (e.clientX - startX) + 'px';
      win.style.height = startHeight + (e.clientY - startY) + 'px';
    }

    function stopResize() {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    }

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
  };
});

// ---------------------------
// Slots App
// ---------------------------
document.querySelectorAll('.slot').forEach(slot => {
  slot.onclick = () => {
    document.getElementById('slot-info').textContent = slot.dataset.info;
  };
});

// ---------------------------
// Calculator App
// ---------------------------
const calcButtonsContainer = document.getElementById('calc-buttons');
const calcDisplay = document.getElementById('calc-display');
const calcButtons = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'];

calcButtons.forEach(b => {
  const btn = document.createElement('button');
  btn.textContent = b;
  calcButtonsContainer.appendChild(btn);
  btn.onclick = () => {
    if(b === '=') {
      try { calcDisplay.value = eval(calcDisplay.value); } catch { calcDisplay.value = 'Error'; }
    } else if(b === 'C') { calcDisplay.value = ''; }
    else { calcDisplay.value += b; }
  };
});

// ---------------------------
// Chatroom App
// ---------------------------
const chatInput = document.getElementById('chat-input');
const chatContent = document.getElementById('chat-content');

chatInput.addEventListener('keypress', function(e){
  if(e.key === 'Enter' && chatInput.value.trim() !== '') {
    const msg = chatInput.value.trim();
    chatContent.innerHTML += `<p><b>You:</b> ${msg}</p>`;
    chatInput.value = '';
    chatContent.scrollTop = chatContent.scrollHeight;
  }
});

// ---------------------------
// Terminal App
// ---------------------------
const termInput = document.getElementById('terminal-input');
const termOutput = document.getElementById('terminal-output');

termInput.addEventListener('keypress', function(e){
  if(e.key === 'Enter') {
    const cmd = termInput.value.trim();
    termOutput.innerHTML += `<p>&gt; ${cmd}</p>`;
    if(cmd.toLowerCase() === 'help') termOutput.innerHTML += `<p>Commands: help, clear</p>`;
    if(cmd.toLowerCase() === 'clear') termOutput.innerHTML = '';
    termInput.value = '';
    termOutput.scrollTop = termOutput.scrollHeight;
  }
});

// ---------------------------
// Browser & YouTube Apps
// ---------------------------
function openExternalApp(url, title) {
  const win = document.createElement('div');
  win.className = 'window';
  win.style.width = '400px';
  win.style.height = '300px';
  win.style.top = '50px';
  win.style.left = '50px';
  win.style.display = 'block';
  win.innerHTML = `
    <div class="title-bar"><span>${title}</span><span class="close-btn">✖</span></div>
    <div class="window-content">
      <p>Click button to open: <button id="open-link">Open ${title}</button></p>
    </div>
    <div class="resize-handle"></div>
  `;
  document.getElementById('desktop').appendChild(win);

  win.querySelector('.close-btn').onclick = () => win.remove();
  win.querySelector('#open-link').onclick = () => window.open(url, '_blank');

  // Make draggable
  const bar = win.querySelector('.title-bar');
  bar.onmousedown = function(e) {
    drag = win;
    offsetX = e.clientX - drag.offsetLeft;
    offsetY = e.clientY - drag.offsetTop;
  };
}

document.getElementById('browser-window').onclick = () => openExternalApp('https://www.google.com','Browser');
document.getElementById('youtube-window').onclick = () => openExternalApp('https://www.youtube.com','YouTube');

// ---------------------------
// Desktop Selection Box
// ---------------------------
const desktop = document.getElementById('desktop');
const selectionBox = document.getElementById('selection-box');
let selecting = false;
let startX, startY;

desktop.addEventListener('mousedown', function(e) {
  if(e.target.classList.contains('window') || e.target.classList.contains('icon')) return;
  selecting = true;
  startX = e.clientX;
  startY = e.clientY;
  selectionBox.style.left = startX + 'px';
  selectionBox.style.top = startY + 'px';
  selectionBox.style.width = '0px';
  selectionBox.style.height = '0px';
  selectionBox.style.display = 'block';
});

desktop.addEventListener('mousemove', function(e) {
  if(!selecting) return;
  const x = Math.min(e.clientX, startX);
  const y = Math.min(e.clientY, startY);
  const w = Math.abs(e.clientX - startX);
  const h = Math.abs(e.clientY - startY);
  selectionBox.style.left = x + 'px';
  selectionBox.style.top = y + 'px';
  selectionBox.style.width = w + 'px';
  selectionBox.style.height = h + 'px';
});

desktop.addEventListener('mouseup', function() {
  selecting = false;
  selectionBox.style.display = 'none';
});
