import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTicketing } from '../contexts/TicketingContext';
import { useAuth } from '../contexts/AuthContext';
import DifficultySelector from '../components/ticketing/DifficultySelector';
import VenueSelector from '../components/ticketing/VenueSelector';
import EventHeader from '../components/ticketing/EventHeader';
import WaitingRoom from '../components/ticketing/WaitingRoom';
import SeatMap from '../components/ticketing/SeatMap';
import { getEventSettings, getVenueLayout } from '../services/api';
import '../styles/pages/Ticketing.css';

const TicketingPage = () => {
  const { state, dispatch } = useTicketing();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState('setup'); // setup, waiting, seats, payment, complete
  const [selectedDifficulty, setSelectedDifficulty] = useState('normal');
  const [selectedVenue, setSelectedVenue] = useState(null);
  
  // 티켓팅 설정 불러오기
  const loadEventSettings = useCallback(async () => {
    try {
      // 선택한 난이도 및 공연장에 따른 설정 로드
      const settings = await getEventSettings(selectedDifficulty, selectedVenue?.id);
      
      dispatch({ type: 'SET_EVENT', payload: settings });
      
      // 좌석 레이아웃 로드
      const venueLayout = await getVenueLayout(selectedVenue?.id);
      
      dispatch({ type: 'SET_VENUE', payload: venueLayout });
      dispatch({ type: 'SET_SEAT_LAYOUT', payload: venueLayout.zones });
      
      // 상태 초기화
      dispatch({ type: 'RESET_STATE' });
      dispatch({ 
        type: 'RESET_TIMER', 
        payload: settings.paymentTimeLimit || 60 
      });
      
      // 활성화
      dispatch({
        type: 'SET_ACTIVE',
        payload: true
      });
      
      return true;
    } catch (error) {
      console.error('설정 로드 실패:', error);
      toast.error('이벤트 설정을 불러오는데 실패했습니다.');
      return false;
    }
  }, [dispatch, selectedDifficulty, selectedVenue]);
  
  // 티켓팅 시작
  const startTicketing = useCallback(async () => {
    if (!selectedVenue) {
      toast.error('공연장을 선택해주세요.');
      return;
    }
    
    const success = await loadEventSettings();
    if (success) {
      // 난이도에 따라 대기열 표시 여부 결정
      if (selectedDifficulty === 'easy') {
        // 쉬움 난이도에서는 대기열 없이 바로 시작
        setCurrentStep('seats');
      } else {
        // 대기열 시작
        setCurrentStep('waiting');
      }
    }
  }, [loadEventSettings, selectedVenue, selectedDifficulty]);
  
  // 대기열에서 입장 처리
  const handleEnterFromWaiting = useCallback(() => {
    setCurrentStep('seats');
  }, []);
  
  // 좌석 선택 완료 처리
  const handleSeatSelectionComplete = useCallback((selectedSeats) => {
    if (selectedSeats.length === 0) {
      toast.error('좌석을 선택해주세요.');
      return;
    }
    
    // 결제 페이지로 이동 (임시로 완료 처리)
    toast.success('결제가 완료되었습니다!');
    setCurrentStep('complete');
    
    // 결제 정보 저장
    dispatch({
      type: 'SAVE_PAYMENT_RESULT',
      payload: {
        seats: selectedSeats,
        paymentInfo: {
          status: 'completed',
          transactionId: 'T' + Date.now(),
          amount: selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
        }
      }
    });
  }, [dispatch]);
  
  // 다시 시작
  const handleRestart = useCallback(() => {
    dispatch({ type: 'RESET_STATE' });
    setCurrentStep('setup');
  }, [dispatch]);
  
  // 타임아웃 처리
  useEffect(() => {
    if (state.timeLeft === 0 && state.isActive) {
      toast.error('시간이 초과되었습니다!');
      
      if (currentStep === 'seats') {
        // 좌석 선택 시간 초과 시
        handleRestart();
      }
    }
  }, [state.timeLeft, state.isActive, currentStep, handleRestart]);
  
  // 현재 단계에 따른 컴포넌트 렌더링
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'setup':
        return (
          <div className="setup-container">
            <h2>티켓팅 연습 설정</h2>
            
            <div className="setup-options">
              <DifficultySelector 
                selectedDifficulty={selectedDifficulty} 
                onChange={setSelectedDifficulty} 
              />
              
              <VenueSelector 
                selectedVenue={selectedVenue} 
                onChange={setSelectedVenue} 
              />
            </div>
            
            <div className="start-button-container">
              <button 
                className="start-button" 
                onClick={startTicketing}
                disabled={!selectedVenue}
              >
                티켓팅 시작하기
              </button>
            </div>
            
            <div className="difficulty-description">
              {selectedDifficulty === 'easy' && (
                <div className="difficulty-info">
                  <h4>쉬움 모드</h4>
                  <p>대기열 없음, 매진율 낮음, 서버 안정적, 결제 시간 충분</p>
                  <p>초보자에게 적합한 모드입니다.</p>
                </div>
              )}
              
              {selectedDifficulty === 'normal' && (
                <div className="difficulty-info">
                  <h4>보통 모드</h4>
                  <p>짧은 대기열, 중간 매진율, 약간의 서버 지연</p>
                  <p>실제 티켓팅과 유사한 난이도입니다.</p>
                </div>
              )}
              
              {selectedDifficulty === 'hard' && (
                <div className="difficulty-info">
                  <h4>어려움 모드</h4>
                  <p>긴 대기열, 높은 매진율, 서버 지연 및 오류 발생</p>
                  <p>인기 공연 티켓팅 수준의 난이도입니다.</p>
                </div>
              )}
              
              {selectedDifficulty === 'nightmare' && (
                <div className="difficulty-info">
                  <h4>악몽 모드</h4>
                  <p>매우 긴 대기열, 매우 높은 매진율, 심각한 서버 지연 및 오류</p>
                  <p>BTS, 테일러 스위프트급 티켓팅 난이도입니다.</p>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'waiting':
        return (
          <WaitingRoom 
            eventId={state.event?.id} 
            difficulty={selectedDifficulty}
            onEnter={handleEnterFromWaiting} 
          />
        );
        
      case 'seats':
        return (
          <>
            <EventHeader 
              event={{
                name: selectedVenue?.name + ' 티켓팅 연습',
                date: new Date().toLocaleDateString(),
                time: '19:00',
                venue: selectedVenue?.name
              }} 
              timeLeft={state.timeLeft} 
              mode={selectedDifficulty === 'easy' ? 'practice' : 'simulation'}
            />
            <SeatMap 
              venueType={selectedVenue?.type || 'concert'} 
              onSeatSelect={handleSeatSelectionComplete} 
            />
          </>
        );
        
      case 'complete':
        return (
          <div className="complete-container">
            <div className="success-animation">
              <div className="checkmark-circle">
                <div className="checkmark"></div>
              </div>
            </div>
            
            <h2>예매 완료!</h2>
            
            <div className="ticket-info">
              <h3>예매 정보</h3>
              <div className="ticket-details">
                <p><strong>예매번호:</strong> {state.history[0]?.paymentInfo?.transactionId}</p>
                <p><strong>예매일시:</strong> {new Date().toLocaleString()}</p>
                <p><strong>공연장:</strong> {selectedVenue?.name}</p>
                <p><strong>선택 좌석:</strong> {state.history[0]?.seats.map(seat => seat.location).join(', ')}</p>
                <p><strong>결제 금액:</strong> {state.history[0]?.paymentInfo?.amount.toLocaleString()}원</p>
              </div>
            </div>
            
            <div className="action-buttons">
              <button className="view-history-button" onClick={() => navigate('/stats')}>
                예매 기록 보기
              </button>
              <button className="restart-button" onClick={handleRestart}>
                다시 연습하기
              </button>
            </div>
          </div>
        );
        
      default:
        return <div>알 수 없는 상태입니다.</div>;
    }
  };
  
  return (
    <div className="ticketing-page">
      {renderCurrentStep()}
    </div>
  );
};

export default TicketingPage;