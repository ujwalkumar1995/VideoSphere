import { useRef, useEffect } from 'react';

export const Video = ({ stream, muted }: { stream: MediaStream, muted: boolean }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);
  return <video autoPlay muted={muted} playsInline ref={ref} />;
};
