import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from '../src/interfaces/rest/UserRoutes'
import emailRoutes from '../src/interfaces/rest/EmailRoutes'
import { errorHandler } from '../src/middleware/errorHandler';
import { startWebSocketServer } from './infrastructure/websocket/WebSocketServer';
import { startSocketIOServer } from './infrastructure/socketio/SocketIOServer';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const dbUri = process.env.DB_URI;
if(!dbUri){
    console.error('La variable DB_URI no está definida en .env');
    process.exit(1);
}

mongoose.connect(dbUri)
    .then(() => console.log('Conectado a la DB'))
    .catch(err => console.error('Error al conectar a la DB', err));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/emails', emailRoutes);
// Middleware de manejo de errores
app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Iniciar servidores WebSocket y Socket.io
startWebSocketServer(server);
startSocketIOServer(server);
