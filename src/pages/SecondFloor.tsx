import { useEffect, useRef, useState } from "react";
import bg from "/floor/secondFloor.png";
import upButton from "/floor/button.png";
import TimerComponent from "../components/timer";
import ScoreComponent from "../components/score";
import "./css/Floor.css";

interface FloorProps {
  onNavigate: (path: string) => void;
}

const SecondFloor: React.FC<FloorProps> = ({ onNavigate }) => {
  const positionRef = useRef(0);
  const speedRef = useRef(10);
  const animationRef = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [showUpButton, setShowUpButton] = useState(false);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

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
  }, [imageLoaded, showUpButton]);

  useEffect(() => {
    const handleResize = () => {
      if (showUpButton) {
        updateButtonPosition();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showUpButton, imageLoaded]);

  const handleUpClick = () => {
    onNavigate("/thirdFloor");
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
          alt="Second Floor Background"
          draggable={false}
          onLoad={handleImageLoad}
          className="floor-background"
        />

        {showUpButton && (
          <button
            onClick={handleUpClick}
            className="floor-up-button"
            style={{
              top: `${buttonPos.y}px`,
              left: `${buttonPos.x}px`,
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

export default SecondFloor;
