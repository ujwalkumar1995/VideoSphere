import { RoomContext } from '../contexts/RoomContext';
import { useContext } from 'react';

const Home = () => {
  const { socket } = useContext(RoomContext);

  const startCall = async () => {
    socket.emit('create-room');
  };

  return <button onClick={startCall}>Start a Call</button>;
};

export default Home;
