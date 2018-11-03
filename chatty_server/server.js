// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid= require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


const colours = ['red', 'green', 'blue', 'orange', 'black'];

function randomColour(){
  return colour = colours[Math.floor(Math.random() * colours.length)];
}

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log('number of clients',wss.clients.size);

  // sends a random colour to the new client connection
  ws.send(JSON.stringify({type:'color', color: randomColour()}));

  // sets up callback function to send to all clients
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(data));
      });
  };

  // upon a connection, broadcast to all clients the number of clients currently opened
  wss.broadcast({type:'numberOfUsers', number: wss.clients.size,});

  // when message is received from client, attach unique id and broadcast to all clients
  ws.on('message', (data) => {
    const dataReceived = JSON.parse(data);
    dataReceived.id = uuid();
    wss.broadcast(dataReceived);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  // Resend the number of opened clients to everyone
  ws.on('close', () => {console.log('Client disconnected');
    wss.broadcast({type: 'numberOfUsers', number:wss.clients.size});
    console.log('number of clients',wss.clients.size);
  });
});