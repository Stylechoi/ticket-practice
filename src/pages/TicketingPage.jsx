import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTicketing } from '../contexts/TicketingContext';
import DifficultySelector from '../components/ticketing/DifficultySelector';
import VenueSelector from '../components/ticketing/VenueSelector';
import EventHeader from '../components/ticketing/EventHeader';
import WaitingRoom from '../components/ticketing/WaitingRoom';
import SeatMap from '../components/ticketing/SeatMap';
import PaymentForm from '../components/payment/PaymentForm';
import SEO from '../components/SEO';
import { getEventSettings, getVenueLayout } from '../services/api';
import '../styles/pages/Ticketing.css';

const TicketingPage = () => {
  const { state, dispatch } = useTicketing();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState('setup'); // setup, waiting, seats, payment, complete
  const [selectedDifficulty, setSelectedDifficulty] = useState('normal');
  const [selectedVenue, setSelectedVenue] = useState(null);
  
  // SEO 타이틀 및 설명 설정
  const seoTitle = currentStep === 'setup' 
    ? '티켓팅 훈련소 - 실전처럼 티켓팅 연습하기'
    : currentStep === 'waiting' 
      ? '티켓팅 대기실 - 실제 티켓팅처럼 대기하기'
      : currentStep === 'seats'
        ? '좌석 선택 - 티켓팅 실전 연습'
        : currentStep === 'payment'
          ? '결제 진행 - 티켓팅 미리보기'
          : '티켓팅 완료 - 성공적인 티켓팅 연습';
  
  const seoDescription = currentStep === 'setup'
    ? '티켓팅 연습 서비스에서 공연장과 난이도를 선택하고 실전처럼 티켓팅을 연습해보세요.'
    : currentStep === 'waiting'
      ? '실제 티켓팅 대기열을 시뮬레이션합니다.'
      : currentStep === 'seats'
        ? '제한 시간 내에 좌석을 선택하는 연습을 할 수 있습니다.'
        : currentStep === 'payment'
          ? '티켓팅의 마지막 단계인 결제 과정을 연습해보세요.'
          : '티켓팅 연습을 성공적으로 완료했습니다.';
  
  // 타임아웃 처리를 위한 단일 효과
  useEffect(() => {
    // 타이머가 0이 되었을 때만 실행
    if (state.timeLeft === 0 && (currentStep === 'seats' || currentStep === 'payment')) {
      // 중복 알림 방지를 위해 모든 토스트 제거
      toast.dismiss();
      
      // 타이머 비활성화
      dispatch({ type: 'SET_ACTIVE', payload: false });
      
      // 로그 기록
      console.log(`타임아웃 발생: ${currentStep} 단계에서 시간 초과`);
      
      // 단일 알림 표시
      toast.error(
        currentStep === 'seats' 
          ? '좌석 선택 시간이 초과되었습니다!'
          : '결제 시간이 초과되었습니다!', 
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            background: "#ff3333",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
            padding: "10px 16px",
            whiteSpace: "nowrap",
            borderRadius: "4px"
          },
        }
      );
      
      // 실패 기록 저장
      dispatch({
        type: 'SAVE_HISTORY',
        payload: {
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          seats: currentStep === 'seats' ? [] : state.selectedSeats,
          result: '실패 (시간 초과)',
          venue: selectedVenue?.name
        }
      });
      
      // 실패 화면으로 전환
      setCurrentStep('failed');
    }
  }, [state.timeLeft, currentStep, dispatch, state.selectedSeats, selectedVenue]);
  
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
      
      // 매진된 좌석 설정
      dispatch({
        type: 'UPDATE_SOLD_SEATS',
        payload: settings.soldOutSeats || []
      });
      
      // 상태 초기화
      dispatch({ type: 'RESET_STATE' });
      
      // 좌석 선택 시간 설정 (타이머는 비활성화 상태로)
      dispatch({ 
        type: 'RESET_TIMER', 
        payload: settings.seatSelectionTimeLimit || 120 
      });
      
      dispatch({
        type: 'SET_ACTIVE',
        payload: false
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
        
        // 이동 후 타이머 시작 (좌석 선택 시간으로 설정)
        setTimeout(() => {
          dispatch({ 
            type: 'RESET_TIMER', 
            payload: state.event?.seatSelectionTimeLimit || 120 
          });
          
          // 타이머 활성화
          dispatch({
            type: 'SET_ACTIVE',
            payload: true
          });
        }, 300);
      } else {
        // 대기열 시작
        setCurrentStep('waiting');
      }
    }
  }, [loadEventSettings, selectedVenue, selectedDifficulty, dispatch, state.event]);
  
  // 대기열에서 입장 처리
  const handleEnterFromWaiting = useCallback(() => {
    // 좌석 페이지로 이동
    setCurrentStep('seats');
    
    // 이동 후 타이머 시작 (좌석 선택 시간으로 설정)
    setTimeout(() => {
      dispatch({ 
        type: 'RESET_TIMER', 
        payload: state.event?.seatSelectionTimeLimit || 60 
      });
      
      // 타이머 활성화
      dispatch({
        type: 'SET_ACTIVE',
        payload: true
      });
    }, 300); // 페이지 전환 후 약간의 딜레이를 줌
  }, [dispatch, state.event]);
  
  // 좌석 선택 완료 처리
  const handleSeatSelectionComplete = useCallback((selectedSeats) => {
    if (selectedSeats.length === 0) {
      toast.error('좌석을 선택해주세요.');
      return;
    }
    
    // 타이머 일시 정지
    dispatch({
      type: 'SET_ACTIVE',
      payload: false
    });
    
    // 결제 페이지로 이동
    setCurrentStep('payment');
    
    // 선택된 좌석 저장
    dispatch({
      type: 'SELECT_SEATS',
      payload: selectedSeats
    });
    
    // 결제 시간으로 타이머 재설정 (잠시 후 시작)
    setTimeout(() => {
      dispatch({
        type: 'RESET_TIMER', 
        payload: state.event?.paymentTimeLimit || 60
      });
      
      // 타이머 활성화
      dispatch({
        type: 'SET_ACTIVE',
        payload: true
      });
    }, 300);
  }, [dispatch, state.event]);
  
  // 결제 완료 처리
  const handlePaymentComplete = useCallback((paymentResult) => {
    toast.success('결제가 완료되었습니다!');
    
    // 결제 정보 저장
    dispatch({
      type: 'SAVE_PAYMENT_RESULT',
      payload: paymentResult
    });
    
    // 완료 페이지로 이동
    setCurrentStep('complete');
  }, [dispatch]);
  
  // 결제 취소 처리
  const handlePaymentCancel = useCallback(() => {
    toast.info('결제가 취소되었습니다.');
    
    // 좌석 선택 페이지로 돌아가기
    setCurrentStep('seats');
  }, []);
  
  // 다시 시작
  const handleRestart = useCallback(() => {
    // 토스트 메시지 모두 닫기
    toast.dismiss();
    
    // 모든 상태 초기화
    dispatch({ type: 'RESET_STATE' });
    dispatch({ type: 'SET_ACTIVE', payload: false });
    setCurrentStep('setup');
  }, [dispatch]);
  
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
                  <p>대기열 없음, 매진율 낮음(10%), 서버 안정적</p>
                  <p>좌석 선택 시간: 2분, 결제 시간: 3분</p>
                  <p>초보자에게 적합한 모드입니다.</p>
                </div>
              )}
              
              {selectedDifficulty === 'normal' && (
                <div className="difficulty-info">
                  <h4>보통 모드</h4>
                  <p>짧은 대기열, 중간 매진율(30%), 약간의 서버 지연</p>
                  <p>좌석 선택 시간: 20초, 결제 시간: 1분</p>
                  <p>실제 티켓팅과 유사한 난이도입니다.</p>
                </div>
              )}
              
              {selectedDifficulty === 'hard' && (
                <div className="difficulty-info">
                  <h4>어려움 모드</h4>
                  <p>긴 대기열, 높은 매진율(60%), 서버 지연 및 오류 발생</p>
                  <p>좌석 선택 시간: 8초, 결제 시간: 45초</p>
                  <p>인기 공연 티켓팅 수준의 난이도입니다.</p>
                </div>
              )}
              
              {selectedDifficulty === 'nightmare' && (
                <div className="difficulty-info">
                  <h4>악몽 모드</h4>
                  <p>매우 긴 대기열, 매우 높은 매진율(90%), 심각한 서버 지연 및 오류</p>
                  <p>좌석 선택 시간: 4초, 결제 시간: 30초</p>
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
        
      case 'payment':
        // 결제 페이지 추가
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
              mode="payment"
            />
            {/* 결제 컴포넌트 추가 */}
            <div className="payment-page">
              <PaymentForm 
                selectedSeats={state.selectedSeats}
                onPaymentComplete={handlePaymentComplete}
                onCancel={handlePaymentCancel}
              />
            </div>
          </>
        );
      
      case 'failed':
        return (
          <div className="failed-container">
            <div className="failed-animation">
              <div className="cross-circle">
                <div className="cross"></div>
              </div>
            </div>
            
            <h2>예매 실패!</h2>
            <p className="failed-message">시간 초과로 인해 예매에 실패했습니다.</p>
            <p className="failed-tip">Tip: 시간 제한이 있는 티켓팅에서는 빠른 결정이 중요합니다.</p>
            
            <div className="action-buttons">
              <button 
                className="restart-button" 
                onClick={handleRestart}
              >
                다시 연습하기
              </button>
            </div>
          </div>
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
      <SEO title={seoTitle} description={seoDescription} />
      {renderCurrentStep()}
    </div>
  );
};

export default TicketingPage;