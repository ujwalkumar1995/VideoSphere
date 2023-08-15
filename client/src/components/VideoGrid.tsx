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
    <div className='video-grid-container'>
      <Video className={'video-player'} stream={stream} muted={true}></Video>
      {Object.values(peers as PeerState).map((peer: { stream: MediaStream }, index: number) => {
        return <Video className={'video-player'} key={index} muted={false} stream={peer.stream}></Video>;
      })}
    </div>
  );
};

export default VideoGrid;
