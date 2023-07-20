import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import { v4 as uuuidv4 } from 'uuid';
import { ExpressPeerServer } from 'peer';

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const peerServer = ExpressPeerServer(server);
app.use('/peerjs', peerServer);
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (_req: Request, res: Response) => {
  res.redirect(`/${uuuidv4()}`);
});

app.get('/room', (req: Request, res: Response) => {
  res.json({ id: uuuidv4() });
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId: string, userId: string) => {
    socket.on('ready', () => {
      socket.join(roomId);
      socket.to(roomId).emit('user-connected', userId);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
