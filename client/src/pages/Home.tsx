import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const startCall = async () => {
    const response = await fetch('http://localhost:5000/room');
    const roomId = (await response.json()).id;
    navigate(`/room/${roomId}`);
  };

  return <Button onClick={startCall}>Start a Call</Button>;
};

export default Home;
