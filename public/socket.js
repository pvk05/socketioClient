console.log("socket.js loaded");
var socketStatus = false
document.getElementById("status").innerHTML = socketStatus;
const connectionURL = "https://socketioserver-dev-mbea.1.ie-1.fl0.io";
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

var username = "user" + Math.floor(Math.random() * 1000);
document.getElementById("username").innerHTML = username;

document.getElementById("setUsername").addEventListener("click", () => {
    username = document.getElementById("usernameInp").value;
    document.getElementById("username").innerHTML = username;
    document.getElementById("usernameInp").value = "";
});

class Message {
    constructor(user, text) {
        this.user = user;
        this.text = text;

    }
}

// Handle incoming events from the server
socket.on('message', (data) => {
    console.log('Received data:', data);
    // Handle the received data
    document.getElementById("messages").innerHTML += `<li><strong>${data.user}</strong>: ${data.text}</li>`;
});

// Emit events to the server
//socket.emit('eventName', { key: 'value' });

document.getElementById("send").addEventListener("click", () => {
    let msgTxt = document.getElementById("messageInp").value;
    let message = new Message(username, msgTxt);
    socket.emit("message", message);
    document.getElementById("messageInp").value = "";
});