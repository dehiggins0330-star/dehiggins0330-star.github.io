// ---------------------------
// Firebase Setup
// ---------------------------
const firebaseConfig = {
    apiKey: "AIzaSyCmOwbTZrGzc0zVRtD7fSasum1Qbdt_h-g",
    authDomain: "consrantsite.firebaseapp.com",
    databaseURL: "https://consrantsite-default-rtdb.firebaseio.com",
    projectId: "consrantsite",
    storageBucket: "consrantsite.firebasestorage.app",
    messagingSenderId: "108690378578",
    appId: "1:108690378578:web:87d2d6d93f439f69c9f48b",
    measurementId: "G-PL5XF14Y3K"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

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

icons.forEach(icon => icon.onclick = () => openWindow(icon.dataset.window));
menuItems.forEach(item => item.onclick = () => openWindow(item.dataset.window));

// ---------------------------
// Close Buttons
// ---------------------------
document.querySelectorAll('.close-btn').forEach(btn =>
  btn.onclick = () => btn.closest('.window').style.display = 'none'
);

// ---------------------------
// Dragging Windows
// ---------------------------
let drag = null, offsetX = 0, offsetY = 0;
document.querySelectorAll('.title-bar').forEach(bar => {
  bar.onmousedown = function(e) {
    drag = bar.parentElement;
    offsetX = e.clientX - drag.offsetLeft;
    offsetY = e.clientY - drag.offsetTop;
  };
});
document.onmouseup = () => drag = null;
document.onmousemove = e => {
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
// Calculator
// ---------------------------
const calcButtonsContainer = document.getElementById('calc-buttons');
const calcDisplay = document.getElementById('calc-display');
const calcButtons = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'];
calcButtons.forEach(b => {
  const btn = document.createElement('button');
  btn.textContent = b;
  calcButtonsContainer.appendChild(btn);
  btn.onclick = () => {
    if(b==='='){try{calcDisplay.value=eval(calcDisplay.value)}catch{calcDisplay.value='Error'}}
    else if(b==='C'){calcDisplay.value=''}else{calcDisplay.value+=b}
  };
});

// ---------------------------
// Terminal
// ---------------------------
const termInput = document.getElementById('terminal-input');
const termOutput = document.getElementById('terminal-output');
termInput.addEventListener('keypress', e=>{
  if(e.key==='Enter'){
    const cmd=termInput.value.trim();
    termOutput.innerHTML+=`<p>&gt; ${cmd}</p>`;
    if(cmd.toLowerCase()==='help') termOutput.innerHTML+=`<p>Commands: help, clear</p>`;
    if(cmd.toLowerCase()==='clear') termOutput.innerHTML='';
    termInput.value='';
    termOutput.scrollTop = termOutput.scrollHeight;
  }
});

// ---------------------------
// Firebase Chat
// ---------------------------
const chatInput = document.getElementById('chat-input');
const chatContent = document.getElementById('chat-content');
const usernameInput = document.getElementById('chat-username');
const roomSelect = document.getElementById('chat-room');
let currentRoom = roomSelect.value;

function listenRoom(room) {
  const roomRef = db.ref('rooms/' + room);
  roomRef.off();
  roomRef.on('child_added', snapshot => {
    const msg = snapshot.val();
    chatContent.innerHTML += `<p><b>${msg.username}:</b> ${msg.text}</p>`;
    chatContent.scrollTop = chatContent.scrollHeight;
  });
}

listenRoom(currentRoom);
roomSelect.addEventListener('change', ()=> {
  currentRoom=roomSelect.value;
  chatContent.innerHTML='';
  listenRoom(currentRoom);
});

chatInput.addEventListener('keydown', function(e){
  if(e.key==='Enter' && chatInput.value.trim()!=='' && usernameInput.value.trim()!==''){
    db.ref('rooms/'+currentRoom).push({
      username: usernameInput.value.trim(),
      text: chatInput.value.trim(),
      timestamp: Date.now()
    });
    chatInput.value='';
    e.preventDefault();
  }
});

// ---------------------------
// Selection Box
// ---------------------------
const desktop = document.getElementById('desktop');
const selectionBox = document.getElementById('selection-box');
let selecting=false, startX, startY;
desktop.addEventListener('mousedown', e=>{
  if(e.target.closest('.window')||e.target.closest('.icon')) return;
  selecting=true;
  startX=e.clientX; startY=e.clientY;
  selectionBox.style.left=startX+'px';
  selectionBox.style.top=startY+'px';
  selectionBox.style.width='0px';
  selectionBox.style.height='0px';
  selectionBox.style.display='block';
});
desktop.addEventListener('mousemove', e=>{
  if(!selecting) return;
  const x=Math.min(e.clientX,startX), y=Math.min(e.clientY,startY);
  const w=Math.abs(e.clientX-startX), h=Math.abs(e.clientY-startY);
  selectionBox.style.left=x+'px'; selectionBox.style.top=y+'px';
  selectionBox.style.width=w+'px'; selectionBox.style.height=h+'px';
});
desktop.addEventListener('mouseup', ()=>{selecting=false; selectionBox.style.display='none';});
