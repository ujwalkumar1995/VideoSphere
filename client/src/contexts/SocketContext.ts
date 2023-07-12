import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { createContext, useState, useRef, useEffect } from 'react';

const SocketContext = createContext({});

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }: any) => {
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [me, setMe] = useState<string>('');
  const [call, setCall] = useState<any>({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const myVideo = useRef<any>();
  const userVideo = useRef<any>();
  const connectionRef = useRef<any>();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      if (myVideo.current) {
        myVideo.current.srcObject = currentStream;
      }
    });

    socket.on('me', (id) => setMe(id));
    socket.on('calluser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = (): void => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on('signal', (data) => {
      socket.emit('answercall', { signal: data, to: call.from });
    });
    peer.on('stream', (currentStream) => {
      if (userVideo && userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });
    peer.signal(call.signal);

    connectionRef.current = peer;
  };
};
