import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrentTime } from '../../utils/dateUtils';
import '../../styles/components/Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [serverTime, setServerTime] = useState(formatCurrentTime());
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // 서버 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setServerTime(formatCurrentTime());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // 로그아웃 처리
  const handleLogout = () => {
    logout();
  };
  
  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setShowMobileMenu(prev => !prev);
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">티켓팅 훈련소</Link>
        </div>
        
        <div className="server-time">
          {serverTime}
        </div>
        
        <div className="header-right">
          <nav className={`main-nav ${showMobileMenu ? 'mobile-active' : ''}`}>
            <ul>
              <li className={location.pathname === '/ticket' ? 'active' : ''}>
                <Link to="/ticket">티켓팅 연습</Link>
              </li>
              <li className={location.pathname === '/stats' ? 'active' : ''}>
                <Link to="/stats">기록/통계</Link>
              </li>
              {user ? (
                <>
                  <li className={location.pathname === '/profile' ? 'active' : ''}>
                    <Link to="/profile">내 정보</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="logout-btn">로그아웃</button>
                  </li>
                </>
              ) : (
                <li className={location.pathname === '/login' ? 'active' : ''}>
                  <Link to="/login">로그인</Link>
                </li>
              )}
            </ul>
          </nav>
          
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;