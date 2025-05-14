import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 컨텍스트 프로바이더
import { MessageProvider } from './contexts/MessageContext';
import { TicketingProvider } from './contexts/TicketingContext';

// 레이아웃 컴포넌트
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// 페이지 컴포넌트
import MessagesPage from './pages/MessagesPage';
import TicketingPage from './pages/TicketingPage';
import StatsPage from './pages/StatsPage';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  // 모바일 기기 감지
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // 모바일인 경우 경고 메시지 표시
      if (mobile) {
        setShowMobileWarning(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 경고 메시지 닫기
  const dismissWarning = () => {
    setShowMobileWarning(false);
    // 24시간 동안 다시 보지 않기 설정
    localStorage.setItem('mobileWarningDismissed', new Date().getTime());
  };

  return (
    <MessageProvider>
      <TicketingProvider>
        <div className="app-container">
          <Header />
          
          {showMobileWarning && isMobile && (
            <div className="mobile-warning">
              <div className="warning-content">
                <div className="warning-dot"></div>
                <p>PC에서 이용하시면 더 나은 티켓팅 연습 경험을 제공받으실 수 있습니다.</p>
                <button onClick={dismissWarning} className="close-warning">×</button>
              </div>
            </div>
          )}
          
          <main className="main-content">
            <Routes>
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/ticket" element={<TicketingPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/" element={<Navigate to="/ticket" replace />} />
            </Routes>
          </main>
          
          <Footer />
          <ToastContainer position="bottom-right" theme="dark" />
        </div>
      </TicketingProvider>
    </MessageProvider>
  );
}

export default App;
