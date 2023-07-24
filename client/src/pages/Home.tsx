import { Button } from '@material-ui/core';
import { RoomContext } from '../contexts/RoomContext';
import { useContext } from 'react';

const Home = () => {
  const { socket } = useContext(RoomContext);

  const startCall = async () => {
    socket.emit('create-room');
  };

  return <Button onClick={startCall}>Start a Call</Button>;
};

export default Home;
