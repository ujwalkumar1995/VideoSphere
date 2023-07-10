import express, { Express, Request, Response } from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

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

app.get('/', (_req: Request, res: Response) => {
  res.send('Server is running');
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
