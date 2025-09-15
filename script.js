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
