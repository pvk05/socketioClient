console.log("socket.js loaded");
var socketStatus = false
document.getElementById("status").innerHTML = socketStatus;
const connectionURL = process.env.CONNECTION_URL || "localhost:3000";
console.log(connectionURL);

const socket = io(connectionURL); // Replace with your server URL

socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
    // Perform any actions after successful connection
    socketStatus = true;
    document.getElementById("status").innerHTML = socketStatus;
});

socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
    // Perform any actions after disconnection
    socketStatus = false;
    document.getElementById("status").innerHTML = socketStatus;
});

// Handle incoming events from the server
socket.on('message', (data) => {
    console.log('Received data:', data);
    // Handle the received data
    document.getElementById("messages").innerHTML += `<li>${data}</li>`;
});

// Emit events to the server
//socket.emit('eventName', { key: 'value' });

document.getElementById("send").addEventListener("click", () => {
    let msg = document.getElementById("messageInp").value;
    socket.emit("message", msg);
});