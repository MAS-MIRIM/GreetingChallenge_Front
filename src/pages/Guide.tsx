import React, { useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import './css/Guide.css';

import lookCameraIcon from '/images/guide/look_camera.png';
import toTeacherIcon from '/images/guide/to_teacher.png';
import dontFriendIcon from '/images/guide/dont_friend.png';

interface GuideProps {
  onNavigate: (path: string) => void;
}

const guideImages = [
  { src: lookCameraIcon, alt: 'Camera Icon' },
  { src: toTeacherIcon, alt: 'Greeting Icon' },
  { src: dontFriendIcon, alt: 'Warning Icon' },
];

const Guide: React.FC<GuideProps> = ({ onNavigate }) => { 
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');
  const [isExiting, setIsExiting] = useState(false);
  const [showSkipText, setShowSkipText] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasWebcam, setHasWebcam] = useState(true);

  const handleFinish = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setFadeState('fade-out');
    setTimeout(() => {
      onNavigate('/firstFloor');
    }, 550);
  }, [isExiting, onNavigate]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setHasWebcam(true))
      .catch(() => setHasWebcam(false));
  }, []);

  useEffect(() => {
    const showTextTimer = setTimeout(() => setShowSkipText(true), 1000);
    return () => clearTimeout(showTextTimer);
  }, []);

  useEffect(() => {
    if (isExiting) return;

    if (currentIndex < guideImages.length - 1) {
      const interval = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(interval);
    } else {
      const finalTimeout = setTimeout(handleFinish, 3000);
      return () => clearTimeout(finalTimeout);
    }
  }, [currentIndex, isExiting, handleFinish]);

  return (
    <div className={`guide-container ${fadeState}`} onClick={handleFinish}>
      <div className="guide-image-row">
        {currentIndex === 0 ? (
          <>
            <img
              src={guideImages[0].src}
              alt={guideImages[0].alt}
              className="guide-main-img"
            />
            {hasWebcam && (
              <div className="webcam-wrapper">
                <Webcam
                  audio={false}
                  screenshotFormat="image/jpeg"
                  className="webcam-feed"
                />
              </div>
            )}
          </>
        ) : (
          <img
            src={guideImages[currentIndex].src}
            alt={guideImages[currentIndex].alt}
            className="guide-main-img"
          />
        )}
      </div>
      {showSkipText && <div className="skip-text">좌클릭 시 스킵</div>}
    </div>
  );
};

export default Guide;
