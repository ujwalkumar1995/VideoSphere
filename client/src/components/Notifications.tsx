import { Button } from '@material-ui/core';
import { SocketContext } from '../contexts/SocketContext';
import { useContext } from 'react';

const Notifications = () => {
  const { answerCall, callAccepted, call } = useContext(SocketContext);
  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>{call.name}</h1>
          <Button variant='contained' color='primary' onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
