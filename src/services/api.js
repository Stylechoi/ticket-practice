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
      paymentTimeLimit: 180, // 3분 결제 시간
      seatSelectionTimeLimit: 120, // 2분 좌석 선택 시간
      soldOutSeats: await generateEvenlySoldOutSeats(0.1, venueId) // 10% 매진
    },
    normal: {
      sellOutRate: 0.3, // 30% 매진율
      sellOutSpeed: 0.03, // 중간 매진 속도
      serverLoad: 0.4, // 중간 서버 부하
      queueEnabled: true, // 대기열 있음
      captchaEnabled: false, // CAPTCHA 없음
      paymentTimeLimit: 60, // 1분 결제 시간
      seatSelectionTimeLimit: 20, // 20초 좌석 선택 시간
      soldOutSeats: await generateEvenlySoldOutSeats(0.3, venueId) // 30% 매진
    },
    hard: {
      sellOutRate: 0.6, // 60% 매진율
      sellOutSpeed: 0.08, // 높은 매진 속도
      serverLoad: 0.7, // 높은 서버 부하
      queueEnabled: true, // 대기열 있음
      captchaEnabled: true, // CAPTCHA 있음
      paymentTimeLimit: 45, // 45초 결제 시간
      seatSelectionTimeLimit: 8, // 8초 좌석 선택 시간
      soldOutSeats: await generateEvenlySoldOutSeats(0.6, venueId) // 60% 매진
    },
    nightmare: {
      sellOutRate: 0.9, // 90% 매진율
      sellOutSpeed: 0.15, // 매우 높은 매진 속도
      serverLoad: 0.95, // 극도의 서버 부하
      queueEnabled: true, // 대기열 있음
      captchaEnabled: true, // CAPTCHA 있음
      paymentTimeLimit: 30, // 30초 결제 시간
      seatSelectionTimeLimit: 4, // 4초 좌석 선택 시간 (3초에서 4초로 변경)
      soldOutSeats: await generateEvenlySoldOutSeats(0.9, venueId) // 90% 매진
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

// 매진된 좌석 생성 함수
function generateSoldOutSeats(sellOutRate, venueId) {
  const soldOutSeats = [];
  let venue;
  
  // 공연장 정보 가져오기
  switch(venueId) {
    case 'olympic':
      venue = {
        zones: [
          { id: 'VIP', rowCount: 5, seatCount: 20 },
          { id: 'R', rowCount: 8, seatCount: 25 },
          { id: 'S', rowCount: 10, seatCount: 30 },
          { id: 'A', rowCount: 8, seatCount: 35 }
        ]
      };
      break;
    case 'stadium':
      venue = {
        zones: [
          { id: 'CENTER_VIP', rowCount: 3, seatCount: 20 },
          { id: 'RIGHT_R', rowCount: 10, seatCount: 30 },
          { id: 'LEFT_R', rowCount: 10, seatCount: 30 },
          { id: 'SECOND_S', rowCount: 15, seatCount: 40 }
        ]
      };
      break;
    default:
      venue = {
        zones: [
          { id: 'A', rowCount: 5, seatCount: 10 },
          { id: 'B', rowCount: 5, seatCount: 10 },
          { id: 'C', rowCount: 5, seatCount: 10 },
          { id: 'D', rowCount: 5, seatCount: 10 }
        ]
      };
  }
  
  // 난이도 판별 (어려움 또는 악몽 모드)
  const isHardMode = sellOutRate >= 0.6; // 60% 이상 = 어려움/악몽
  const isNightmareMode = sellOutRate >= 0.85; // 85% 이상 = 악몽
  
  // 각 공연장 별 특수 처리
  const isStadium = venueId === 'stadium'; // 고척스카이돔
  const isOlympic = venueId === 'olympic'; // 올림픽홀
  const isDefault = !isStadium && !isOlympic; // 기본 연습장
  
  // 전체 구역에 대한 기본 매진율 설정
  // 기존 sellOutRate를 0.7~1.3배로 랜덤하게 조정하여 다양한 매진율 생성
  const baseMultiplier = 0.7 + Math.random() * 0.6; // 0.7~1.3
  const baseSellOutRate = Math.min(1.0, sellOutRate * baseMultiplier);
  
  // 각 구역별로 매진 좌석 생성
  venue.zones.forEach(zone => {
    // 구역 ID (각 공연장 별로)
    const zoneId = zone.id;
    
    // 구역별 매진율 특성
    let isVIP = false;
    let isRSection = false;
    let isSSection = false;
    let isLowTier = false;
    
    // 구역 특성 파악
    if (isOlympic) {
      isVIP = zoneId === 'VIP';
      isRSection = zoneId === 'R';
      isSSection = zoneId === 'S';
      isLowTier = zoneId === 'A';
    } else if (isStadium) {
      isVIP = zoneId === 'CENTER_VIP';
      isRSection = zoneId === 'RIGHT_R' || zoneId === 'LEFT_R';
      isSSection = zoneId === 'SECOND_S';
    } else { // 기본 연습장
      isVIP = zoneId === 'A';
      isRSection = zoneId === 'B';
      isSSection = zoneId === 'C';
      isLowTier = zoneId === 'D';
    }
    
    // 구역마다 매진율 조정 (인기 구역, 난이도에 따라)
    let zoneRate = baseSellOutRate;
    
    // 난이도별 매진율 조정 (어려움/악몽 모드에서 더 산발적, 더 극단적)
    if (isHardMode) {
      if (isVIP) {
        // VIP석 - 난이도 높을수록 더 많이 매진 + 무작위성
        const randomFactor = isNightmareMode ? 0.5 : 0.3;
        zoneRate = Math.min(1, baseSellOutRate * (1.2 + Math.random() * randomFactor));
      } else if (isRSection) {
        // R석 - 어려움/악몽 모드에서 산발적 매진율
        // 악몽 모드에서는 특수 처리 - 고척스카이돔에서는 R석도 높은 매진율 적용
        if (isNightmareMode && isStadium) {
          // 악몽 + 고척스카이돔 R석 경우 높은 매진율 (80%~110%)
          zoneRate = Math.min(1, baseSellOutRate * (0.8 + Math.random() * 0.3));
        } else {
          // 기존 매진율 (70%~110%)
          const randomFactor = isNightmareMode ? 0.4 : 0.3;
          zoneRate = Math.min(1, baseSellOutRate * (0.7 + Math.random() * randomFactor));
        }
      } else if (isSSection) {
        // S석 - 산발적 + 약간 낮은 매진율 (60%~90%)
        const randomFactor = isNightmareMode ? 0.3 : 0.2;
        zoneRate = Math.min(1, baseSellOutRate * (0.6 + Math.random() * randomFactor));
      } else if (isLowTier) {
        // 가장 낮은 등급 - 매진율 낮음 (50%~80%)
        const randomFactor = isNightmareMode ? 0.3 : 0.2;
        zoneRate = Math.min(1, baseSellOutRate * (0.5 + Math.random() * randomFactor));
      } else {
        // 기타 구역 - 기본 매진율에 약간의 랜덤성
        zoneRate = Math.min(1, baseSellOutRate * (0.8 + Math.random() * 0.4));
      }
    } else {
      // 쉬움/보통 모드에서는 구역별 특성에 따라 기본 조정
      if (isVIP) {
        zoneRate = Math.min(1, baseSellOutRate * (1.0 + Math.random() * 0.2)); // 100%~120%
      } else if (isRSection) {
        zoneRate = Math.min(1, baseSellOutRate * (0.9 + Math.random() * 0.2)); // 90%~110%
      } else if (isSSection) {
        zoneRate = Math.min(1, baseSellOutRate * (0.8 + Math.random() * 0.2)); // 80%~100%
      } else if (isLowTier) {
        zoneRate = Math.min(1, baseSellOutRate * (0.7 + Math.random() * 0.2)); // 70%~90%
      } else {
        zoneRate = Math.min(1, baseSellOutRate * (0.8 + Math.random() * 0.2)); // 80%~100%
      }
    }
    
    // 모든 구역에 최소 매진율 적용 (최소 30%)
    zoneRate = Math.max(0.3, zoneRate);
    
    // 악몽 모드에서는 최소 매진율 높임 (최소 50%, 고척스카이돔 R석은 더 높게)
    if (isNightmareMode) {
      // 악몽 모드에서 고척스카이돔 R석의 경우 최소 매진율 60%로 설정
      if (isStadium && isRSection) {
        zoneRate = Math.max(0.6, zoneRate);
      } else {
        zoneRate = Math.max(0.5, zoneRate);
      }
    }
    
    // 총 좌석 수 및 매진 좌석 수 계산
    const totalSeats = zone.rowCount * zone.seatCount;
    const numberOfSoldSeats = Math.round(totalSeats * zoneRate);
    
    // 난이도별 패턴 비율 조정
    let randomPortion = 0.4; // 기본 40%는 완전 랜덤
    let checkerboardPortion = 0.2; // 기본 20%는 체커보드 패턴
    let blockPortion = 0.2; // 기본 20%는 블록 패턴
    let rowPortion = 0.2; // 기본 20%는 열 기반 패턴
    
    // 어려움/악몽 모드에서 패턴 비율 조정
    if (isHardMode) {
      // 어려움/악몽 모드에서는 더 랜덤하고 산발적으로
      randomPortion = isNightmareMode ? 0.65 : 0.55; // 악몽: 65%, 어려움: 55% 랜덤
      checkerboardPortion = 0.15; // 15%는 체커보드 패턴
      blockPortion = 0.1; // 10%는 블록 패턴 (더 작고 많은 블록)
      rowPortion = 0.1; // 10%는 열 기반 패턴
      
      // 공연장별 특성 반영
      if (isStadium) {
        // 고척스카이돔은 2층 S석에서 더 특별한 패턴
        if (zone.id === 'SECOND_S') {
          // 2층 S석은 아래쪽 열에 더 많은 매진
          generateStadiumSeatDistribution(soldOutSeats, zone, numberOfSoldSeats);
          return; // 다음 구역으로
        } else if (zone.id === 'CENTER_VIP') {
          // VIP석은 중앙이 더 많이 매진
          randomPortion = 0.4;
          checkerboardPortion = 0.1;
          blockPortion = 0.3; // 블록 패턴 더 많이
          rowPortion = 0.2;
        } else if (zone.id === 'RIGHT_R' || zone.id === 'LEFT_R') {
          // 악몽 모드에서는 R석도 특별 패턴 적용
          if (isNightmareMode) {
            randomPortion = 0.5;  // 랜덤 비율 높임
            checkerboardPortion = 0.2;
            blockPortion = 0.15;
            rowPortion = 0.15;
          }
        }
      } else if (isOlympic) {
        // 올림픽홀은 앞쪽 열 위주로 매진
        if (isVIP || isRSection) {
          randomPortion = 0.4;
          checkerboardPortion = 0.1;
          blockPortion = 0.2;
          rowPortion = 0.3; // 열 기반 패턴 더 많이 (앞쪽 열 위주)
        }
      }
    }
    
    const randomCount = Math.floor(numberOfSoldSeats * randomPortion);
    const checkerboardCount = Math.floor(numberOfSoldSeats * checkerboardPortion);
    const blockCount = Math.floor(numberOfSoldSeats * blockPortion);
    const rowCount = numberOfSoldSeats - randomCount - checkerboardCount - blockCount;
    
    // 올림픽홀 VIP/R석은 앞쪽 열 위주로 매진
    if (isOlympic && (isVIP || isRSection) && isHardMode) {
      generateFrontRowHeavyDistribution(soldOutSeats, zone, numberOfSoldSeats, isNightmareMode);
    }
    // 고척스카이돔 R석은 악몽 모드에서 특별 패턴 적용
    else if (isStadium && isRSection && isNightmareMode) {
      generateStadiumRSectionDistribution(soldOutSeats, zone, numberOfSoldSeats);
    } else {
      // 여러 패턴 적용
      if (randomCount > 0) {
        generateRandomSoldSeats(soldOutSeats, zone, randomCount);
      }
      
      if (checkerboardCount > 0) {
        generateScatteredCheckerboardSeats(soldOutSeats, zone, checkerboardCount, isHardMode);
      }
      
      if (blockCount > 0) {
        generateMultipleBlockSeats(soldOutSeats, zone, blockCount, isHardMode);
      }
      
      if (rowCount > 0) {
        generateScatteredRowSeats(soldOutSeats, zone, rowCount, isHardMode);
      }
    }
  });
  
  return soldOutSeats;
}

// 무작위 매진 좌석 생성
function generateRandomSoldSeats(soldOutSeats, zone, count) {
  let soldCount = 0;
  const maxAttempts = count * 3; // 최대 시도 횟수 제한
  let attempts = 0;
  
  while (soldCount < count && attempts < maxAttempts) {
    attempts++;
    
    // 무작위 좌석 선택
    const randomRow = Math.floor(Math.random() * zone.rowCount);
    let randomSeat;
    
    // 고척스카이돔 R석은 행마다 좌석 수가 다름
    if ((zone.id === 'RIGHT_R' || zone.id === 'LEFT_R')) {
      const rowSeatCount = zone.seatCount + randomRow;
      randomSeat = Math.floor(Math.random() * rowSeatCount);
    } else {
      randomSeat = Math.floor(Math.random() * zone.seatCount);
    }
    
    // 행 ID 결정 (공연장 및 구역에 따라 다름)
    let row;
    if (zone.id === 'SECOND_S') {
      // 고척스카이돔 2층 S석은 S1, S2, ... 형식
      row = 'S' + (randomRow + 1);
    } else if (zone.id === 'RIGHT_R') {
      // 고척스카이돔 우측 R석은 R1, R2, ... 형식
      row = 'R' + (randomRow + 1);
    } else if (zone.id === 'LEFT_R') {
      // 고척스카이돔 좌측 R석은 L1, L2, ... 형식
      row = 'L' + (randomRow + 1);
    } else {
      // 일반적인 행은 A, B, C, ... 형식
      row = String.fromCharCode(65 + randomRow);
    }
    
    const seat = randomSeat + 1;
    const seatId = `${zone.id}-${row}-${seat}`;
    
    // 중복 체크
    if (!soldOutSeats.includes(seatId)) {
      soldOutSeats.push(seatId);
      soldCount++;
    }
  }
  
  // 최대 시도 횟수를 초과했는데도 목표 수만큼 채우지 못한 경우
  // 순차적으로 채움 (극도의 중복 방지를 위해)
  if (soldCount < count) {
    // 모든 좌석 ID 생성
    const allSeatsIds = [];
    for (let r = 0; r < zone.rowCount; r++) {
      let rowSeatCount;
      let rowPrefix;
      
      // 고척스카이돔 R석은 행마다 좌석 수가 다름
      if (zone.id === 'RIGHT_R') {
        rowSeatCount = zone.seatCount + r;
        rowPrefix = 'R' + (r + 1);
      } else if (zone.id === 'LEFT_R') {
        rowSeatCount = zone.seatCount + r;
        rowPrefix = 'L' + (r + 1);
      } else if (zone.id === 'SECOND_S') {
        rowSeatCount = zone.seatCount;
        rowPrefix = 'S' + (r + 1);
      } else {
        rowSeatCount = zone.seatCount;
        rowPrefix = String.fromCharCode(65 + r);
      }
      
      for (let s = 0; s < rowSeatCount; s++) {
        const seatId = `${zone.id}-${rowPrefix}-${s + 1}`;
        if (!soldOutSeats.includes(seatId)) {
          allSeatsIds.push(seatId);
        }
      }
    }
    
    // 랜덤하게 섞기
    for (let i = allSeatsIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allSeatsIds[i], allSeatsIds[j]] = [allSeatsIds[j], allSeatsIds[i]];
    }
    
    // 필요한 만큼 추가
    const needMore = count - soldCount;
    for (let i = 0; i < Math.min(needMore, allSeatsIds.length); i++) {
      soldOutSeats.push(allSeatsIds[i]);
      soldCount++;
    }
  }
}

