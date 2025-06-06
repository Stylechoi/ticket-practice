import React, { createContext, useReducer, useContext, useEffect } from 'react';

// 초기 상태
const initialState = {
  seatLayout: [],
  soldSeats: [],
  selectedSeats: [],
  timeLeft: 120, // 기본값 2분으로 설정
  isActive: false,
  history: [],
  paymentStatus: null,
  event: null, // 이벤트 설정 저장
  timedOut: false // 타임아웃 발생 여부
};

// 티켓팅 리듀서
function ticketingReducer(state, action) {
  switch (action.type) {
    case 'SET_EVENT':
      return { ...state, event: action.payload };
      
    case 'SET_SEAT_LAYOUT':
      return { ...state, seatLayout: action.payload };
    
    case 'UPDATE_SOLD_SEATS':
      return { ...state, soldSeats: action.payload };
    
    case 'SELECT_SEAT':
      // 최대 4석까지만 선택 가능
      if (state.selectedSeats.length >= 4) return state;
      
      return { 
        ...state, 
        selectedSeats: [...state.selectedSeats, action.payload] 
      };
    
    case 'SELECT_SEATS':
      return { 
        ...state, 
        selectedSeats: action.payload 
      };
      
    case 'DESELECT_SEAT':
      return { 
        ...state, 
        selectedSeats: state.selectedSeats.filter(seat => 
          `${seat.zone}-${seat.row}-${seat.seat}` !== action.payload
        ) 
      };
    
    case 'TICK_TIMER':
      // 타이머가 0이 되면 타이머를 멈춤
      const newTimeLeft = Math.max(0, state.timeLeft - 1);
      return { 
        ...state, 
        timeLeft: newTimeLeft,
        isActive: newTimeLeft > 0 ? state.isActive : false
      };
    
    case 'RESET_TIMER':
      return { ...state, timeLeft: action.payload || 60 };
    
    case 'SET_ACTIVE':
      return { ...state, isActive: action.payload };
    
    case 'RESET_SELECTION':
      return { ...state, selectedSeats: [] };
      
    case 'RESET_STATE':
      return {
        ...initialState,
        history: state.history,
        seatLayout: state.seatLayout,
        event: state.event,
        soldSeats: state.soldSeats,
        timedOut: false
      };
      
    case 'SET_TIMEOUT':
      return {
        ...state,
        timedOut: action.payload
      };
    
    case 'SAVE_HISTORY':
      const newHistory = [...state.history, action.payload];
      // 최대 10개까지만 기록 유지
      if (newHistory.length > 10) newHistory.shift();
      return { ...state, history: newHistory };
    
    case 'CLEAR_HISTORY':
      // 히스토리 삭제 시 로컬 스토리지도 직접 업데이트
      localStorage.removeItem('ticket-history');
      localStorage.removeItem('ticket-sold-seats');
      return { 
        ...state, 
        history: [],
        soldSeats: [] // 매진된 좌석 정보도 함께 초기화
      };
    
    case 'SET_PAYMENT_STATUS':
      return { ...state, paymentStatus: action.payload };
    
    case 'SAVE_PAYMENT_RESULT':
      // 결제 결과 저장 및 선택 좌석 초기화
      const historyEntry = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        seats: action.payload.seats,
        result: action.payload.paymentInfo.status === 'completed' ? '성공' : '실패',
        paymentInfo: action.payload.paymentInfo
      };
      
      return {
        ...state,
        selectedSeats: [],
        history: [historyEntry, ...state.history].slice(0, 10),
        // 결제 성공한 좌석은 매진 처리
        soldSeats: action.payload.paymentInfo.status === 'completed'
          ? [...state.soldSeats, ...action.payload.seats.map(seat => 
              `${seat.zone}-${seat.row}-${seat.seat}`
            )]
          : state.soldSeats
      };
    
    case 'RESET':
      return {
        ...initialState,
        history: state.history,
        seatLayout: state.seatLayout,
        event: state.event
      };
    
    default:
      return state;
  }
}

// 컨텍스트 생성
export const TicketingContext = createContext();

// 프로바이더 컴포넌트
export const TicketingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ticketingReducer, initialState);
  
  // 로컬 스토리지에서 히스토리 로드
  useEffect(() => {
    const storedHistory = localStorage.getItem('ticket-history');
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory)) {
          dispatch({
            type: 'SAVE_HISTORY',
            payload: parsedHistory
          });
        }
      } catch (error) {
        console.error('Failed to parse stored history:', error);
      }
    }
  }, []);
  
  // 히스토리 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('ticket-history', JSON.stringify(state.history));
  }, [state.history]);
  
  // 타이머 처리
  useEffect(() => {
    let timer;
    
    if (state.isActive && state.timeLeft > 0) {
      timer = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state.isActive, state.timeLeft]);
  
  return (
    <TicketingContext.Provider value={{ state, dispatch }}>
      {children}
    </TicketingContext.Provider>
  );
};

// 커스텀 훅
export const useTicketing = () => {
  const context = useContext(TicketingContext);
  if (context === undefined) {
    throw new Error('useTicketing must be used within a TicketingProvider');
  }
  return context;
};
