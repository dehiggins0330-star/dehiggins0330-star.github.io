let zIndexCounter = 1; // Track window stacking order

// Open/Close Windows
const icons = document.querySelectorAll('.icon');
const windows = document.querySelectorAll('.window');
const closeButtons = document.querySelectorAll('.close-btn');

icons.forEach(icon => {
  icon.addEventListener('click', () => {
    const win = document.getElementById(icon.getAttribute('data-window'));
    win.style.display = 'block';
    win.style.top = '50px';
    win.style.left = '50px';
    win.style.zIndex = ++zIndexCounter; // Bring to front
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.parentElement.style.display = 'none';
  });
});

// Fun Time Slots
const slots = document.querySelectorAll('.slot');
const info = document.getElementById('slot-info');

slots.forEach(slot => {
  slot.addEventListener('click', () => {
    info.textContent = slot.getAttribute('data-info');
  });
});

// Make windows draggable
windows.forEach(win => {
  const titleBar = win.querySelector('.title-bar');
  let offsetX = 0, offsetY = 0, isDragging = false;

  titleBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = ++zIndexCounter; // Bring to front when dragging
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

// Start menu toggle
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
    startMenu.style.display = 'none'; // close menu
  });
});