// 블록 패턴 매진 좌석 생성 (특정 영역이 모두 매진)
function generateBlockSoldSeats(soldOutSeats, zone, count) {
  // 블록의 시작 위치 결정
  const blockStartRow = Math.floor(Math.random() * (zone.rowCount - 1));
  const blockStartSeat = Math.floor(Math.random() * (zone.seatCount - 1));
  
  // 블록 크기 결정 (남은 공간 내에서)
  const maxBlockHeight = Math.min(3, zone.rowCount - blockStartRow);
  const maxBlockWidth = Math.min(6, zone.seatCount - blockStartSeat);
  
  const blockHeight = Math.max(1, Math.min(maxBlockHeight, Math.floor(Math.random() * maxBlockHeight) + 1));
  const blockWidth = Math.max(2, Math.min(maxBlockWidth, Math.floor(Math.random() * maxBlockWidth) + 2));
  
  let soldCount = 0;
  
  // 블록 내의 좌석을 매진 처리
  for (let r = 0; r < blockHeight; r++) {
    for (let s = 0; s < blockWidth; s++) {
      // 고척스카이돔 2층 S석은 S1, S2, ... 형식
      let row;
      if (zone.id === 'SECOND_S') {
        row = 'S' + (blockStartRow + r + 1);
      } else {
        row = String.fromCharCode(65 + blockStartRow + r);
      }
      
      const seat = blockStartSeat + s + 1;
      const seatId = `${zone.id}-${row}-${seat}`;
      
      // 중복 체크
      if (!soldOutSeats.includes(seatId)) {
        soldOutSeats.push(seatId);
        soldCount++;
      }
    }
  }
  
  // 남은 매진 좌석은 랜덤으로 채움
  if (count > soldCount) {
    generateRandomSoldSeats(soldOutSeats, zone, count - soldCount);
  }
}

