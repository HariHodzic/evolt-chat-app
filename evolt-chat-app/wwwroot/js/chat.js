"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
connection.qs = { 'version': '1.0' };
document.getElementById("sendButton").disabled = true;
var connectedUsers = [];


function addActiveUser(username) {
    var user = document.createElement("li");
    user.className = "nav-link";
    document.getElementById("connectedUsers").appendChild(user);
    user.textContent = `${username}`;
}
function removeActiveUser(username) {
    var items = document.querySelectorAll("#connectedUsers li");
    for (var i = 0; i < items.length; i++) {
        if (items[i].innerHTML === username) {
            items[i].remove();
        }
    }
}

connection.on("ReceiveMessage", function (username, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    var today = new Date();
    var date = today.getHours() + ":" + today.getMinutes();
    li.textContent = `${date}  ${username}: ${message}`;
});

connection.on("UserConnected", function (username) {
    var li = document.createElement("li");
    connectedUsers.push(username);
    addActiveUser(username);
    document.getElementById("messagesList").appendChild(li);
    var today = new Date();
    var date = today.getHours() + ":" + today.getMinutes();
    li.textContent = `${date}  ${username} is now connected`;
});

connection.on("UserDisconnected", async function (username) {
    var user = document.getElementById("userInput").value;
    removeActiveUser(username);
    await connection.invoke("Testiranje", user).catch(function (err) {
        return console.error(err.toString());
    });
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${username} has disconnected`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

function submitMessage() {
    var message = document.getElementById("messageInput").value;
    if (message != "") {
        var user = document.getElementById("userInput").value;
        connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
        });
    }
    document.getElementById("messageInput").value = null;
    event.preventDefault();
}

document.getElementById("sendButton").addEventListener("click", function (event) {
    submitMessage();
});

document.getElementById("messageInput").addEventListener("keydown", function (e) {
    // Enter is pressede
    if (e.keyCode == 13) {
        submitMessage();
    }
});