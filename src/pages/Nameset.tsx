import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Pretendard, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #0B7D54;
`;

const Box = styled.div`
  width: 90vw;
  height: 90vh;
  border: 4px solid #FFDD65;
  background-color: #0B7D54;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5vh 15vw;
  box-sizing: border-box;

  h1 {
    color: #FEFEFE;
    font-weight: 700;
    font-size: clamp(24px, 6vw, 52px);
    margin: 0;
  }

  h2 {
    color: #F5F5F5;
    font-weight: 700;
    font-size: clamp(20px, 4.5vw, 44px);
    margin: 8px 0 8vh;
  }

  p {
    color: #FEFEFE;
    font-weight: 500;
    font-size: clamp(16px, 3.5vw, 30px);
    margin: 0 0 10vh;
    text-align: center;
    max-width: 90%;
  }

  .English {
    margin-top: 12px;
    color: #0C4C34;
    font-size: clamp(14px, 2vw, 24px);
    font-weight: 400;
  }
`;

const Input = styled.input`
  color: #E2E2E2;
  font-weight: 600;
  font-size: clamp(14px, 2.5vw, 26px);
  padding: 12px 24px;
  border-radius: 4px;
  border: 4px solid rgba(17, 90, 64, 0.77);
  background: #146F4E;
  box-shadow: 0 3px 4px rgba(18, 89, 64, 0.08),
              0 2px 4px rgba(18, 89, 64, 0.11);
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  text-align: center;
  margin-top: 16px;
`;

const Button = styled.button`
  margin-top: 40px;
  padding: 20px 80px;
  border-radius: 4px;
  border: 3px solid rgba(203, 187, 43, 0.88);
  background: #FFDD65;
  color: #393939;
  font-weight: 600;
  font-size: clamp(16px, 2.5vw, 24px);
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #e6c64f;
  }
`;

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
    <Container>
      <Box>
        <h1>닉네임</h1>
        <h2>Player Name</h2>
        <p>게임 내에서 사용할 닉네임을 입력해주세요</p>
        <Input
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="English">Type your name please</p>
        <Button onClick={handleSubmit}>확인</Button>
      </Box>
    </Container>
  );
};

export default Nameset;