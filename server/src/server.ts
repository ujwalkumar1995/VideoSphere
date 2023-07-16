import express, { Express, Request, Response } from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import { v4 as uuuidv4 } from 'uuid';

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;

app.get('/', (_req: Request, res: Response) => {
  res.redirect(`/${uuuidv4()}`);
});

app.get('/:room', (req: Request, res: Response) => {
  res.render('room', { roomId: req.params.roomId });
});

io.on('connection', (socket) => {
  socket.on('join-room', () => {
    console.log('Joined Room');
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
