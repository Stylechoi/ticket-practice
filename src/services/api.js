// 임시 API 서비스
// 실제 구현에서는 axios 등을 사용하여 백엔드와 통신

// 공연장 레이아웃 가져오기
export const getVenueLayout = async (venueId) => {
  // 실제로는 API 호출
  // 현재는 가짜 데이터 반환
  
  // 기본 공연장 레이아웃
  const defaultVenue = {
    id: 'default',
    name: '티켓팅 연습장',
    type: 'concert',
    capacity: 400,
    image: '/images/venues/default.svg',
    zones: [
      {
        id: 'A',
        name: 'A구역',
        grade: 'VIP',
        rows: Array(5).fill().map((_, rowIndex) => ({
          id: String.fromCharCode(65 + rowIndex), // A, B, C, D, E
          name: String.fromCharCode(65 + rowIndex) + '열',
          seats: Array(10).fill().map((_, seatIndex) => ({
            id: seatIndex + 1,
            name: String(seatIndex + 1),
            isSpecial: false
          }))
        }))
      },
      {
        id: 'B',
        name: 'B구역',
        grade: 'R',
        rows: Array(5).fill().map((_, rowIndex) => ({
          id: String.fromCharCode(70 + rowIndex), // F, G, H, I, J
          name: String.fromCharCode(70 + rowIndex) + '열',
          seats: Array(10).fill().map((_, seatIndex) => ({
            id: seatIndex + 1,
            name: String(seatIndex + 1),
            isSpecial: false
          }))
        }))
      },
      {
        id: 'C',
        name: 'C구역',
        grade: 'S',
        rows: Array(5).fill().map((_, rowIndex) => ({
          id: String.fromCharCode(75 + rowIndex), // K, L, M, N, O
          name: String.fromCharCode(75 + rowIndex) + '열',
          seats: Array(10).fill().map((_, seatIndex) => ({
            id: seatIndex + 1,
            name: String(seatIndex + 1),
            isSpecial: false
          }))
        }))
      },
      {
        id: 'D',
        name: 'D구역',
        grade: 'A',
        rows: Array(5).fill().map((_, rowIndex) => ({
          id: String.fromCharCode(80 + rowIndex), // P, Q, R, S, T
          name: String.fromCharCode(80 + rowIndex) + '열',
          seats: Array(10).fill().map((_, seatIndex) => ({
            id: seatIndex + 1,
            name: String(seatIndex + 1),
            isSpecial: false
          }))
        }))
      }
    ],
    hasStage: true,
    description: '기본 공연장 레이아웃'
  };
  
  // 올림픽홀 레이아웃
  const olympicHall = {
    id: 'olympic',
    name: '올림픽홀',
    type: 'concert',
    capacity: 2500,
    image: '/images/venues/olympic.svg',
    zones: [
      {
        id: 'VIP',
        name: 'VIP석',
        grade: 'VIP',
        rows: Array(5).fill().map((_, rowIndex) => ({
          id: String.fromCharCode(65 + rowIndex), // A, B, C, D, E
          name: String.fromCharCode(65 + rowIndex) + '열',
          seats: Array(20).fill().map((_, seatIndex) => ({
            id: seatIndex + 1,
            name: String(seatIndex + 1),
            isSpecial: false
          }))
        }))
      },
      {
        id: 'R',
        name: 'R석',
        grade: 'R',
        rows: Array(8).fill().map((_, rowIndex) => ({
          id: String.fromCharCode(70 + rowIndex), // F, G, H, I, J, K, L, M
          name: String.fromCharCode(70 + rowIndex) + '열',
          seats: Array(25).fill().map((_, seatIndex) => ({
            id: seatIndex + 1,
            name: String(seatIndex + 1),
            isSpecial: seatIndex === 12 && rowIndex === 4 // 하나는 특별석으로
          }))
        }))
      },
      {
        id: 'S',
        name: 'S석',
        grade: 'S',
        rows: Array(10).fill().map((_, rowIndex) => ({
          id: String.fromCharCode(78 + rowIndex), // N ~ W
          name: String.fromCharCode(78 + rowIndex) + '열',
          seats: Array(30).fill().map((_, seatIndex) => ({
            id: seatIndex + 1,
            name: String(seatIndex + 1),
            isSpecial: (seatIndex === 0 || seatIndex === 29) && rowIndex < 3 // 맨 양쪽 끝은 특별석
          }))
        }))
      },
      {
        id: 'A',
        name: 'A석',
        grade: 'A',
        rows: Array(8).fill().map((_, rowIndex) => ({
          id: String.fromCharCode(88 + rowIndex), // X, Y, Z, AA, BB, CC, DD, EE
          name: rowIndex < 3 ? String.fromCharCode(88 + rowIndex) + '열' : 'AA' + (rowIndex - 3) + '열',
          seats: Array(35).fill().map((_, seatIndex) => ({
            id: seatIndex + 1,
            name: String(seatIndex + 1),
            isSpecial: false
          }))
        }))
      }
    ],
    hasStage: true,
    description: '올림픽홀 레이아웃'
  };
  
  // 스타디움 레이아웃
  const stadium = {
    id: 'stadium',
    name: '고척 스카이돔',
    type: 'stadium',
    capacity: 3000,
    image: '/images/venues/stadium.svg',
    zones: [
      // 중앙 VIP석
      {
        id: 'CENTER_VIP',
        name: '중앙 VIP석',
        grade: 'VIP',
        rows: Array(3).fill().map((_, rowIndex) => ({
          id: String.fromCharCode(65 + rowIndex),
          name: String.fromCharCode(65 + rowIndex) + '열',
          seats: Array(20).fill().map((_, seatIndex) => ({
            id: seatIndex + 1,
            name: String(seatIndex + 1),
            isSpecial: false
          }))
        }))
      },
      // 우측 스탠드 R석
      {
        id: 'RIGHT_R',
        name: '우측 R석',
        grade: 'R',
        rows: Array(10).fill().map((_, rowIndex) => ({
          id: 'R' + (rowIndex + 1),
          name: 'R' + (rowIndex + 1) + '열',
          seats: Array(20 + rowIndex).fill().map((_, seatIndex) => ({
            id: seatIndex + 1,
            name: String(seatIndex + 1),
            isSpecial: false
          }))
        }))
      },
      // 좌측 스탠드 R석
      {
        id: 'LEFT_R',
        name: '좌측 R석',
        grade: 'R',
        rows: Array(10).fill().map((_, rowIndex) => ({
          id: 'L' + (rowIndex + 1),
          name: 'L' + (rowIndex + 1) + '열',
          seats: Array(20 + rowIndex).fill().map((_, seatIndex) => ({
            id: seatIndex + 1,
            name: String(seatIndex + 1),
            isSpecial: false
          }))
        }))
      },
      // 2층 S석
      {
        id: 'SECOND_S',
        name: '2층 S석',
        grade: 'S',
        rows: Array(15).fill().map((_, rowIndex) => ({
          id: 'S' + (rowIndex + 1),
          name: 'S' + (rowIndex + 1) + '열',
          seats: Array(40).fill().map((_, seatIndex) => ({
            id: seatIndex + 1,
            name: String(seatIndex + 1),
            isSpecial: false
          }))
        }))
      }
    ],
    hasStage: true,
    description: '고척 스카이돔 레이아웃'
  };
  
  // 레이아웃 선택
  let selectedVenue;
  
  switch(venueId) {
    case 'olympic':
      selectedVenue = olympicHall;
      break;
    case 'stadium':
      selectedVenue = stadium;
      break;
    default:
      selectedVenue = defaultVenue;
  }
  
  // 비동기 처리 시뮬레이션 (시간 단축)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(selectedVenue);
    }, 100); // 300ms → 100ms로 단축
  });
};

