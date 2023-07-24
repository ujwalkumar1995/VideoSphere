import { createContext, useState } from 'react';
import SocketIO from 'socket.io-client';
import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import { peersReducer } from '../reducers/peerReducers';
import { addPeerAction, removePeerAction } from '../reducers/peerActions';

const serverURL = 'http://localhost:5000';
export const RoomContext = createContext<any>(null);
const socket = SocketIO(serverURL);

export const RoomProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peersReducer, {});
  useEffect(() => {
    const meId = uuidv4();
    try {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        const peer = new Peer(meId, {
          port: 9000,
          host: 'localhost',
          path: '/',
        });
        setMe(peer);
        setStream(stream);
      });
    } catch (error) {
      console.log(error);
    }
    socket.on('room-created', ({ roomId }) => {
      navigate(`/room/${roomId}`);
    });
    socket.on('get-users', ({ participants }) => {
      console.log('Participants', participants);
    });
    socket.on('user-disconnected', (peerId) => {
      dispatch(removePeerAction(peerId));
    });
  }, []);

  useEffect(() => {
    if (!me || !stream) {
      return;
    }
    socket.on('user-joined', ({ peerId }) => {
      const call = me.call(peerId, stream);
      call.on('stream', (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream));
      });
    });

    me.on('call', (call) => {
      call.answer(stream);
      call.on('stream', (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream]);

  return (
    <RoomContext.Provider value={{ socket, me, stream, peers }}>{children}</RoomContext.Provider>
  );
};
