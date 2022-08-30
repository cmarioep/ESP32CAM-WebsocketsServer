const express = require('express');
const WebSocket = require('ws');

const httpServer = express();
const HTTP_PORT = process.env.PORT || 3000;
const WS_PORT = 8888;


httpServer.listen(HTTP_PORT, () => {
    console.log(`HTTP server listening at ${HTTP_PORT}`);
}
);

httpServer.get('/', (req, res) => {
    res.send('Hello World!');
  });

const wsServer = new WebSocket.Server({ port: WS_PORT }, () => {
    console.log(`WebSocket Server is listening at ${WS_PORT}`)
}
);


let connectedClients = [];

wsServer.on('connection', (ws, req) => {
    console.log('Connected');
    connectedClients.push(ws);

    ws.on('message', data => {
        connectedClients.forEach((ws, i) => {
            if (ws.readyState === ws.OPEN) {
                ws.send(data);
            } else {
                connectedClients.splice(i, 1);
            }
        })
    });

});

