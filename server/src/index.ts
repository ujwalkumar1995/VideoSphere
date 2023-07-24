import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import http from 'http';
import { roomHandler } from './room/handler';
import { Server } from 'socket.io';
import { v4 as uuuidv4 } from 'uuid';

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/:room', (req: Request, res: Response) => {
  res.json({ id: uuuidv4() });
});

io.on('connection', (socket) => {
  console.log('user is connected');
  socket.on('disconnect', () => {
    console.log('user is disconneted');
  });
  roomHandler(socket);
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
