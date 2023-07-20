import { useEffect, useRef, useState } from 'react';
import '../styles/styles.css';
import { io } from 'socket.io-client';
import Peer, { MediaConnection } from 'peerjs';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:5000');

const VideoGrid = () => {
  const myVideo = useRef<any>();
  const anotherUser = useRef<any>();
  const [videoStream, setVideoStream] = useState<any>(undefined);

  const { roomId } = useParams();
  const peer = new Peer('', {
    path: '/peerjs',
    host: '/',
    port: 5000,
  });
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setVideoStream(stream);
      addVideoStream(stream, myVideo);
      peer.on('call', (call: MediaConnection) => {
        call.answer(videoStream);
        call.on('stream', (userVideoStream) => {
          addVideoStream(userVideoStream, anotherUser);
        });
      });
      socket.emit('ready');
      socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream);
      });
    });

    peer.on('open', (id: string) => {
      socket.emit('join-room', roomId, id);
    });
    const connectToNewUser = (userId: string, stream: any) => {
      const call = peer.call(userId, stream);
      call.on('stream', (userVideoStream) => {
        addVideoStream(userVideoStream, anotherUser);
      });
    };

    const addVideoStream = (stream: any, videoRef: any) => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener('loadmetadata', () => {
          videoRef.current.play();
        });
      }
    };
  }, []);

  return (
    <div id='video-grid'>
      <video ref={myVideo} autoPlay></video>
      <video ref={anotherUser} autoPlay></video>
    </div>
  );
};

export default VideoGrid;
