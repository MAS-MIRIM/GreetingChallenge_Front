import { useEffect, useRef, useState } from "react";
import bg from "/floor/thirdFloor.png";
import upButton from "/floor/button.png";
import TimerComponent from "../components/timer";
import ScoreComponent from "../components/score";
import { useTimerStore } from "../stores/timerStore";
import { useSessionStore } from "../stores/sessionStore";
import "./css/Floor.css";

interface FloorProps {
  onNavigate: (path: string) => void;
}

const BASE_URL = "https://your.api.base.url";

const ThirdFloor: React.FC<FloorProps> = ({ onNavigate }) => {
  const positionRef = useRef(0);
  const speedRef = useRef(10);
  const animationRef = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [showUpButton, setShowUpButton] = useState(false);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasSentSessionEnd, setHasSentSessionEnd] = useState(false);

  const sessionId = useSessionStore(state => state.sessionId);

  const seconds = useTimerStore(state => state.seconds);
  const resetTimer = useTimerStore(state => state.reset);

  const ORIGINAL_IMAGE_WIDTH = 6445;
  const ORIGINAL_IMAGE_HEIGHT = 1080;
  const BUTTON_RELATIVE_X = 6300;
  const BUTTON_RELATIVE_Y = 640;

  const updateButtonPosition = () => {
    if (imgRef.current && imageLoaded) {
      const rect = imgRef.current.getBoundingClientRect();
      const scaleX = rect.width / ORIGINAL_IMAGE_WIDTH;
      const scaleY = rect.height / ORIGINAL_IMAGE_HEIGHT;
      const buttonX = BUTTON_RELATIVE_X * scaleX + rect.left;
      const buttonY = BUTTON_RELATIVE_Y * scaleY + rect.top;
      setButtonPos({ x: buttonX, y: buttonY });
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const sendSessionEnd = async () => {
    if (hasSentSessionEnd) return;
    if (!sessionId) {
      console.warn("sessionId가 없습니다.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/game/session/${sessionId}/end`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeSpent: seconds,
          floor: "ThirdFloor",
        }),
      });

      if (!res.ok) {
        console.error("게임 종료 API 요청 실패", res.statusText);
      } else {
        console.log("게임 종료 API 요청 성공");
        setHasSentSessionEnd(true);
      }
    } catch (error) {
      console.error("게임 종료 API 요청 중 에러:", error);
    }
  };

  useEffect(() => {
    if (!imageLoaded) return;

    const handleMouseMove = (e: MouseEvent) => {
      const ratio = e.clientX / window.innerWidth;
      speedRef.current = 10 + ratio * 18;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!imgRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const next = positionRef.current - speedRef.current;
      const rect = imgRef.current.getBoundingClientRect();
      const imageWidth = rect.width;
      const viewportWidth = window.innerWidth;

      if (Math.abs(next) + viewportWidth >= imageWidth) {
        setShowUpButton(true);
        updateButtonPosition();

        window.dispatchEvent(new Event("timer-stop"));

        sendSessionEnd();

        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        return;
      }

      positionRef.current = next;
      imgRef.current.style.left = `${positionRef.current}px`;

      if (showUpButton) {
        updateButtonPosition();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    updateButtonPosition();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [imageLoaded, showUpButton, seconds]);

  useEffect(() => {
    const handleResize = () => {
      if (showUpButton) {
        updateButtonPosition();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showUpButton, imageLoaded]);

  const handleUpClick = async () => {
    console.log("타이머 초:", seconds);
    resetTimer();

    if (!hasSentSessionEnd) {
      await sendSessionEnd();
    }

    onNavigate("/");
  };

  return (
    <>
      <div className="floor-header">
        <TimerComponent />
        <ScoreComponent />
      </div>

      <div className="floor-content">
        <img
          ref={imgRef}
          src={bg}
          alt="Third Floor Background"
          draggable={false}
          onLoad={handleImageLoad}
          className="floor-background"
          style={{ position: "absolute", top: 0, left: 0 }}
        />

        {showUpButton && (
          <button
            onClick={handleUpClick}
            className="floor-up-button"
            style={{
              position: "fixed",
              top: `${buttonPos.y}px`,
              left: `${buttonPos.x}px`,
              cursor: "pointer",
              border: "none",
              background: "none",
              padding: 0,
              zIndex: 1000,
            }}
          >
            <img
              src={upButton}
              alt="위로 가기"
              draggable={false}
              className="floor-up-image"
            />
          </button>
        )}
      </div>
    </>
  );
};

export default ThirdFloor;
