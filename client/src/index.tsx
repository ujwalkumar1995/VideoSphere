import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App-v1';
import { ContextProvider } from './contexts/SocketContext-v1';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
);
