import { Server as WebSocketServer } from 'ws';

export const startWebSocketServer = (server: any) => {
    const wss = new WebSocketServer({ server });
    const connections = new Map();

    wss.on('connection', (ws, req) => {
        if (!req.url){
            return;
        }
        const userId = req.url.substring(1);
        connections.set(userId, ws);

        ws.on('message', (message) => {
            const messageString = message.toString();
            const { toUserId, content } = JSON.parse(messageString);
            const receiverWs = connections.get(toUserId);
            if (receiverWs) {
                receiverWs.send(JSON.stringify({ fromUserId: userId, content }));
            }
        });

        ws.on('close', () => {
            connections.delete(userId);
        });
    });
};
