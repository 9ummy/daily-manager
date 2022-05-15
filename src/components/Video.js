import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from 'styles/video.module.css';

function Video() {
  const [isMuted, setIsMuted] = useState(true);
  const [src, setSrc] = useState(
    'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/projectAssets/3d/capture_1920x1080_2022-05-14_10-19-45_0RP9H.mp4',
  );

  const video = useRef();

  const unmuteVideo = () => {
    if (video) {
      video.current.muted = !video.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const scheduleState = useSelector((state) => state.schedule);

  useEffect(() => {
    const interVal = setInterval(() => {
      let scheduleInTime = scheduleState.scheduleList.filter((v) => {
        return parseInt(new Date(v.time) / 1000) == parseInt(new Date() / 1000);
      });
      if (scheduleInTime.length > 0) {
        const videoKey = scheduleInTime[0].videoKey;
        const videoResponse = axios
          .post(`/api/video/${videoKey}`, {
            token: JSON.parse(localStorage.getItem('user')).token,
          })
          .then((result) => {
            console.log(result.data.videoSrc);
            setSrc(result.data.videoSrc);
          });
      }
    }, 1000);
    return () => clearInterval(interVal);
  }, [scheduleState]);

  return (
    <div className={styles.videoContainer}>
      <button className={styles.videoButton} onClick={unmuteVideo}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
      <video
        className={styles.video}
        ref={video}
        src={src}
        autoPlay
        muted
      ></video>
    </div>
  );
}

export default Video;
