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