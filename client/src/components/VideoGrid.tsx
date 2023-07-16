import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext-v1';
import '../styles/styles.css';

const VideoGrid = () => {
  const { myVideo } = useContext(SocketContext);
  return (
    <div id='video-grid'>
      <video ref={myVideo} autoPlay></video>
    </div>
  );
};

export default VideoGrid;