// 산발적인 체커보드 패턴 매진 좌석 생성
function generateScatteredCheckerboardSeats(soldOutSeats, zone, count, isHighDifficulty = false) {
  let soldCount = 0;
  const pattern = Math.floor(Math.random() * 2); // 0 또는 1의 시작 패턴
  
  // 어려움/악몽 모드에서는 더 산발적인 체커보드 패턴
  const randomFactor = isHighDifficulty ? 0.6 : 0.7; // 더 낮을수록 패턴이 더 불규칙
  
  // 체커보드 패턴에 무작위성 추가
  for (let r = 0; r < zone.rowCount && soldCount < count; r++) {
    // 고척스카이돔 R석은 행마다 좌석 수가 다름
    let rowSeatCount;
    let rowPrefix;
    
    if (zone.id === 'RIGHT_R') {
      rowSeatCount = zone.seatCount + r;
      rowPrefix = 'R' + (r + 1);
    } else if (zone.id === 'LEFT_R') {
      rowSeatCount = zone.seatCount + r;
      rowPrefix = 'L' + (r + 1);
    } else if (zone.id === 'SECOND_S') {
      rowSeatCount = zone.seatCount;
      rowPrefix = 'S' + (r + 1);
    } else {
      rowSeatCount = zone.seatCount;
      rowPrefix = String.fromCharCode(65 + r);
    }
    
    for (let s = 0; s < rowSeatCount && soldCount < count; s++) {
      // 기본 체커보드 패턴에 확률 기반으로 변형 추가
      const isCheckerboardPattern = (r + s) % 2 === pattern;
      if (isCheckerboardPattern && Math.random() < randomFactor) {
        const seat = s + 1;
        const seatId = `${zone.id}-${rowPrefix}-${seat}`;
        
        // 중복 체크
        if (!soldOutSeats.includes(seatId)) {
          soldOutSeats.push(seatId);
          soldCount++;
        }
      }
    }
  }
  
  // 남은 매진 좌석은 랜덤으로 채움
  if (soldCount < count) {
    generateRandomSoldSeats(soldOutSeats, zone, count - soldCount);
  }
}

