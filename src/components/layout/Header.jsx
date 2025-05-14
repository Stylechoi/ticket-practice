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
          <Link to="/">
            <svg className="logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9H21M15 15L13 17M9 15L11 17M4 3H20C21.1046 3 22 3.89543 22 5V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3V7M8 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>2025 티켓팅 훈련소</span>
          </Link>
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