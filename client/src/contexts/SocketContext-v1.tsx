import { createContext, useState, useRef, useEffect } from 'react';

const SocketContext = createContext<any>(undefined);

const ContextProvider = ({ children }: any) => {
  const myVideo = useRef<any>();
  const [videoStream, setVideoStream] = useState<any>(undefined);
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setVideoStream(stream);
      addVideoStream(stream);
    });
  }, []);

  const addVideoStream = (stream: any) => {
    myVideo.current.muted = true;
    myVideo.current.srcObject = stream;
    myVideo.current.addEventListener('loadmetadata', () => {
      myVideo.current.play();
    });
  };

  return <SocketContext.Provider value={{ myVideo }}>{children}</SocketContext.Provider>;
};

export { ContextProvider, SocketContext };
