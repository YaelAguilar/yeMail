import { Server as SocketIOServer } from 'socket.io';

interface INotification {
    title: string;
    message: string;
}

export const startSocketIOServer = (server: any) => {
    const io = new SocketIOServer(server);

    io.on('connection', (socket) => {
        socket.on('subscribeToNotifications', (userId: string) => {
            socket.join(userId);
        });

        function sendNotification(userId: string, notification: INotification) {
            io.to(userId).emit('notification', notification);
        }

    });
};
