import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/pages/Login.css';

const LoginPage = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const result = await login(username, password);
      
      if (result.success) {
        navigate('/ticket');
      } else {
        setError(result.message || '로그인에 실패했습니다.');
      }
    } catch (err) {
      setError('서버 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 회원가입 처리
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      const result = await register(username, password);
      
      if (result.success) {
        setSuccess('회원가입이 완료되었습니다. 로그인해주세요.');
        setIsLoginMode(true);
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(result.message || '회원가입에 실패했습니다.');
      }
    } catch (err) {
      setError('서버 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 모드 전환 (로그인 <-> 회원가입)
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
    setSuccess('');
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{isLoginMode ? '로그인' : '회원가입'}</h2>
        
        {isLoginMode ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">아이디</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디를 입력하세요"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="reg-username">아이디</label>
              <input
                type="text"
                id="reg-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디를 입력하세요"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="reg-password">비밀번호</label>
              <input
                type="password"
                id="reg-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirm-password">비밀번호 확인</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <button type="submit" className="register-button" disabled={isLoading}>
              {isLoading ? '가입 중...' : '회원가입'}
            </button>
          </form>
        )}
        
        <div className="mode-toggle">
          {isLoginMode ? (
            <p>
              계정이 없으신가요? <button onClick={toggleMode}>회원가입</button>
            </p>
          ) : (
            <p>
              이미 계정이 있으신가요? <button onClick={toggleMode}>로그인</button>
            </p>
          )}
        </div>
        
        <div className="login-divider">
          <span>또는</span>
        </div>
        
        <div className="guest-login">
          <Link to="/ticket" className="guest-button">
            게스트로 연습하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;