// Ensure window fits screen after open or drag
function fitWindowToScreen(win) {
  const rect = win.getBoundingClientRect();
  const maxWidth = window.innerWidth - 20;
  const maxHeight = window.innerHeight - 50; // leave space for taskbar
  if(rect.right > window.innerWidth) win.style.left = (window.innerWidth - rect.width - 10) + 'px';
  if(rect.bottom > window.innerHeight - 30) win.style.top = (window.innerHeight - rect.height - 40) + 'px';
}

// Call fitWindowToScreen after opening a window
icons.forEach(icon => {
  icon.addEventListener('click', () => {
    const win = document.getElementById(icon.dataset.window);
    if(win){
      win.style.display = 'block';
      win.style.top = '50px';
      win.style.left = '50px';
      bringToFront(win);
      fitWindowToScreen(win);
    }
  });
});

document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const win = document.getElementById(item.dataset.window);
    if(win){
      win.style.display = 'block';
      win.style.top = '50px';
      win.style.left = '50px';
      bringToFront(win);
      fitWindowToScreen(win);
      startMenu.style.display = 'none';
    }
  });
});
