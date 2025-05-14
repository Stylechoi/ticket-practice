import React, { useState, useEffect } from 'react';
import { useTicketing } from '../contexts/TicketingContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Stats.css';

const StatsPage = () => {
  const { state } = useTicketing();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    totalAttempts: 0,
    successCount: 0,
    successRate: 0,
    totalAmount: 0,
    averageAmount: 0
  });
  
  // 통계 계산
  useEffect(() => {
    if (state.history.length === 0) return;
    
    const totalAttempts = state.history.length;
    const successCount = state.history.filter(record => 
      record.result === '성공' || record.result === 'success'
    ).length;
    
    const successRate = totalAttempts > 0 ? 
      Math.round((successCount / totalAttempts) * 100) : 0;
    
    // 결제 금액 계산
    let totalAmount = 0;
    state.history.forEach(record => {
      if (record.paymentInfo && record.paymentInfo.amount) {
        totalAmount += record.paymentInfo.amount;
      }
    });
    
    const averageAmount = successCount > 0 ? 
      Math.round(totalAmount / successCount) : 0;
    
    setStats({
      totalAttempts,
      successCount,
      successRate,
      totalAmount,
      averageAmount
    });
  }, [state.history]);
  
  // 기록 삭제 처리
  const handleClearHistory = () => {
    if (window.confirm('모든 기록을 삭제하시겠습니까?')) {
      // 기록 삭제 액션 디스패치
      // (현재 기능 구현 안됨)
    }
  };
  
  return (
    <div className="stats-page">
      <div className="stats-container">
        <h2>티켓팅 통계</h2>
        
        <div className="stats-summary">
          <div className="stats-card">
            <div className="stats-number">{stats.totalAttempts}</div>
            <div className="stats-label">총 시도 횟수</div>
          </div>
          <div className="stats-card">
            <div className="stats-number">{stats.successCount}</div>
            <div className="stats-label">성공 횟수</div>
          </div>
          <div className="stats-card">
            <div className="stats-number">{stats.successRate}%</div>
            <div className="stats-label">성공률</div>
          </div>
          <div className="stats-card">
            <div className="stats-number">{stats.averageAmount.toLocaleString()}원</div>
            <div className="stats-label">평균 결제금액</div>
          </div>
        </div>
        
        <div className="history-section">
          <div className="history-header">
            <h3>최근 기록</h3>
            {state.history.length > 0 && (
              <button 
                className="clear-history-btn"
                onClick={handleClearHistory}
              >
                기록 삭제
              </button>
            )}
          </div>
          
          {state.history.length === 0 ? (
            <div className="empty-history">
              <p>티켓팅 기록이 없습니다.</p>
              <button 
                className="start-practice-btn"
                onClick={() => navigate('/ticket')}
              >
                티켓팅 연습하기
              </button>
            </div>
          ) : (
            <div className="history-list">
              <div className="history-item header">
                <div className="history-date">일시</div>
                <div className="history-venue">공연장</div>
                <div className="history-seats">좌석</div>
                <div className="history-amount">금액</div>
                <div className="history-result">결과</div>
              </div>
              
              {state.history.map((record, index) => (
                <div 
                  key={index} 
                  className={`history-item ${record.result === '성공' || record.result === 'success' ? 'success' : 'failure'}`}
                >
                  <div className="history-date">
                    {record.date} {record.time}
                  </div>
                  <div className="history-venue">
                    {record.venue || '티켓팅 연습장'}
                  </div>
                  <div className="history-seats">
                    {record.seats ? 
                      (record.seats.length > 0 ? 
                        record.seats.map(seat => seat.location || `${seat.zone}구역 ${seat.row}열 ${seat.seat}번`).join(', ') : 
                        '-') : 
                      '-'
                    }
                  </div>
                  <div className="history-amount">
                    {record.paymentInfo?.amount ? 
                      record.paymentInfo.amount.toLocaleString() + '원' : 
                      '-'
                    }
                  </div>
                  <div className="history-result">
                    <span className={`result-badge ${record.result === '성공' || record.result === 'success' ? 'success' : 'failure'}`}>
                      {record.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;