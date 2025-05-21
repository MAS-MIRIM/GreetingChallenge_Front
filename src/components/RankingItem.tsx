import React from 'react';
import gold from '../assets/Gold.png';
import silver from '../assets/Silver.png';
import bronze from '../assets/Bronze.png';

const trophies = [gold, silver, bronze];

type RankingItemProps = {
  rank: number;
  name: string;
  score: string;
};

const RankingItem: React.FC<RankingItemProps> = ({ rank, name, score }) => {
  const trophy = rank <= 3 ? trophies[rank - 1] : null;

  return (
    <div className="ranking-item">
      <div className="player-info">
        {trophy ? (
          <img
            src={trophy}
            alt={`Rank ${rank}`}
            className="trophy"
          />
        ) : (
          <span className="rank-number">{rank}</span>
        )}
        <span className="player-name">{name}</span>
      </div>
      <span className="score">{score}</span>
    </div>
  );
};

export default RankingItem;