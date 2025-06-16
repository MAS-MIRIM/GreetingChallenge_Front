import React, { useEffect } from 'react';
import { useTimerStore } from '../stores/timerStore';

const formatTime = (seconds: number) => {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
};

const TimerComponent = () => {
  const seconds = useTimerStore(state => state.seconds);
  const start = useTimerStore(state => state.start);

  useEffect(() => {
    start();
  }, [start]);

  return (
    <div style={{
      position: 'relative',
      width: '50vw',
      height: 234,
      minWidth: 360,
      boxSizing: 'border-box',
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: 234,
        backgroundColor: '#EBEBEB',
        paddingTop: 89,
        paddingLeft: '34%',
        paddingRight: '21%',
        paddingBottom: 70,
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <span style={{
          fontSize: 55,
          fontWeight: 400,
          fontFamily: 'Pretendard, sans-serif',
          color: 'black',
          textAlign: 'center',
        }}>
          {formatTime(seconds)}
        </span>
      </div>

      <div style={{
        position: 'absolute',
        left: '7%',
        top: 23,
        width: '29%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        boxSizing: 'border-box',
      }}>
        <div style={{
          width: '100%',
          textAlign: 'center',
          fontSize: 35,
          fontWeight: 500,
          fontFamily: 'Pretendard, sans-serif',
          color: 'black',
          textShadow: '0 4px 4px rgba(0,0,0,0.11)',
        }}>
          타이머 / Timer
        </div>
        <div style={{
          width: 138,
          height: 138,
          backgroundColor: 'white',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <span style={{
            fontSize: 36,
            fontWeight: 800,
            fontFamily: 'Pretendard, sans-serif',
            color: 'black',
            textAlign: 'center',
          }}>
            타이머
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimerComponent;
