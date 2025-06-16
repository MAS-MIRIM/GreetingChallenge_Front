import React from 'react';
import eraserIcon from '/images/status/eraser.png';
import muteIcon from '/images/status/mute.png';
import mutedIcon from '/images/status/muted.png';
import { useSoundStore } from '../stores/soundStore';

const ScoreComponent = () => {
  const { muted, toggleMute } = useSoundStore();

  return (
    <div
      style={{
        position: 'relative',
        width: '50vw',
        height: 234,
        minWidth: 360,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: 234,
          backgroundColor: '#458247',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '50px 80px 50px 80px',
        }}
      >
        <div style={{ color: 'white' }}>
          <div style={{
            width: '100%',
            textAlign: 'center',
            fontSize: 35,
            fontWeight: 500,
            fontFamily: 'Pretendard, sans-serif',
            color: 'white',
            textShadow: '0 4px 4px rgba(0,0,0,0.11)',
            marginBottom: 12
          }}>
            스코어 / Score
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <span
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
                color: 'white',
                paddingLeft: '53%'
              }}
            >
              00000000
            </span>
            <img
              src={eraserIcon}
              alt="지우개"
              style={{ width: 40, height: 40 }}
            />
          </div>
        </div>

        <img
          src={muted ? mutedIcon : muteIcon}
          alt={muted ? 'Sound Off' : 'Sound On'}
          onClick={toggleMute}
          style={{
            transform: 'scale(0.8)',
            filter: 'brightness(0) invert(1)',
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
};

export default ScoreComponent;