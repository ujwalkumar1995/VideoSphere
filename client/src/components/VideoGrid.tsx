import { useEffect } from 'react';
import '../styles/styles.css';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { RoomContext } from '../contexts/RoomContext';
import { Video } from './Video';

const VideoGrid = () => {
  const { socket, me, stream, peers } = useContext(RoomContext);
  const { roomId } = useParams();
  useEffect(() => {
    if (me) {
      socket.emit('join-room', { roomId, peerId: me._id });
    }
  }, [roomId, me, socket]);
  return (
    <>
      <Video stream={stream} muted={true}></Video>
      {Object.values(peers).map((peer: any, index: number) => {
        return <Video key={index} muted={false} stream={peer.stream}></Video>;
      })}
    </>
  );
};

export default VideoGrid;
