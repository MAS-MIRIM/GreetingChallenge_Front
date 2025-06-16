import React, { useState } from 'react';
import './css/startPage.css';
import newSoundOnIcon from '/images/start/sound.png';
import newSoundOffIcon from '/images/start/sound_mute.png';
import backgroundPng from '/images/start/start_background.png';
import startPng from '/images/start/Start.png';
import scoreDisplayPng from '/images/start/ScoreDisplay.png';
import { useSoundStore } from '../stores/soundStore';
import RankingModal from '../modals/RankingModal';

interface StartPageProps {
  onNavigate: (path: string) => void;
}

const StartPage: React.FC<StartPageProps> = ({ onNavigate }) => {
  const { muted, toggleMute } = useSoundStore();
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);

  const players = [
    { name: 'Alice', score: '1500' },
    { name: 'Bob', score: '1200' },
    { name: 'Charlie', score: '900' },
  ];

  return (
    <>
      <div className="main-bg">
        <img src={backgroundPng} alt="Background" className="bg-img" />
        <div className="challenge-card">
          <div className="challenge-header">
            <div className="challenge-logo" />
          </div>
          <div className="challenge-actions">
            <ImageButton src={startPng} alt="Start Game" onClick={() => onNavigate('/nickname')} />
            <ImageButton src={scoreDisplayPng} alt="View Scores" onClick={() => setIsRankingModalOpen(true)} />
            <button className="sound-btn" aria-label="Sound" onClick={toggleMute}>
              <img
                src={muted ? newSoundOffIcon : newSoundOnIcon}
                alt={muted ? 'Sound Off' : 'Sound On'}
                className="sound-image"
              />
            </button>
          </div>
        </div>
      </div>

      {isRankingModalOpen && (
        <RankingModal
          players={players}
          onClose={() => setIsRankingModalOpen(false)}
        />
      )}
    </>
  );
};

interface ImageButtonProps {
  src: string;
  alt: string;
  onClick: () => void;
}

const ImageButton: React.FC<ImageButtonProps> = ({ src, alt, onClick }) => (
  <button className="image-button" onClick={onClick}>
    <img src={src} alt={alt} />
  </button>
);

export default StartPage;
