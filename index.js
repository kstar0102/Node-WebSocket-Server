import { WebSocketServer, WebSocket } from 'ws'

const wss = new WebSocketServer({ port: 8080 });
const clients = new Set();

wss.on('connection', function connection(ws) {
    // Add the new client connection to the set
    clients.add(ws);
    ws.on('message', function message(data) {
        console.log('received : %s', data);
        // Broadcast the received message to all clients
        clients.forEach(function (client) {
            if(client.readyState === WebSocket.OPEN) {
                console.log('broadcast : ', data.toString());
                client.send(data.toString());
            }
        });
    });
    ws.send('connected');
    ws.on('close', function () {
        // Remove the closed client connection from the set
        clients.delete(ws);        
    })
});