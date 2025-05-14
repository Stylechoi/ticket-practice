import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 컨텍스트 프로바이더
import { MessageProvider } from './contexts/MessageContext';
import { TicketingProvider } from './contexts/TicketingContext';

// 레이아웃 컴포넌트
import Header from './components/layout/Header';

// 페이지 컴포넌트
import MessagesPage from './pages/MessagesPage';
import TicketingPage from './pages/TicketingPage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <MessageProvider>
      <TicketingProvider>
        <div className="app-container">
          <Header />
          
          <main className="main-content">
            <Routes>
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/ticket" element={<TicketingPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/" element={<Navigate to="/ticket" replace />} />
            </Routes>
          </main>
          
          <ToastContainer position="bottom-right" theme="dark" />
        </div>
      </TicketingProvider>
    </MessageProvider>
  );
}

export default App;
