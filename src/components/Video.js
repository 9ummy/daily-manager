import { useRef, useState } from 'react';

function Video({
  src = 'https://ai-platform-public.s3.ap-northeast-2.amazonaws.com/ysy_2_f0d555e2f5836ba8ac874450f35f03d6.mp4',
  width = 500,
  height = 500,
}) {
  const [isMuted, setIsMuted] = useState(true);
  const video = useRef();

  const unmuteVideo = () => {
    if (video) {
      video.current.muted = !video.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div>
      <video
        ref={video}
        loop
        autoPlay
        muted
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <source src={src} />
      </video>
      <button onClick={unmuteVideo}>{isMuted ? 'Unmute' : 'Mute'}</button>
    </div>
  );
}

export default Video;
