// 포맷 관련 유틸리티 함수

// 숫자에 천 단위 구분자 추가
export const formatNumber = (num) => {
  if (num === undefined || num === null) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 가격에 천 단위 구분자 추가 및 원 표시
export const formatPrice = (price) => {
  if (price === undefined || price === null) return '';
  return formatNumber(price) + '원';
};

// 패딩 추가 (왼쪽에 문자 추가)
export const padStart = (value, length, char = '0') => {
  return String(value).padStart(length, char);
};

// 패딩 추가 (오른쪽에 문자 추가)
export const padEnd = (value, length, char = '0') => {
  return String(value).padEnd(length, char);
};

// 문자열 길이 제한 (말줄임표 추가)
export const truncate = (str, length, ellipsis = '...') => {
  if (!str) return '';
  
  if (str.length <= length) return str;
  
  return str.slice(0, length) + ellipsis;
};

// 카드번호 포맷팅 (4자리마다 공백 추가)
export const formatCardNumber = (cardNumber) => {
  if (!cardNumber) return '';
  
  return cardNumber
    .replace(/\s/g, '')
    .match(/.{1,4}/g)
    ?.join(' ')
    .substr(0, 19) || '';
};

// 카드 유효기간 포맷팅 (MM/YY)
export const formatCardExpiry = (expiry) => {
  if (!expiry) return '';
  
  let formatted = expiry.replace(/\D/g, '');
  
  if (formatted.length > 2) {
    formatted = `${formatted.substr(0, 2)}/${formatted.substr(2, 2)}`;
  }
  
  return formatted.substr(0, 5);
};

// 전화번호 포맷팅 (010-1234-5678)
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return `${cleaned.substr(0, 3)}-${cleaned.substr(3, 4)}-${cleaned.substr(7, 4)}`;
  }
  
  return phoneNumber;
};

// 이메일 주소 마스킹 (ex***@example.com)
export const maskEmail = (email) => {
  if (!email) return '';
  
  const [username, domain] = email.split('@');
  
  if (username.length <= 3) {
    return `${username}@${domain}`;
  }
  
  return `${username.substr(0, 3)}***@${domain}`;
};

// 이름 마스킹 (홍*동)
export const maskName = (name) => {
  if (!name || name.length <= 1) return name;
  
  const firstChar = name.charAt(0);
  const lastChar = name.length > 2 ? name.charAt(name.length - 1) : '';
  
  return `${firstChar}${'*'.repeat(name.length - (lastChar ? 2 : 1))}${lastChar}`;
};

// 단어 첫 글자만 대문자로 변환
export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// 문자열에서 HTML 태그 제거
export const removeHtmlTags = (html) => {
  if (!html) return '';
  
  return html.replace(/<[^>]*>/g, '');
};

// 좌석 정보 포맷팅 (A구역 B열 3번)
export const formatSeatInfo = (zone, row, seat) => {
  return `${zone}구역 ${row}열 ${seat}번`;
};
