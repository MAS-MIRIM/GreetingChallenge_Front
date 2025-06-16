import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSessionStore } from '../stores/sessionStore';

const Container = styled.div<{ fadeClass: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #0B7D54;
  font-family: Pretendard, sans-serif;
  transition: opacity 0.75s ease-in-out;
  opacity: ${({ fadeClass }) => (fadeClass === 'fade-in' ? 1 : 0)};
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

  h1, h2, p {
    color: #FEFEFE;
    margin: 0;
  }

  h1 {
    font-size: clamp(24px, 6vw, 52px);
  }

  h2 {
    font-size: clamp(20px, 4.5vw, 44px);
    margin: 8px 0 8vh;
  }

  p {
    font-size: clamp(16px, 3.5vw, 30px);
    margin-bottom: 10vh;
    text-align: center;
    max-width: 90%;
  }

  .English {
    margin-top: 12px;
    color: #0C4C34;
    font-size: clamp(14px, 2vw, 24px);
  }

  .result {
    margin-top: 20px;
    font-weight: 700;
    font-size: clamp(16px, 3vw, 26px);
    color: #ffdd65;
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

  &:hover {
    background-color: #e6c64f;
  }
`;

const base_url = 'https://your-backend.example.com';

interface NicknameProps {
  onNavigate: (path: string) => void;
}

const Nickname: React.FC<NicknameProps> = ({ onNavigate }) => {
  const [nickname, setNickname] = useState('');
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setSessionId = useSessionStore((state) => state.setSessionId);

  const validateNickname = (name: string) => {
    const regex = /^[가-힣a-zA-Z]{1,12}$/;
    return regex.test(name);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    if (!validateNickname(nickname)) {
      setResult('닉네임은 한글/영문만 입력 가능합니다. (특수문자, 숫자, 초성 제외)');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${base_url}/game/session/${nickname}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await res.json();

      if (json.success && json.sessionId) {
        setResult('사용 가능한 닉네임입니다! 잠시 후 게임이 시작됩니다.');
        setSessionId(json.sessionId);
        onNavigate('/guide');
      } else {
        setResult(json.message || '오류가 발생했습니다.');
        setLoading(false);
      }
    } catch {
      setResult('서버 요청 실패');
      setLoading(false);
    }
  };

  useEffect(() => {
    setFadeClass('fade-in');
  }, []);

  return (
    <Container fadeClass={fadeClass}>
      <Box>
        <h1>닉네임</h1>
        <h2>Player Name</h2>
        <p>게임 내에서 사용할 닉네임을 입력해주세요</p>
        <Input
          type="text"
          placeholder="이름을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          disabled={loading}
        />
        <p className="English">Type your name please</p>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? '처리 중...' : '확인'}
        </Button>
        {result && <p className="result">{result}</p>}
      </Box>
    </Container>
  );
};

export default Nickname;
