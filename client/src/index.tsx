import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App-v1';
import { RoomProvider } from './contexts/RoomContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VideoGrid from './components/VideoGrid';
import Home from './pages/Home';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <RoomProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/room/:roomId' element={<VideoGrid />} />
      </Routes>
    </RoomProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
