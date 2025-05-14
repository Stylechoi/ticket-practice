import React, { useState, useEffect } from 'react';
import { useTicketing } from '../../contexts/TicketingContext';
import '../../styles/components/PaymentForm.css';

const PaymentForm = ({ selectedSeats, onPaymentComplete, onCancel }) => {
  const { state, dispatch } = useTicketing();
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [formattedCardNumber, setFormattedCardNumber] = useState('');
  const [formattedExpiry, setFormattedExpiry] = useState('');
  
  // 총 결제 금액 계산
  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  
  // 카드번호 입력 처리
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // 16자리로 제한
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    
    // 4자리마다 공백 추가
    let formatted = '';
    for (let i = 0; i < value.length; i += 4) {
      formatted += value.slice(i, i + 4) + ' ';
    }
    formatted = formatted.trim();
    
    setFormattedCardNumber(formatted);
    setCardInfo({
      ...cardInfo,
      cardNumber: value
    });
  };
  
  // 유효기간 입력 처리
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // 4자리로 제한
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    
    // MM/YY 형식으로 변환
    let formatted = '';
    if (value.length > 0) {
      // 첫 두 자리는 월
      let month = value.slice(0, 2);
      // 월은 1~12 범위로 제한
      if (month.length === 1) {
        if (month > '1') {
          month = '0' + month;
        }
      } else if (month.length === 2) {
        if (parseInt(month) > 12) {
          month = '12';
        } else if (parseInt(month) === 0) {
          month = '01';
        }
      }
      
      formatted = month;
      
      // 나머지는 연도
      if (value.length > 2) {
        formatted += '/' + value.slice(2);
      }
    }
    
    setFormattedExpiry(formatted);
    setCardInfo({
      ...cardInfo,
      expiry: value
    });
  };
  
  // CVV 입력 처리
  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // 3자리로 제한
    if (value.length > 3) {
      value = value.slice(0, 3);
    }
    
    setCardInfo({
      ...cardInfo,
      cvv: value
    });
  };
  
  // 이름 입력 처리
  const handleNameChange = (e) => {
    setCardInfo({
      ...cardInfo,
      name: e.target.value
    });
  };
  
  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 유효성 검사
    const newErrors = {};
    
    if (cardInfo.cardNumber.length !== 16) {
      newErrors.cardNumber = '카드 번호는 16자리여야 합니다.';
    }
    
    if (cardInfo.expiry.length !== 4) {
      newErrors.expiry = '유효기간은 월/년(MM/YY) 형식이어야 합니다.';
    } else {
      const month = parseInt(cardInfo.expiry.slice(0, 2));
      if (month < 1 || month > 12) {
        newErrors.expiry = '유효한 월(1~12)을 입력해주세요.';
      }
    }
    
    if (cardInfo.cvv.length !== 3) {
      newErrors.cvv = 'CVV는 3자리여야 합니다.';
    }
    
    if (!cardInfo.name.trim()) {
      newErrors.name = '카드 소유자 이름을 입력해주세요.';
    }
    
    setErrors(newErrors);
    
    // 에러가 없으면 결제 진행
    if (Object.keys(newErrors).length === 0) {
      processPayment();
    }
  };
  
  // 결제 처리
  const processPayment = () => {
    setIsProcessing(true);
    
    // 결제 처리 시뮬레이션 (2초 후 완료)
    setTimeout(() => {
      // 결제 결과 저장
      const paymentResult = {
        seats: selectedSeats,
        paymentInfo: {
          status: 'completed',
          transactionId: 'T' + Date.now(),
          amount: totalAmount,
          cardInfo: {
            lastFour: cardInfo.cardNumber.slice(-4),
            type: getCardType(cardInfo.cardNumber)
          },
          timestamp: new Date().toISOString()
        }
      };
      
      // 결제 완료 콜백 호출
      onPaymentComplete(paymentResult);
      
      setIsProcessing(false);
    }, 2000);
  };
  
  // 카드 타입 판별
  const getCardType = (number) => {
    // 간단한 카드 타입 판별 (실제로는 더 복잡할 수 있음)
    const firstDigit = number.charAt(0);
    const firstTwoDigits = number.substring(0, 2);
    
    if (firstDigit === '4') return 'VISA';
    if (['51', '52', '53', '54', '55'].includes(firstTwoDigits)) return 'MasterCard';
    if (['34', '37'].includes(firstTwoDigits)) return 'American Express';
    if (['62', '88'].includes(firstTwoDigits)) return 'UnionPay';
    
    return '신용카드';
  };
  
  return (
    <div className="payment-form-container">
      <div className="payment-header">
        <h2>결제 정보 입력</h2>
        <div className="payment-amount">
          총 결제금액: <span>{totalAmount.toLocaleString()}원</span>
        </div>
      </div>
      
      <div className="payment-notice">
        <strong>※ 주의사항</strong>
        <p>이 페이지는 연습용입니다. 실제 카드 정보를 입력하지 마시고 임의의 숫자를 입력해주세요.</p>
        <p>입력하신 정보는 서버에 저장되지 않으며, 연습 목적으로만 사용됩니다.</p>
      </div>
      
      <div className="payment-details">
        <div className="selected-seats-info">
          <h3>선택 좌석 정보</h3>
          <ul>
            {selectedSeats.map((seat, index) => (
              <li key={index}>
                {seat.zone}구역 {seat.row}열 {seat.seat}번 - {seat.price.toLocaleString()}원
              </li>
            ))}
          </ul>
        </div>
        
        <form className="card-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">카드 번호</label>
            <input
              type="text"
              id="cardNumber"
              value={formattedCardNumber}
              onChange={handleCardNumberChange}
              placeholder="임의의 16자리 숫자 (예: 1234 5678 9012 3456)"
              className={errors.cardNumber ? 'error' : ''}
            />
            <div className="input-hint">※ 실제 카드번호가 아닌 임의의 숫자를 입력해주세요</div>
            {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiry">유효기간</label>
              <input
                type="text"
                id="expiry"
                value={formattedExpiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY (예: 12/25)"
                className={errors.expiry ? 'error' : ''}
              />
              <div className="input-hint">※ 임의의 월/년 형식</div>
              {errors.expiry && <div className="error-message">{errors.expiry}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                value={cardInfo.cvv}
                onChange={handleCvvChange}
                placeholder="임의의 3자리 숫자"
                className={errors.cvv ? 'error' : ''}
              />
              <div className="input-hint">※ 실제 코드 입력 금지</div>
              {errors.cvv && <div className="error-message">{errors.cvv}</div>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="name">카드 소유자 이름</label>
            <input
              type="text"
              id="name"
              value={cardInfo.name}
              onChange={handleNameChange}
              placeholder="임의의 이름 (예: 홍길동)"
              className={errors.name ? 'error' : ''}
            />
            <div className="input-hint">※ 실제 이름이 아닌 임의의 이름 입력</div>
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          
          <div className="payment-timer">
            결제 시간 남음: <span>{state.timeLeft}초</span>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={onCancel}
              disabled={isProcessing}
            >
              취소
            </button>
            <button 
              type="submit" 
              className="pay-button"
              disabled={isProcessing}
            >
              {isProcessing ? '처리 중...' : `${totalAmount.toLocaleString()}원 결제하기`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;