// 여러 개의 작은 블록으로 매진 좌석 생성
function generateMultipleBlockSeats(soldOutSeats, zone, count, isHighDifficulty = false) {
  let soldCount = 0;
  // 고난이도에서는 더 많은 블록 생성
  const numBlocks = isHighDifficulty ? 
    Math.min(5, Math.floor(Math.random() * 5) + 2) : // 2~5개의 블록
    Math.min(3, Math.floor(Math.random() * 3) + 1);  // 1~3개의 블록
  
  for (let block = 0; block < numBlocks && soldCount < count; block++) {
    // 블록의 시작 위치 결정 (매번 다른 위치)
    const blockRow = Math.floor(Math.random() * zone.rowCount);
    
    // 행에 따른 좌석 수 결정
    let rowSeatCount;
    let rowId;
    
    if (zone.id === 'RIGHT_R' || zone.id === 'LEFT_R') {
      // 고척스카이돔 R석은 행마다 좌석 수가 다르므로 계산
      rowSeatCount = zone.seatCount + blockRow;
      rowId = zone.id === 'RIGHT_R' ? 'R' + (blockRow + 1) : 'L' + (blockRow + 1);
    } else if (zone.id === 'SECOND_S') {
      // 고척스카이돔 2층 S석
      rowSeatCount = zone.seatCount;
      rowId = 'S' + (blockRow + 1);
    } else {
      // 일반 좌석
      rowSeatCount = zone.seatCount;
      rowId = String.fromCharCode(65 + blockRow);
    }
    
    const blockSeat = Math.floor(Math.random() * rowSeatCount);
    
    // 블록 크기 결정 (고난이도에서는 더 작은 블록으로)
    const maxBlockHeight = Math.min(
      isHighDifficulty ? 1 : 2, 
      zone.rowCount - blockRow
    );
    const maxBlockWidth = Math.min(
      isHighDifficulty ? 2 : 3, 
      rowSeatCount - blockSeat
    );
    
    const blockHeight = Math.max(1, Math.min(maxBlockHeight, Math.ceil(Math.random() * maxBlockHeight)));
    const blockWidth = Math.max(1, Math.min(maxBlockWidth, Math.ceil(Math.random() * maxBlockWidth)));
    
    // 블록 내의 좌석을 매진 처리 (고난이도에서는 더 랜덤하게)
    const fillRate = isHighDifficulty ? 0.5 : 0.7; // 채우는 비율
    
    for (let r = 0; r < blockHeight; r++) {
      const rowIdx = blockRow + r;
      
      // 현재 행의 좌석 ID와 개수 계산
      let currentRowId;
      let currentRowSeatCount;
      
      if (zone.id === 'RIGHT_R') {
        currentRowSeatCount = zone.seatCount + rowIdx;
        currentRowId = 'R' + (rowIdx + 1);
      } else if (zone.id === 'LEFT_R') {
        currentRowSeatCount = zone.seatCount + rowIdx;
        currentRowId = 'L' + (rowIdx + 1);
      } else if (zone.id === 'SECOND_S') {
        currentRowSeatCount = zone.seatCount;
        currentRowId = 'S' + (rowIdx + 1);
      } else {
        currentRowSeatCount = zone.seatCount;
        currentRowId = String.fromCharCode(65 + rowIdx);
      }
      
      // 이 행의 최대 블록 너비 확인 (고척스카이돔 R석의 경우 행마다 좌석 수가 다름)
      const actualBlockWidth = Math.min(blockWidth, currentRowSeatCount - blockSeat);
      
      for (let s = 0; s < actualBlockWidth; s++) {
        if (Math.random() < fillRate && soldCount < count) {
          const seat = blockSeat + s + 1;
          const seatId = `${zone.id}-${currentRowId}-${seat}`;
          
          // 중복 체크
          if (!soldOutSeats.includes(seatId)) {
            soldOutSeats.push(seatId);
            soldCount++;
          }
          
          if (soldCount >= count) break;
        }
      }
      
      if (soldCount >= count) break;
    }
  }
  
  // 남은 매진 좌석은 랜덤으로 채움
  if (soldCount < count) {
    generateRandomSoldSeats(soldOutSeats, zone, count - soldCount);
  }
}

