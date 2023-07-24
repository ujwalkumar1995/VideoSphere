import { Socket } from 'socket.io';
import { v4 as uuuidv4 } from 'uuid';

const rooms: Record<string, string[]> = {};
interface Room {
  roomId: string;
  peerId: string;
}

export const roomHandler = (socket: Socket) => {
  socket.on('join-room', ({ roomId, peerId }) => {
    if (rooms[roomId]) {
      rooms[roomId].push(peerId);
      socket.join(roomId);
      socket.to(roomId).emit('user-joined', { peerId });
      socket.emit('get-users', {
        roomId,
        participants: rooms[roomId],
      });
    }

    socket.on('disconnect', () => {
      leaveRoom({ roomId, peerId });
    });
  });

  const leaveRoom = ({ roomId, peerId }: Room) => {
    rooms[roomId] = rooms[roomId].filter((id: string) => id !== peerId);
    socket.to(roomId).emit('user-disconnected', peerId);
  };

  socket.on('create-room', () => {
    const roomId = uuuidv4();
    rooms[roomId] = [];
    socket.emit('room-created', { roomId });
  });
};
