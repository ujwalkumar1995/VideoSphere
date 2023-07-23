import { createContext, useState } from 'react';
import SocketIO from 'socket.io-client';
import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import { peersReducer } from '../reducers/peerReducers';
import { addPeerAction, removePeerAction } from '../reducers/peerActions';

const serverURL = 'http://localhost:5000';
export const RoomContext = createContext<null | any>(null);
const ws = SocketIO(serverURL);

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
        console.log('PEER', peer);
        setMe(peer);
        setStream(stream);
      });
    } catch (error) {
      console.log(error);
    }
    ws.on('room-created', ({ roomId }) => {
      navigate(`/room/${roomId}`);
    });
    ws.on('get-users', ({ participants }) => {
      console.log('Participants', participants);
    });
    ws.on('user-disconnected', (peerId) => {
      dispatch(removePeerAction(peerId));
    });
  }, []);

  useEffect(() => {
    if (!me || !stream) {
      return;
    }
    ws.on('user-joined', ({ peerId }) => {
      const call = me.call(peerId, stream);
      console.log('called', call);
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

  console.log({ peers });

  return <RoomContext.Provider value={{ ws, me, stream, peers }}>{children}</RoomContext.Provider>;
};