// 고척스카이돔 전용 좌석 분포 생성 함수 (아래쪽 열에 더 많은 매진)
function generateStadiumSeatDistribution(soldOutSeats, zone, count) {
  let soldCount = 0;
  
  // 아래쪽 열(낮은 번호)일수록 매진율 높게 설정
  for (let r = 0; r < zone.rowCount && soldCount < count; r++) {
    // 열 번호가 작을수록(앞쪽일수록) 매진 확률 높음
    const rowFactor = 1 - (r / (zone.rowCount * 1.2)); // 앞쪽 열 비중 높임
    
    for (let s = 0; s < zone.seatCount && soldCount < count; s++) {
      // 추가 랜덤성: 양쪽 가장자리는 매진 확률이 낮고 중앙은 높게
      const seatMiddle = zone.seatCount / 2;
      const seatDist = Math.abs(s - seatMiddle) / seatMiddle;
      const centerFactor = 1 - (seatDist * 0.7); // 중앙 비중 높임
      
      // 최종 확률 (열 위치 + 중앙성 + 랜덤 요소)
      const sellProbability = (rowFactor * 0.6) + (centerFactor * 0.2) + (Math.random() * 0.2);
      
      // 산발적인 패턴을 위해 확률 기반 결정
      if (Math.random() < sellProbability) {
        // 좌석 ID 포맷: S1, S2, ... → 고척스카이돔 2층은 S로 시작
        const row = 'S' + (r + 1);
        const seat = s + 1;
        const seatId = `${zone.id}-${row}-${seat}`;
        
        // 중복 체크
        if (!soldOutSeats.includes(seatId) && soldCount < count) {
          soldOutSeats.push(seatId);
          soldCount++;
        }
      }
    }
  }
  
  // 매진이 충분하지 않으면 추가로 랜덤하게 채움
  if (soldCount < count) {
    // 남은 좌석 중에서 랜덤하게 선택
    const availableSeats = [];
    
    // 사용 가능한 모든 좌석 나열
    for (let r = 0; r < zone.rowCount; r++) {
      for (let s = 0; s < zone.seatCount; s++) {
        const row = 'S' + (r + 1);
        const seat = s + 1;
        const seatId = `${zone.id}-${row}-${seat}`;
        
        if (!soldOutSeats.includes(seatId)) {
          availableSeats.push(seatId);
        }
      }
    }
    
    // 랜덤하게 섞기
    for (let i = availableSeats.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableSeats[i], availableSeats[j]] = [availableSeats[j], availableSeats[i]];
    }
    
    // 필요한 만큼만 추가
    for (let i = 0; i < Math.min(count - soldCount, availableSeats.length); i++) {
      soldOutSeats.push(availableSeats[i]);
      soldCount++;
    }
  }
}

// 산발적인 열 기반 패턴 매진 좌석 생성
function generateScatteredRowSeats(soldOutSeats, zone, count, isHighDifficulty = false) {
  let soldCount = 0;
  
  // 어려움/악몽 모드에서는 패턴 가중치 변경
  let patterns;
  
  if (isHighDifficulty) {
    patterns = [
      { type: 'frontHeavy', weight: 0.4 }, // 앞쪽 열 위주로 더 높은 비중
      { type: 'backHeavy', weight: 0.1 },  // 뒤쪽 열 위주는 낮게
      { type: 'middle', weight: 0.3 },     // 중간 위주로 높은 비중
      { type: 'sides', weight: 0.2 }       // 양쪽 가장자리
    ];
  } else {
    patterns = [
      { type: 'frontHeavy', weight: 0.3 }, // 앞쪽 열 위주
      { type: 'backHeavy', weight: 0.2 },  // 뒤쪽 열 위주
      { type: 'middle', weight: 0.3 },     // 중간 위주
      { type: 'sides', weight: 0.2 }       // 양쪽 가장자리 위주
    ];
  }
  
  // 난이도에 따른 추가 무작위성
  const randomFactor = isHighDifficulty ? 0.4 : 0.3;
  
  for (let r = 0; r < zone.rowCount && soldCount < count; r++) {
    for (let s = 0; s < zone.seatCount && soldCount < count; s++) {
      let sellProbability = 0;
      
      // 각 패턴에 따른 확률 계산
      patterns.forEach(pattern => {
        let patternProbability = 0;
        
        if (pattern.type === 'frontHeavy') {
          // 앞쪽일수록 매진 확률 높음
          patternProbability = 1 - (r / zone.rowCount);
        } else if (pattern.type === 'backHeavy') {
          // 뒤쪽일수록 매진 확률 높음
          patternProbability = r / zone.rowCount;
        } else if (pattern.type === 'middle') {
          // 중간 열과 중간 좌석일수록 매진 확률 높음
          const rowMiddle = zone.rowCount / 2;
          const seatMiddle = zone.seatCount / 2;
          const rowDist = Math.abs(r - rowMiddle) / rowMiddle;
          const seatDist = Math.abs(s - seatMiddle) / seatMiddle;
          patternProbability = 1 - ((rowDist + seatDist) / 2);
        } else if (pattern.type === 'sides') {
          // 양쪽 가장자리일수록 매진 확률 높음
          const seatMiddle = zone.seatCount / 2;
          const seatDist = Math.abs(s - seatMiddle) / seatMiddle;
          patternProbability = seatDist;
        }
        
        // 패턴별 가중치 적용
        sellProbability += patternProbability * pattern.weight;
      });
      
      // 추가 무작위성 부여
      sellProbability = sellProbability * (1 - randomFactor) + Math.random() * randomFactor;
      
      // 확률에 따라 매진 처리
      if (Math.random() < sellProbability) {
        // 고척스카이돔 2층 S석은 S1, S2, ... 형식
        let row;
        if (zone.id === 'SECOND_S') {
          row = 'S' + (r + 1);
        } else {
          row = String.fromCharCode(65 + r);
        }
        
        const seat = s + 1;
        const seatId = `${zone.id}-${row}-${seat}`;
        
        // 중복 체크
        if (!soldOutSeats.includes(seatId) && soldCount < count) {
          soldOutSeats.push(seatId);
          soldCount++;
        }
      }
    }
  }
  
  // 남은 매진 좌석은 랜덤으로 채움
  if (soldCount < count) {
    generateRandomSoldSeats(soldOutSeats, zone, count - soldCount);
  }
}

