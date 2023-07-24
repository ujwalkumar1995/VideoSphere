import React from 'react';
import { createRoot } from 'react-dom/client';
import { RoomProvider } from './contexts/RoomContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VideoGrid from './components/VideoGrid';
import Home from './pages/Home';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <RoomProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/room/:roomId' element={<VideoGrid />} />
      </Routes>
    </RoomProvider>
  </BrowserRouter>,
);
