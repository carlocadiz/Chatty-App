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

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log('number of clients',wss.clients.size)

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(data));
      });

  };

  wss.broadcast({number:wss.clients.size});

  // Broadcast to everyone else.
  ws.on('message', (data) => {
    const dataReceived = JSON.parse(data);
    let dataSend = {};
    //console.log('server',dataReceived.type)

    switch(dataReceived.type) {
      case "postMessage":
        // handle incoming message
        dataSend = {type: 'incomingMessage', id: uuid(), username: dataReceived.username, content: dataReceived.content}
        console.log(`User ${dataReceived.username} said ${dataReceived.content}`);
        break;
      case "postNotification":
        // handle incoming notification
        dataSend = {type: 'incomingNotification', id: uuid(), content: dataReceived.content};
        console.log(dataReceived.content);
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + dataReceived.type);
    }
    wss.broadcast(dataSend);

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {console.log('Client disconnected');
    wss.broadcast({number:wss.clients.size});
    console.log('number of clients',wss.clients.size);
  });
});