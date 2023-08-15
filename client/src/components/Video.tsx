import { useRef, useEffect } from 'react';
import '../styles/styles.css';

export const Video = ({
  stream,
  muted,
  className,
}: {
  stream: MediaStream;
  muted: boolean;
  className: string;
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);
  return <video className={className} autoPlay muted={muted} playsInline ref={ref} />;
};
