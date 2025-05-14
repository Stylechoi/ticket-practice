import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formatCurrentTime } from '../../utils/dateUtils';
import '../../styles/components/Header.css';

const Header = () => {
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
  
  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setShowMobileMenu(prev => !prev);
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">2025 티켓팅 훈련소</Link>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="github-link">
            <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
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
              <li className={location.pathname === '/messages' ? 'active' : ''}>
                <Link to="/messages">응원 메시지</Link>
              </li>
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