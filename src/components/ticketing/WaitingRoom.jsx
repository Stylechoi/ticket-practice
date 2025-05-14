import React, { useState, useEffect } from 'react';
import '../../styles/components/WaitingRoom.css';

const WaitingRoom = ({ eventId, difficulty = 'normal', onEnter }) => {
  const [waitingNumber, setWaitingNumber] = useState(null);
  const [totalWaiting, setTotalWaiting] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [isEntering, setIsEntering] = useState(false);
  const [serverLoad, setServerLoad] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // 대기열 정보 초기화
  useEffect(() => {
    // 난이도에 따른 대기 설정
    const difficultySettings = {
      normal: {
        minWaiting: 10,
        maxWaiting: 500,
        minWaitTime: 5,
        maxWaitTime: 20,
        minLoad: 70,
        maxLoad: 85
      },
      hard: {
        minWaiting: 500,
        maxWaiting: 3000,
        minWaitTime: 20,
        maxWaitTime: 40,
        minLoad: 85,
        maxLoad: 95
      },
      nightmare: {
        minWaiting: 3000,
        maxWaiting: 10000,
        minWaitTime: 40,
        maxWaitTime: 60,
        minLoad: 95,
        maxLoad: 99.9
      }
    };
    
    // 현재 난이도 설정 가져오기
    const settings = difficultySettings[difficulty] || difficultySettings.normal;
    
    // 랜덤 대기 번호 생성
    const number = Math.floor(Math.random() * (settings.maxWaiting - settings.minWaiting + 1)) + settings.minWaiting;
    
    // 총 대기 인원 (대기 번호보다 10~20% 많게)
    const total = Math.floor(number * (1 + Math.random() * 0.1 + 0.1));
    
    // 예상 대기 시간 (초)
    const waitTime = Math.floor(Math.random() * (settings.maxWaitTime - settings.minWaitTime + 1)) + settings.minWaitTime;
    
    // 서버 부하율
    const load = Math.random() * (settings.maxLoad - settings.minLoad) + settings.minLoad;
    
    setWaitingNumber(number);
    setTotalWaiting(total);
    setEstimatedTime(waitTime);
    setServerLoad(load.toFixed(1));
    
    // 입장까지 남은 시간 (진행 상황)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (waitTime * 2));
        
        // 진행도 100%에 도달하면 입장 처리
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          processQueue();
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
    
    // 대기 인원 변동 시뮬레이션
    const waitingInterval = setInterval(() => {
      setTotalWaiting(prev => {
        const change = Math.floor(Math.random() * 50) - 20; // -20~+30 랜덤 변동
        return Math.max(prev + change, number); // 최소한 내 앞에는 있어야 함
      });
      
      // 서버 부하 변동
      setServerLoad(prev => {
        const prevLoad = parseFloat(prev);
        const change = (Math.random() * 2 - 1) * 0.5; // -0.5~+0.5% 변동
        return Math.min(Math.max(prevLoad + change, settings.minLoad), settings.maxLoad).toFixed(1);
      });
    }, 3000);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(waitingInterval);
    };
  }, [difficulty]);
  
  // 대기열 처리 (입장)
  const processQueue = () => {
    setIsEntering(true);
    
    // 3초 후 입장
    setTimeout(() => {
      if (onEnter) {
        onEnter();
      }
    }, 3000);
  };
  
  // 시간 포맷팅
  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}초`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${secs}초`;
  };
  
  // 서버 상태 메시지
  const getServerStatus = () => {
    const load = parseFloat(serverLoad);
    if (load > 98) return "매우 혼잡";
    if (load > 95) return "혼잡";
    if (load > 90) return "다소 혼잡";
    if (load > 85) return "보통";
    return "원활";
  };
  
  // 서버 상태 클래스
  const getServerStatusClass = () => {
    const load = parseFloat(serverLoad);
    if (load > 98) return "status-critical";
    if (load > 95) return "status-high";
    if (load > 90) return "status-medium";
    return "status-normal";
  };
  
  return (
    <div className="waiting-room">
      <div className="waiting-container">
        <h2>대기실 입장</h2>
        
        {!isEntering ? (
          <div className="waiting-status">
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="waiting-info">
              <div className="info-row">
                <span className="info-label">대기 번호:</span>
                <span className="info-value">{waitingNumber?.toLocaleString()}</span>
              </div>
              <div className="info-row">
                <span className="info-label">총 대기 인원:</span>
                <span className="info-value">{totalWaiting?.toLocaleString()}</span>
              </div>
              <div className="info-row">
                <span className="info-label">예상 대기 시간:</span>
                <span className="info-value">{formatTime(estimatedTime)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">서버 상태:</span>
                <span className={`server-status ${getServerStatusClass()}`}>
                  {serverLoad}% ({getServerStatus()})
                </span>
              </div>
            </div>
            
            <div className="waiting-tips">
              <h4>티켓팅 팁</h4>
              <ul>
                <li>브라우저 새로고침 시 대기열이 초기화될 수 있습니다.</li>
                <li>여러 기기로 동시 접속 시 계정이 차단될 수 있습니다.</li>
                <li>미리 결제 정보를 준비해두세요.</li>
                <li>네트워크 상태가 안정적인지 확인하세요.</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="entering-message">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="currentColor" d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41L9,16.17z" />
              </svg>
            </div>
            <h3>입장이 시작되었습니다!</h3>
            <p>잠시 후 티켓팅 페이지로 이동합니다.</p>
            <div className="entering-spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitingRoom;