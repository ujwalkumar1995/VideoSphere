import Peer from 'peerjs';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:5000');
export const peer = new Peer('', {
  path: '/peerjs',
  host: '/',
  port: 5000,
});