// 역 기반 패턴 매진 좌석 생성 (앞쪽 열이 많이 매진)
function generateRowBasedSoldSeats(soldOutSeats, zone, count) {
  let soldCount = 0;
  const frontHeavy = Math.random() < 0.8; // 80% 확률로 앞쪽 열이 더 많이 매진
  
  if (frontHeavy) {
    // 앞쪽 열부터 많이 매진
    for (let r = 0; r < zone.rowCount && soldCount < count; r++) {
      // 앞쪽 열일수록 매진 확률 높음
      const rowSellRate = 1 - (r / zone.rowCount);
      
      for (let s = 0; s < zone.seatCount && soldCount < count; s++) {
        if (Math.random() < rowSellRate) {
          const row = String.fromCharCode(65 + r);
          const seat = s + 1;
          soldOutSeats.push(`${zone.id}-${row}-${seat}`);
          soldCount++;
          
          if (soldCount >= count) break;
        }
      }
    }
  } else {
    // 중간 자리 위주로 매진
    const middleRow = Math.floor(zone.rowCount / 2);
    const middleSeat = Math.floor(zone.seatCount / 2);
    
    // 중앙에서부터의 거리에 따라 매진 확률 결정
    for (let r = 0; r < zone.rowCount && soldCount < count; r++) {
      for (let s = 0; s < zone.seatCount && soldCount < count; s++) {
        // 중앙에서의 거리 계산 (0~1 범위로 정규화)
        const rowDist = Math.abs(r - middleRow) / middleRow;
        const seatDist = Math.abs(s - middleSeat) / middleSeat;
        const distance = Math.sqrt(rowDist * rowDist + seatDist * seatDist);
        
        // 중앙에 가까울수록 매진 확률 높음
        if (Math.random() < (1 - distance)) {
          const row = String.fromCharCode(65 + r);
          const seat = s + 1;
          soldOutSeats.push(`${zone.id}-${row}-${seat}`);
          soldCount++;
          
          if (soldCount >= count) break;
        }
      }
    }
  }
  
  // 남은 매진 좌석은 랜덤으로 채움
  if (soldCount < count) {
    generateRandomSoldSeats(soldOutSeats, zone, count - soldCount);
  }
}

// 올림픽홀 전용 좌석 분포 생성 함수 (앞쪽 열에 더 많은 매진)
function generateFrontRowHeavyDistribution(soldOutSeats, zone, count, isNightmareMode = false) {
  let soldCount = 0;
  
  // 앞쪽 열에 대한 가중치 (악몽 모드에서는 더 극단적)
  const frontRowWeight = isNightmareMode ? 0.85 : 0.75;
  
  // 앞쪽 열일수록 매진 확률 높게 설정
  for (let r = 0; r < zone.rowCount && soldCount < count; r++) {
    // 열 번호에 따른 매진 확률 계산 (앞쪽 열일수록 높음)
    // 앞쪽 열에 매진이 훨씬 더 집중되도록 지수 함수 적용
    const rowPosition = r / zone.rowCount; // 0 = 맨 앞, 1 = 맨 뒤
    const rowFactor = Math.pow(1 - rowPosition, 2); // 지수 함수로 앞쪽 열 강조
    
    for (let s = 0; s < zone.seatCount && soldCount < count; s++) {
      // 가운데 좌석일수록 매진 확률이 약간 높음
      const seatMiddle = zone.seatCount / 2;
      const seatDist = Math.abs(s - seatMiddle) / seatMiddle;
      const centerFactor = 1 - (seatDist * 0.5); // 중앙석 강조 (50% 가중치)
      
      // 최종 확률 (열 위치 + 중앙성 + 랜덤 요소)
      const sellProbability = (rowFactor * frontRowWeight) + (centerFactor * (1 - frontRowWeight));
      
      // 확률에 추가적인 무작위성 더하기
      const finalProbability = sellProbability * 0.8 + Math.random() * 0.2;
      
      // 산발적인 패턴을 위해 확률 기반 결정
      if (Math.random() < finalProbability) {
        const row = String.fromCharCode(65 + r);
        const seat = s + 1;
        const seatId = `${zone.id}-${row}-${seat}`;
        
        // 중복 체크
        if (!soldOutSeats.includes(seatId) && soldCount < count) {
          soldOutSeats.push(seatId);
          soldCount++;
        }
      }
    }
  }
  
  // 매진이 충분하지 않으면 추가로 랜덤하게 채움
  if (soldCount < count) {
    generateRandomSoldSeats(soldOutSeats, zone, count - soldCount);
  }
}

