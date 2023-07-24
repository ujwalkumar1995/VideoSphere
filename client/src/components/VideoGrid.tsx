import { useEffect } from 'react';
import '../styles/styles.css';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { RoomContext } from '../contexts/RoomContext';
import { Video } from './Video';
import { PeerState } from '../reducers/peerReducers';
import { FaComment, FaMicrophone, FaShieldAlt, FaUserFriends, FaVideo } from 'react-icons/fa';

const VideoGrid = () => {
  const { socket, me, stream, peers } = useContext(RoomContext);
  const { roomId } = useParams();
  useEffect(() => {
    if (me) {
      socket.emit('join-room', { roomId, peerId: me._id });
    }
  }, [roomId, me, socket]);
  return (
    <div className='main'>
      <div className='main-left'>
        <div className='main-videos'>
          <div id='video-grid'></div>
          <Video stream={stream} muted={true}></Video>
          {Object.values(peers as PeerState).map((peer: { stream: MediaStream }, index: number) => {
            return <Video key={index} muted={false} stream={peer.stream}></Video>;
          })}
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
        <div className='main__message_container'>
          <input id='chat_message' type='text' placeholder='Type message here...' />
        </div>
      </div>
    </div>
  );
};

export default VideoGrid;
