import { useEffect, useRef, useState } from 'react';
import '../styles/styles.css';
import { io } from 'socket.io-client';
import Peer, { MediaConnection } from 'peerjs';
import { useParams } from 'react-router-dom';
import { FaComment, FaMicrophone, FaShieldAlt, FaUserFriends, FaVideo } from 'react-icons/fa';

const socket = io('http://localhost:5000');

const VideoGrid = () => {
  const myVideo = useRef<any>();
  const anotherUser = useRef<any>();
  const [videoStream, setVideoStream] = useState<any>(undefined);
  const [message, setMessage] = useState<string>('');
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

  const sendMessage = (event: any) => {
    if (event.which == 13 && message.trim().length != 0) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  socket.on('createMessage', (message) => {
    console.log('server', message);
  });

  return (
    <>
      <div className='main'>
        <div className='main-left'>
          <div className='main-videos'>
            <div id='video-grid'>
              <video ref={myVideo} autoPlay></video>
              <video ref={anotherUser} autoPlay></video>
            </div>
          </div>
          <div className='main-controls'>
            <div className='main-controls-block'>
              <div className='main-controls-button'>
                <span>Mute</span>
                <FaMicrophone />
              </div>
              <div className='main-controls-button'>
                <span>Stop Video</span>
                <FaVideo />
              </div>
            </div>
            <div className='main-controls-block'>
              <div className='main-controls-button'>
                <span>Security</span>
                <FaShieldAlt />
              </div>
              <div className='main-controls-button'>
                <span>Participant</span>
                <FaUserFriends />
              </div>
              <div className='main-controls-button'>
                <span>Chat</span>
                <FaComment />
              </div>
            </div>
            <div className='main-controls-block'>
              <div className='main-controls-button'>
                <span className='leave-meeting'>Leave Meeting</span>
              </div>
            </div>
          </div>
        </div>
        <div className='main-right'>
          <div className='main-header'>
            <h6>Chat</h6>
          </div>
          <div className='main-chat-window'>
            <ul className='messages'></ul>
          </div>
          <div className='main-message-container'>
            <input
              id='chat_message'
              placeholder='Type message here...'
              type='text'
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={sendMessage}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoGrid;