// 고척스카이돔 R석 전용 좌석 분포 생성 함수 (악몽 모드를 위한 특수 패턴)
function generateStadiumRSectionDistribution(soldOutSeats, zone, count) {
  let soldCount = 0;
  
  // 고척스카이돔 R석 매진 패턴 - 더 높은 매진율 및 불규칙적 패턴
  // 고척스카이돔 R석은 R1, R2, ... 또는 L1, L2, ... 형식
  const isRightSection = zone.id === 'RIGHT_R';
  const rowPrefix = isRightSection ? 'R' : 'L';
  
  // 다양한 패턴 적용을 위한 설정
  const patternType = Math.floor(Math.random() * 3); // 0: 산발적, 1: 블록형, 2: 중앙 집중형
  
  if (patternType === 0) {
    // 패턴 1: 매우 산발적인 분포 (불규칙적인 빈자리 패턴)
    for (let r = 0; r < zone.rowCount; r++) {
      const rowSeatCount = zone.seatCount + r; // R석은 행마다 좌석 수가 다름
      
      for (let s = 0; s < rowSeatCount; s++) {
        // 확률 기반 매진 처리 (50%+)
        if (Math.random() < 0.5 + (Math.random() * 0.2)) {
          const row = rowPrefix + (r + 1);
          const seat = s + 1;
          const seatId = `${zone.id}-${row}-${seat}`;
          
          // 중복 체크
          if (!soldOutSeats.includes(seatId)) {
            soldOutSeats.push(seatId);
            soldCount++;
            
            if (soldCount >= count) break;
          }
        }
      }
      
      if (soldCount >= count) break;
    }
  } else if (patternType === 1) {
    // 패턴 2: 불규칙한 블록 패턴 (여러 작은 블록들이 매진)
    const numBlocks = Math.floor(Math.random() * 5) + 3; // 3~7개 블록
    
    for (let b = 0; b < numBlocks && soldCount < count; b++) {
      const blockRow = Math.floor(Math.random() * zone.rowCount);
      const blockSeatCount = zone.seatCount + blockRow;
      const blockSeat = Math.floor(Math.random() * blockSeatCount);
      
      // 블록 크기
      const blockHeight = Math.min(2, zone.rowCount - blockRow);
      const blockWidth = Math.min(Math.floor(Math.random() * 5) + 3, blockSeatCount - blockSeat);
      
      // 블록 채우기
      for (let r = 0; r < blockHeight; r++) {
        for (let s = 0; s < blockWidth; s++) {
          // 70% 확률로 블록 내 좌석 매진
          if (Math.random() < 0.7) {
            const row = rowPrefix + (blockRow + r + 1);
            const seat = blockSeat + s + 1;
            const seatId = `${zone.id}-${row}-${seat}`;
            
            // 중복 체크
            if (!soldOutSeats.includes(seatId)) {
              soldOutSeats.push(seatId);
              soldCount++;
              
              if (soldCount >= count) break;
            }
          }
        }
        
        if (soldCount >= count) break;
      }
    }
  } else {
    // 패턴 3: 중앙 집중형 (중앙은 높은 매진율, 양쪽 끝은 낮은 매진율)
    for (let r = 0; r < zone.rowCount; r++) {
      const rowSeatCount = zone.seatCount + r;
      const seatMiddle = rowSeatCount / 2;
      
      for (let s = 0; s < rowSeatCount; s++) {
        // 중앙에 가까울수록 매진 확률 높음
        const distFromCenter = Math.abs(s - seatMiddle) / seatMiddle;
        const centerFactor = 1 - (distFromCenter * 0.8); // 중앙 가중치 (80%)
        
        // 앞쪽 열이 더 매진되도록 설정
        const rowFactor = 1 - (r / zone.rowCount * 0.3); // 앞쪽 열 가중치 (30%)
        
        // 최종 확률 (중앙성 + 행 위치 + 랜덤)
        const sellProbability = (centerFactor * 0.6) + (rowFactor * 0.2) + (Math.random() * 0.2);
        
        if (Math.random() < sellProbability) {
          const row = rowPrefix + (r + 1);
          const seat = s + 1;
          const seatId = `${zone.id}-${row}-${seat}`;
          
          // 중복 체크
          if (!soldOutSeats.includes(seatId)) {
            soldOutSeats.push(seatId);
            soldCount++;
            
            if (soldCount >= count) break;
          }
        }
      }
      
      if (soldCount >= count) break;
    }
  }
  
  // 매진 좌석이 충분하지 않으면 추가로 랜덤하게 채움
  if (soldCount < count) {
    // 매진 패턴이 보기 좋게 하기 위해 채택적으로 남은 좌석 매진 처리
    const remainingCount = count - soldCount;
    const availableSeats = [];
    
    // 사용 가능한 모든 좌석 수집
    for (let r = 0; r < zone.rowCount; r++) {
      const rowSeatCount = zone.seatCount + r;
      
      for (let s = 0; s < rowSeatCount; s++) {
        const row = rowPrefix + (r + 1);
        const seat = s + 1;
        const seatId = `${zone.id}-${row}-${seat}`;
        
        if (!soldOutSeats.includes(seatId)) {
          availableSeats.push(seatId);
        }
      }
    }
    
    // 랜덤하게 섞기
    for (let i = availableSeats.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableSeats[i], availableSeats[j]] = [availableSeats[j], availableSeats[i]];
    }
    
    // 필요한 만큼만 추가
    for (let i = 0; i < Math.min(remainingCount, availableSeats.length); i++) {
      soldOutSeats.push(availableSeats[i]);
    }
  }
}