// 이벤트 설정 가져오기
export const getEventSettings = async (difficulty = 'normal', venueId = 'default') => {
  // 난이도별 설정
  const difficultySettings = {
    easy: {
      sellOutRate: 0.1, // 10% 매진율
      sellOutSpeed: 0.01, // 매우 낮은 매진 속도
      serverLoad: 0.1, // 낮은 서버 부하
      queueEnabled: false, // 대기열 없음
      captchaEnabled: false, // CAPTCHA 없음
      paymentTimeLimit: 120, // 2분 결제 시간
    },
    normal: {
      sellOutRate: 0.3, // 30% 매진율
      sellOutSpeed: 0.03, // 중간 매진 속도
      serverLoad: 0.4, // 중간 서버 부하
      queueEnabled: true, // 대기열 있음
      captchaEnabled: false, // CAPTCHA 없음
      paymentTimeLimit: 60, // 1분 결제 시간
    },
    hard: {
      sellOutRate: 0.6, // 60% 매진율
      sellOutSpeed: 0.08, // 높은 매진 속도
      serverLoad: 0.7, // 높은 서버 부하
      queueEnabled: true, // 대기열 있음
      captchaEnabled: true, // CAPTCHA 있음
      paymentTimeLimit: 45, // 45초 결제 시간
    },
    nightmare: {
      sellOutRate: 0.9, // 90% 매진율
      sellOutSpeed: 0.15, // 매우 높은 매진 속도
      serverLoad: 0.95, // 극도의 서버 부하
      queueEnabled: true, // 대기열 있음
      captchaEnabled: true, // CAPTCHA 있음
      paymentTimeLimit: 30, // 30초 결제 시간
    }
  };
  
  // 공연장별 가격 설정
  const venuePrices = {
    default: {
      VIP: 120000,
      R: 100000,
      S: 80000,
      A: 60000,
      B: 40000
    },
    olympic: {
      VIP: 150000,
      R: 130000,
      S: 100000,
      A: 80000,
      B: 60000
    },
    stadium: {
      VIP: 180000,
      R: 150000,
      S: 120000,
      A: 90000,
      B: 70000
    }
  };
  
  // 설정 생성
  const settings = {
    id: `event-${venueId}-${difficulty}`,
    name: '티켓팅 연습 이벤트',
    venueId,
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    ticketingStartTime: new Date().toISOString(),
    difficulty,
    ...difficultySettings[difficulty],
    prices: venuePrices[venueId] || venuePrices.default,
    maxSelectableSeats: 4
  };
  
  // 비동기 처리 시뮬레이션 (시간 단축)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(settings);
    }, 50); // 200ms → 50ms로 단축
  });
};

