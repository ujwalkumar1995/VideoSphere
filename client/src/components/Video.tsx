import { useRef, useEffect } from 'react';

export const Video = ({ stream }: { stream: MediaStream }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);
  return <video muted autoPlay playsInline ref={ref} />;
};
