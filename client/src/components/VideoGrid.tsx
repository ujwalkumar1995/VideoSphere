import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext-v1';

const VideoGrid = () => {
  const { myVideo } = useContext(SocketContext);
  console.log(myVideo);
  return <video ref={myVideo} autoPlay></video>;
};

export default VideoGrid;
