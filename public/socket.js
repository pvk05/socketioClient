// Define the socket status
var socketStatus = false
document.getElementById("status").innerHTML = socketStatus;

// Define the connection URL
const connectionURL = "https://socketioserver-dev-mbea.1.ie-1.fl0.io";
console.log(connectionURL);

// Connect to the Socket.IO server
const socket = io(connectionURL, { autoConnect: false }); // Replace with your server URL

// DEV STUFF
socket.onAny((event, ...args) => {
    console.log(event, args);
});
// END DEV STUFF

// Handle socket connect event
socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
    // Perform any actions after successful connection
    socketStatus = "Connected";
    document.getElementById("status").innerHTML = socketStatus;
});

// Handle socket disconnect event
socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
    // Perform any actions after disconnection
    socketStatus = "Disconnected";
    document.getElementById("status").innerHTML = socketStatus;
});

var username;

// Set username
document.getElementById("setUsername").addEventListener("click", () => {
    username = document.getElementById("usernameInp").value;
    document.getElementById("username").innerHTML = username;
    document.getElementById("usernameInp").value = "";
    socket.connect();
    document.getElementById("usernameDiv").style.display = "none";
    document.getElementById("chatDiv").style.display = "block";
});

// Define a class to represent a message
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

// Send a message to the server
document.getElementById("send").addEventListener("click", () => {
    let msgTxt = document.getElementById("messageInp").value; 
    let message = new Message(username, msgTxt);
    socket.emit("message", message);
    document.getElementById("messageInp").value = "";
});