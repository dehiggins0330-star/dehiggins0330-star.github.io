const slots = document.querySelectorAll('.slot');
const info = document.getElementById('slot-info');

slots.forEach(slot => {
  slot.addEventListener('click', () => {
    info.textContent = slot.getAttribute('data-info');
  });
});
