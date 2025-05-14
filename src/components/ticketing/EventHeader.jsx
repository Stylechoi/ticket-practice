import React from 'react';
import { formatTimeRemaining } from '../../utils/dateUtils';
import '../../styles/components/EventHeader.css';

const EventHeader = ({ event, timeLeft, mode }) => {
  // 모드에 따른 배지 스타일 및 텍스트
  const getModeBadge = () => {
    switch (mode) {
      case 'practice':
        return <span className="mode-badge practice">연습 모드</span>;
      case 'simulation':
        return <span className="mode-badge simulation">시뮬레이션 모드</span>;
      case 'real':
        return <span className="mode-badge real">실전 모드</span>;
      default:
        return null;
    }
  };
  
  // 이벤트 정보가 없는 경우
  if (!event) {
    return (
      <div className="event-header">
        <div className="event-header-content">
          <h2>티켓팅 연습</h2>
          <div className="time-display">
            {timeLeft > 0 ? formatTimeRemaining(timeLeft) : '00:00'}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="event-header">
      <div className="event-header-content">
        <div className="event-info">
          <h2>{event.name || '티켓팅 연습'}</h2>
          <div className="event-details">
            <span className="event-date">{event.date}</span>
            <span className="event-time">{event.time}</span>
            <span className="event-venue">{event.venue}</span>
            {getModeBadge()}
          </div>
        </div>
        
        <div className="time-container">
          <div className="time-label">남은 시간</div>
          <div className="time-display">
            {timeLeft > 0 ? formatTimeRemaining(timeLeft) : '00:00'}
          </div>
        </div>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${(timeLeft / (event.paymentTimeLimit || 60)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default EventHeader;