// 새로운 균등한 매진 좌석 생성 함수
async function generateEvenlySoldOutSeats(sellOutRate, venueId) {
  // 공연장 정보 가져오기
  const venueInfo = await getVenueLayout(venueId);
  const isStadium = venueId === 'stadium'; // 고척스카이돔
  const isOlympic = venueId === 'olympic'; // 올림픽홀
  
  // 난이도 판별
  const isHardMode = sellOutRate >= 0.6; // 60% 이상 = 어려움/악몽
  const isNightmareMode = sellOutRate >= 0.85; // 85% 이상 = 악몽
  
  const soldOutSeats = [];
  
  // 각 구역 별 총 좌석 수 계산
  let totalSeats = 0;
  const zoneTotalSeats = {};
  
  for (const zone of venueInfo.zones) {
    let zoneSeats = 0;
    for (const row of zone.rows) {
      zoneSeats += row.seats.length;
    }
    zoneTotalSeats[zone.id] = zoneSeats;
    totalSeats += zoneSeats;
  }
  
  // 전체 매진 좌석 수 계산
  const totalSoldOutSeats = Math.floor(totalSeats * sellOutRate);
  
  // 각 구역별 매진율 설정 (구역별로 고르게 분포)
  const zoneSoldSeats = {};
  let remainingSoldSeats = totalSoldOutSeats;
  
  // 첫 번째 패스: 각 구역별 매진 좌석 수 계산
  for (let i = 0; i < venueInfo.zones.length; i++) {
    const zone = venueInfo.zones[i];
    
    // 마지막 구역은 남은 좌석 모두 배정
    if (i === venueInfo.zones.length - 1) {
      zoneSoldSeats[zone.id] = remainingSoldSeats;
    } else {
      // 구역 크기 비율에 따른 매진 좌석 수 계산
      const zoneRatio = zoneTotalSeats[zone.id] / totalSeats;
      let zoneSoldCount = Math.floor(totalSoldOutSeats * zoneRatio);
      
      // 각 구역별 최소 매진율 설정 (난이도별 다름)
      let minZoneSellOutRate;
      
      if (isNightmareMode) {
        // 악몽 모드: 모든 구역 최소 60% 매진
        minZoneSellOutRate = 0.6;
      } else if (isHardMode) {
        // 어려움 모드: 모든 구역 최소 40% 매진
        minZoneSellOutRate = 0.4;
      } else if (sellOutRate >= 0.3) {
        // 보통 모드: 모든 구역 최소 20% 매진
        minZoneSellOutRate = 0.2;
      } else {
        // 쉬움 모드: 모든 구역 최소 5% 매진
        minZoneSellOutRate = 0.05;
      }
      
      // 최소 매진 좌석 수 적용
      const minZoneSoldCount = Math.ceil(zoneTotalSeats[zone.id] * minZoneSellOutRate);
      zoneSoldCount = Math.max(zoneSoldCount, minZoneSoldCount);
      
      // 할당량 제한 (구역 전체 좌석 수와 남은 매진 좌석 수를 초과할 수 없음)
      zoneSoldCount = Math.min(zoneSoldCount, zoneTotalSeats[zone.id], remainingSoldSeats);
      
      zoneSoldSeats[zone.id] = zoneSoldCount;
      remainingSoldSeats -= zoneSoldCount;
    }
  }
  
  // 두 번째 패스: 각 구역별로 좌석 매진 처리
  for (const zone of venueInfo.zones) {
    const soldCount = zoneSoldSeats[zone.id];
    if (soldCount <= 0) continue;
    
    // 모든 좌석 목록 생성 후 섞기
    const allSeats = [];
    
    // 가중치 패턴 적용 (구역별, 공연장별 특성에 따라)
    const weightedSeats = [];
    
    for (let rowIdx = 0; rowIdx < zone.rows.length; rowIdx++) {
      const row = zone.rows[rowIdx];
      const rowPosition = rowIdx / zone.rows.length; // 0 = 맨 앞, 1 = 맨 뒤
      
      for (let seatIdx = 0; seatIdx < row.seats.length; seatIdx++) {
        const seat = row.seats[seatIdx];
        const seatPosition = seatIdx / row.seats.length; // 0 = 왼쪽, 1 = 오른쪽
        const centerDistance = Math.abs(seatPosition - 0.5) * 2; // 0 = 중앙, 1 = 가장자리
        
        // 기본 가중치
        let weight = 1.0;
        
        // 구역별 패턴 적용
        if (isOlympic) {
          if (zone.id === 'VIP' || zone.id === 'R') {
            // VIP석, R석은 앞쪽 열 위주
            weight = 1.2 - (rowPosition * 0.7);
          } else if (zone.id === 'S') {
            // S석은 중간 위치에 비중
            weight = 1.0 - Math.abs(rowPosition - 0.5) * 0.4 - centerDistance * 0.2;
          } else if (zone.id === 'A') {
            // A석은 랜덤하게
            weight = 0.9 + Math.random() * 0.2;
          }
        } else if (isStadium) {
          if (zone.id === 'CENTER_VIP') {
            // VIP석은 앞쪽과 중앙에 비중
            weight = (1.3 - rowPosition) * (1.1 - centerDistance * 0.5);
          } else if (zone.id === 'RIGHT_R' || zone.id === 'LEFT_R') {
            // R석은 전체적으로 균일하게 (악몽모드에서도)
            weight = 0.95 + Math.random() * 0.1;
          } else if (zone.id === 'SECOND_S') {
            // 2층 S석은 아래쪽(앞쪽)에 비중
            weight = 1.1 - (rowPosition * 0.4);
          }
        }
        
        // 난이도별 추가 무작위성
        if (isNightmareMode) {
          // 악몽모드: 모든 구역이 어느 정도 비슷하게 매진
          weight = weight * 0.6 + 0.4 + Math.random() * 0.2;
        } else if (isHardMode) {
          // 어려움모드: 약간의 무작위성
          weight = weight * 0.8 + 0.2 + Math.random() * 0.2;
        } else {
          // 쉬움/보통 모드: 적은 무작위성
          weight = weight * 0.9 + 0.1 + Math.random() * 0.1;
        }
        
        // 좌석 정보와 가중치 저장
        weightedSeats.push({
          zoneId: zone.id,
          rowId: row.id,
          seatId: seat.id,
          weight: weight
        });
      }
    }
    
    // 가중치에 따라 정렬 (높은 가중치가 앞으로)
    weightedSeats.sort((a, b) => b.weight - a.weight);
    
    // 매진 처리할 좌석 선택 (가중치가 높은 순서대로)
    for (let i = 0; i < Math.min(soldCount, weightedSeats.length); i++) {
      const seat = weightedSeats[i];
      const seatId = `${seat.zoneId}-${seat.rowId}-${seat.seatId}`;
      
      if (!soldOutSeats.includes(seatId)) {
        soldOutSeats.push(seatId);
      }
    }
  }
  
  return soldOutSeats;
}