import { useEffect, useRef, useState } from 'react';
import '../styles/styles.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');
const VideoGrid = () => {
  const myVideo = useRef<any>();
  const [videoStream, setVideoStream] = useState<any>(undefined);
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setVideoStream(stream);
      addVideoStream(stream);
    });
  }, []);

  const addVideoStream = (stream: any) => {
    if (myVideo.current) {
      myVideo.current.muted = true;
      myVideo.current.srcObject = stream;
      myVideo.current.addEventListener('loadmetadata', () => {
        myVideo.current.play();
      });
      socket.emit('join-room');
    }
  };

  return (
    <div id='video-grid'>
      <video ref={myVideo} autoPlay></video>
    </div>
  );
};

export default VideoGrid;
