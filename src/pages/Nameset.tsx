import React, { useState } from 'react';
import './Nameset.css';

const Nameset = () => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      // 후 처리
    } else {
      alert('닉네임을 입력해주세요!');
    }
  };

  return (
    <div className="nameset-container">
      <div className="nameset-box">
        <h1>닉네임</h1>
        <h2>Player Name</h2>
        <p>게임 내에서 사용할 닉네임을 입력해주세요</p>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="English">Type your name please</p>
        <button onClick={handleSubmit}>확인</button>
      </div>
    </div>
  );
};

export default Nameset;
