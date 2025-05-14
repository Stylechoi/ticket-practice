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
            <svg className="logo-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.5 3H3.5C2.67 3 2 3.67 2 4.5V19.5C2 20.33 2.67 21 3.5 21H20.5C21.33 21 22 20.33 22 19.5V4.5C22 3.67 21.33 3 20.5 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 8H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>티켓팅 훈련소</span>
          </Link>
        </div>

        <div className="server-time">
          {serverTime}
        </div>

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
    </header>
  );
};

export default Header;