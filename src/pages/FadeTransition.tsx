import './css/FadeTransition.css'

import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage';
import Nickname from './Nickname';
import FirstFloor from './FirstFloor'
import SecondFloor from './SecondFloor';
import ThirdFloor from './ThirdFloor';
import FourthFloor from './FourthFloor';
import Guide from './Guide';
import backgroundMusic from '/music/background_music.mp3';
import { useSoundStore } from '../stores/soundStore';

export const FadeTransition: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [nextPath, setNextPath] = useState<string | null>(null);

  const { muted } = useSoundStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = muted;
      audio.play().catch(() => {});
    }
  }, [muted]);

  const handleFadeNavigate = (path: string) => {
    if (path === location.pathname) return;
    setFadeClass('fade-out');
    setNextPath(path);
  };

  useEffect(() => {
    if (fadeClass === 'fade-out' && nextPath) {
      const timeout = setTimeout(() => {
        navigate(nextPath);
        setFadeClass('fade-in');
        setNextPath(null);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [fadeClass, nextPath, navigate]);

  useEffect(() => {
    setFadeClass('fade-in');
  }, [location.pathname]);

  return (
    <>
      <audio ref={audioRef} src={backgroundMusic} loop autoPlay />
      <div className={fadeClass}>
        <Routes location={location}>
          <Route path="/" element={<StartPage onNavigate={handleFadeNavigate} />} />
          <Route path="/nickname" element={<Nickname onNavigate={handleFadeNavigate} />} />
          <Route path="/guide" element={<Guide onNavigate={handleFadeNavigate} />} />
          <Route path="/firstFloor" element={<FirstFloor onNavigate={handleFadeNavigate} />} />
          <Route path="/secondFloor" element={<SecondFloor onNavigate={handleFadeNavigate}/>} />
          <Route path="/thirdFloor" element={<ThirdFloor onNavigate={handleFadeNavigate}/>} />
          <Route path="/fourthFloor" element={<FourthFloor onNavigate={handleFadeNavigate}/>} />

        </Routes>
      </div>
    </>
  );
};
