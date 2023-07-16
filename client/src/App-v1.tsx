import VideoGrid from './components/VideoGrid';
import './styles/App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/room/:roomId' element={<VideoGrid />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
