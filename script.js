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
// Chatroom
// ---------------------------
const chatInput = document.getElementById('chat-input');
const chatContent = document.getElementById('chat-content');
const usernameInput = document.getElementById('chat-username');
const roomSelect = document.getElementById('chat-room');

let currentRoom = roomSelect.value;

// Listen for new messages
function listenRoom(room) {
    const roomRef = db.ref('rooms/' + room);
    roomRef.off(); // remove previous listeners
    roomRef.on('child_added', snapshot => {
        const msg = snapshot.val();
        chatContent.innerHTML += `<p><b>${msg.username}:</b> ${msg.text}</p>`;
        chatContent.scrollTop = chatContent.scrollHeight;
    });
}

listenRoom(currentRoom);

// Change room
roomSelect.addEventListener('change', () => {
    currentRoom = roomSelect.value;
    chatContent.innerHTML = '';
    listenRoom(currentRoom);
});

// Send messages
chatInput.addEventListener('keydown', function(e){
    if(e.key === 'Enter' && chatInput.value.trim() !== '' && usernameInput.value.trim() !== '') {
        const msg = {
            username: usernameInput.value.trim(),
            text: chatInput.value.trim(),
            timestamp: Date.now()
        };
        db.ref('rooms/' + currentRoom).push(msg);
        chatInput.value = '';
        e.preventDefault();
    }
});
