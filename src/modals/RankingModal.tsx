import React, { useEffect, useRef, useState } from 'react';
import './css/Ranking.css';
import RankingItem from '../components/RankingItem';
import { useNavigate } from 'react-router-dom';

type Player = {
  rank: number;
  user_id: string;
  nickname: string;
  highest_score: number;
  session_id: string;
  date: string;
};

interface RankingModalProps {
  onClose?: () => void;
}

const base_url = 'https://your-api-server.com';

const RankingModal: React.FC<RankingModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const Vec = '/images/trophies/Vector.png';

  const fetchRanking = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${base_url}/leaderboard/global`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.success && Array.isArray(data.ranking)) {
        setPlayers(data.ranking);
      } else {
        setError('랭킹 데이터를 불러오는데 실패했습니다.');
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRanking();

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="ranking-modal-overlay">
      <div className="ranking-board" ref={modalRef}>
        <img src={Vec} className="decor top" alt="decor top" />
        <h2 className="ranking-title">RANKING</h2>

        <div className="ranking-list">
          {loading && <p>로딩 중...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && players.length === 0 && (
            <div className="no-players">
              <p>아직 등록된 플레이어가 없습니다.</p>
            </div>
          )}
          {!loading && !error && players.length > 0 && (
            players.map((player) => (
              <RankingItem
                key={player.user_id}
                rank={player.rank}
                name={player.nickname}
                score={player.highest_score.toString()}
              />
            ))
          )}
        </div>

        <img src={Vec} className="decor bottom" alt="decor bottom" />
      </div>
    </div>
  );
};

export default RankingModal;
