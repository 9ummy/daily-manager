import {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";

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

  const setVideoSrc = (newSrc) => {
    src = newSrc;
  }

  const scheduleState = useSelector((state) => state.schedule);

  useEffect(() => {
    const interVal = setInterval(() => {
      let scheduleInTime = scheduleState.scheduleList.filter((v) => {
        return parseInt(new Date(v.time) / 1000) == parseInt(new Date() / 1000);
      });
      if (scheduleInTime.length > 0) {
        const videoKey = scheduleInTime[0].videoKey;
        const videoResponse = axios.post(`/api/video/${videoKey}`, {
          "token" : JSON.parse(localStorage.getItem('user')).token
        })
          .then((result) => {
            console.log(result.data.videoSrc);
            setVideoSrc(result.data.videoSrc);
          });
      }
    }, 1000);
    return () => clearInterval(interVal);
  }, [scheduleState]);

  return (
    <div className="fixed-bottom">
      <video
        ref={video}
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
