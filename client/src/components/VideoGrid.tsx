import { useEffect } from 'react';
import '../styles/styles.css';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { RoomContext } from '../contexts/RoomContext';
import { Video } from './Video';

const VideoGrid = () => {
  const { ws, me, stream, peers } = useContext(RoomContext);
  console.log('PEERS',peers);
  const { roomId } = useParams();
  useEffect(() => {
    if (me) {
      ws.emit('join-room', { roomId, peerId: me._id });
    }
  }, [roomId, me, ws]);
  return (
    <>
      <Video stream={stream}></Video>
      {Object.values(peers).map((peer: any, index: number) => {
        return <Video key={index} stream={peer.stream}></Video>;
      })}
    </>
  );
};

export default VideoGrid;
