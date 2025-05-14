import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 컨텍스트 프로바이더
import { AuthProvider } from './contexts/AuthContext';
import { TicketingProvider } from './contexts/TicketingContext';

// 레이아웃 컴포넌트
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// 페이지 컴포넌트
import LoginPage from './pages/LoginPage';
import TicketingPage from './pages/TicketingPage';
import ProfilePage from './pages/ProfilePage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <AuthProvider>
      <TicketingProvider>
        <div className="app-container">
          <Header />
          
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/ticket" element={<TicketingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/" element={<Navigate to="/ticket" replace />} />
            </Routes>
          </main>
          
          <Footer />
          <ToastContainer position="bottom-right" theme="dark" />
        </div>
      </TicketingProvider>
    </AuthProvider>
  );
}

export default App;