// 사용 가능한 공연장 목록 가져오기
export const getAvailableVenues = async () => {
  const venues = [
    {
      id: 'default',
      name: '티켓팅 연습장',
      capacity: 400,
      image: '/images/venues/default.svg'  // 이미지 경로 수정
    },
    {
      id: 'olympic',
      name: '올림픽홀',
      capacity: 2500,
      image: '/images/venues/olympic.svg'  // 이미지 경로 수정
    },
    {
      id: 'stadium',
      name: '고척 스카이돔',
      capacity: 3000,
      image: '/images/venues/stadium.svg'  // 이미지 경로 수정
    }
  ];
  
  // 비동기 처리 시뮬레이션 (시간 단축)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(venues);
    }, 50); // 200ms → 50ms로 단축
  });
};

// 로그인 API
export const login = async (credentials) => {
  // 실제로는 서버에 인증 요청
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        user: {
          username: credentials.username,
          name: credentials.username,
          email: `${credentials.username}@example.com`,
          points: 5000
        },
        token: 'dummy-token'
      });
    }, 200); // 500ms → 200ms로 단축
  });
};

// 로그아웃 API
export const logout = async () => {
  // 실제로는 서버에 로그아웃 요청
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true });
    }, 50); // 200ms → 50ms로 단축
  });
};

// 회원가입 API
export const register = async (userData) => {
  // 실제로는 서버에 회원가입 요청
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        message: '회원가입이 완료되었습니다.'
      });
    }, 300); // 800ms → 300ms로 단축
  });
};

// 토큰 갱신 API
export const refreshToken = async (token) => {
  // 실제로는 서버에 토큰 갱신 요청
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        username: 'user',
        name: 'User Name',
        email: 'user@example.com',
        points: 5000
      });
    }, 100); // 300ms → 100ms로 단축
  });
};

// 카드 결제 처리 API (새로 추가)
export const processCardPayment = async (cardInfo, amount) => {
  // 카드 정보: 카드번호, 만료일, CVV, 소유자명
  // 실제로는 서버에 결제 요청
  return new Promise((resolve, reject) => {
    // 결제 처리 시뮬레이션 (600ms)
    setTimeout(() => {
      // 95% 확률로 결제 성공
      if (Math.random() < 0.95) {
        resolve({
          success: true,
          transactionId: 'TID' + Math.floor(Math.random() * 1000000000).toString().padStart(10, '0'),
          timestamp: new Date().toISOString(),
          paymentMethod: 'card',
          cardInfo: {
            lastFourDigits: cardInfo.cardNumber.substr(-4),
            cardType: getCardType(cardInfo.cardNumber)
          },
          amount: amount,
          status: 'completed'
        });
      } else {
        // 결제 실패
        reject({
          success: false,
          errorCode: 'PAYMENT_FAILED',
          errorMessage: getRandomErrorMessage(),
          timestamp: new Date().toISOString()
        });
      }
    }, 600);
  });
};

// 카드 타입 식별 함수
function getCardType(cardNumber) {
  // 간단한 카드 타입 식별 로직
  const firstDigit = cardNumber.charAt(0);
  const first4Digits = cardNumber.substr(0, 4);
  
  if (firstDigit === '4') return 'VISA';
  if (firstDigit === '5') return 'MASTERCARD';
  if (first4Digits === '3528' || first4Digits === '3529') return 'JCB';
  if (firstDigit === '3') return 'AMEX';
  if (firstDigit === '6') return 'DISCOVER';
  
  return 'UNKNOWN';
}

// 랜덤 에러 메시지
function getRandomErrorMessage() {
  const errorMessages = [
    '카드 잔액이 부족합니다.',
    '네트워크 연결 오류가 발생했습니다.',
    '카드 정보가 올바르지 않습니다.',
    '결제가 거부되었습니다.',
    '은행 서버 오류가 발생했습니다.',
    '카드 유효기간이 만료되었습니다.',
    '일일 결제 한도를 초과했습니다.'
  ];
  
  return errorMessages[Math.floor(Math.random() * errorMessages.length)];
}