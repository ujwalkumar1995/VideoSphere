import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { RoomContext } from '../contexts/RoomContext';
import { useContext } from 'react';

const Home = () => {
  // const navigate = useNavigate();
  const { ws } = useContext(RoomContext);

  const startCall = async () => {
    ws.emit('create-room');
    // const response = await fetch('http://localhost:5000/room');
    // const roomId = (await response.json()).id;
    // navigate(`/room/${roomId}`);
  };

  return <Button onClick={startCall}>Start a Call</Button>;
};

export default Home;
