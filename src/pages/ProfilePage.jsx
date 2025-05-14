import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Profile.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    name: '',
    points: 0
  });
  
  // 사용자 정보 로드
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // 사용자 정보 설정
    setProfileData({
      username: user.username || 'guest',
      email: user.email || 'guest@example.com',
      name: user.name || '게스트',
      points: user.points || 0
    });
  }, [user, navigate]);
  
  // 로그아웃 처리
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!user) {
    return (
      <div className="profile-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>로그인 정보를 확인하는 중...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>내 프로필</h2>
        
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {profileData.name.charAt(0)}
            </div>
            <div className="profile-info">
              <h3>{profileData.name}</h3>
              <p>{profileData.email}</p>
            </div>
          </div>
          
          <div className="profile-body">
            <div className="profile-stats">
              <div className="stats-item">
                <span className="stats-value">{profileData.points.toLocaleString()}</span>
                <span className="stats-label">포인트</span>
              </div>
            </div>
            
            <div className="profile-section">
              <h4>계정 정보</h4>
              <div className="profile-detail">
                <span>아이디</span>
                <span>{profileData.username}</span>
              </div>
              <div className="profile-detail">
                <span>이메일</span>
                <span>{profileData.email}</span>
              </div>
              <div className="profile-detail">
                <span>이름</span>
                <span>{profileData.name}</span>
              </div>
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="logout-button" onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;