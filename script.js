let zIndexCounter = 1;

// Open/Close Windows
const icons = document.querySelectorAll('.icon');
const windows = document.querySelectorAll('.window');
const closeButtons = document.querySelectorAll('.close-btn');
const taskbarButtonsContainer = document.getElementById('taskbar-buttons');

function updateActiveButton() {
  const windowsArray = Array.from(windows);
  const activeWin = windowsArray.reduce((topWin, win) => {
    return win.style.zIndex > (topWin?.style.zIndex || 0) ? win : topWin;
  }, null);
  
  document.querySelectorAll('.taskbar-btn').forEach(btn => {
    btn.classList.remove('active');
    if(btn.dataset.window === activeWin?.id && activeWin.style.display !== 'none') {
      btn.classList.add('active');
    }
  });
}

function createTaskbarButton(winId, title) {
  let btn = document.createElement('button');
  btn.className = 'taskbar-btn';
  btn.textContent = title;
  btn.dataset.window = winId;
  btn.addEventListener('click', () => {
    const win = document.getElementById(winId);
    if(win.style.display === 'none') {
      win.style.display = 'block';
      win.style.zIndex = ++zIndexCounter;
    } else {
      win.style.display = 'none';
    }
    updateActiveButton();
  });
  taskbarButtonsContainer.appendChild(btn);
}

icons.forEach(icon => {
  icon.addEventListener('click', () => {
    const win = document.getElementById(icon.getAttribute('data-window'));
    win.style.display = 'block';
    win.style.top = '50px';
    win.style.left = '50px';
    win.style.zIndex = ++zIndexCounter;

    if(!document.querySelector(`.taskbar-btn[data-window="${win.id}"]`)) {
      createTaskbarButton(win.id, icon.textContent);
    }
    updateActiveButton();
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const win = btn.parentElement.parentElement;
    win.style.display = 'none';
    updateActiveButton();
  });
});

// Time Slots
const slots = document.querySelectorAll('.slot');
const info = document.getElementById('slot-info');

slots.forEach(slot => {
  slot.addEventListener('click', () => {
    info.textContent = slot.getAttribute('data-info');
  });
});

// Draggable windows
windows.forEach(win => {
  const titleBar = win.querySelector('.title-bar');
  let offsetX = 0, offsetY = 0, isDragging = false;

  titleBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = ++zIndexCounter;
    updateActiveButton();
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      win.style.left = (e.clientX - offsetX) + 'px';
      win.style.top = (e.clientY - offsetY) + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
});

// Start Menu toggle
const startBtn = document.getElementById('start-btn');
const startMenu = document.getElementById('start-menu');

startBtn.addEventListener('click', () => {
  startMenu.style.display = startMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Open window from start menu
const menuItems = document.querySelectorAll('#start-menu .menu-item');
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    const win = document.getElementById(item.getAttribute('data-window'));
    win.style.display = 'block';
    win.style.top = '50px';
    win.style.left = '50px';
    win.style.zIndex = ++zIndexCounter;

    if(!document.querySelector(`.taskbar-btn[data-window="${win.id}"]`)) {
      createTaskbarButton(win.id, win.querySelector('.title-bar span').textContent);
    }

    startMenu.style.display = 'none';
    updateActiveButton();
  });
});

// Clock
function updateClock() {
  const clock = document.getElementById('taskbar-clock');
  const now = new Date();
  const hours = now.getHours().toString().padStart(2,'0');
  const minutes = now.getMinutes().toString().padStart(2,'0');
  const seconds = now.getSeconds().toString().padStart(2,'0');
  clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();
