import React, { useEffect, useState } from 'react';
import './Ranking.css';
import RankingItem from '../components/RankingItem';
import Vec from '../assets/Vector.png';

type Player = {
  name: string;
  score: string;
};

const Ranking: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // TODO: 실제 API 호출 코드 작성

        // 더미 데이터
        const data: Player[] = Array.from({ length: 12 }, (_, i) => ({
          name: `Player name ${i + 1}`,
          score: '999999999',
        }));

        setPlayers(data);
      } catch (error) {
        console.error('플레이어 데이터 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) return <div className="ranking-board">로딩 중...</div>;

  return (
    <div className="ranking-board">
      <img src={Vec} className="decor top" alt="decor top" />
      <h2 className="ranking-title">RANKING</h2>
      <div className="ranking-list">
        {players.map((player, idx) => (
          <RankingItem
            key={idx}
            rank={idx + 1}
            name={player.name}
            score={player.score}
          />
        ))}
      </div>
      <img src={Vec} className="decor bottom" alt="decor bottom" />
    </div>
  );
};

export default Ranking;
