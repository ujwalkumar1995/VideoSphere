import './styles/App.css';
import { Typography, AppBar } from '@mui/material';

const App = () => {
  return (
    <div className='App' id='root'>
      <AppBar position='static' color='inherit'>
        <Typography variant='h2' align='center'>
          VideoSphere
        </Typography>
      </AppBar>
    </div>
  );
};

export default App;
