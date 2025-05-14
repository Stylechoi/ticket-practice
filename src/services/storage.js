// 로컬 스토리지 관련 유틸리티

// 토큰 저장
export const setStoredToken = (token) => {
  localStorage.setItem('ticket-token', token);
};

// 토큰 가져오기
export const getStoredToken = () => {
  return localStorage.getItem('ticket-token');
};

// 토큰 삭제
export const removeStoredToken = () => {
  localStorage.removeItem('ticket-token');
};

// 사용자 정보 저장
export const setStoredUser = (user) => {
  localStorage.setItem('ticket-user', JSON.stringify(user));
};

// 사용자 정보 가져오기
export const getStoredUser = () => {
  const user = localStorage.getItem('ticket-user');
  return user ? JSON.parse(user) : null;
};

// 사용자 정보 삭제
export const removeStoredUser = () => {
  localStorage.removeItem('ticket-user');
};

// 히스토리 저장
export const setStoredHistory = (history) => {
  localStorage.setItem('ticket-history', JSON.stringify(history));
};

// 히스토리 가져오기
export const getStoredHistory = () => {
  const history = localStorage.getItem('ticket-history');
  return history ? JSON.parse(history) : [];
};

// 히스토리 삭제
export const removeStoredHistory = () => {
  localStorage.removeItem('ticket-history');
};

// 설정 저장
export const setStoredSettings = (settings) => {
  localStorage.setItem('ticket-settings', JSON.stringify(settings));
};

// 설정 가져오기
export const getStoredSettings = () => {
  const settings = localStorage.getItem('ticket-settings');
  return settings ? JSON.parse(settings) : null;
};

// 테마 저장
export const setStoredTheme = (theme) => {
  localStorage.setItem('ticket-theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
};

// 테마 가져오기
export const getStoredTheme = () => {
  return localStorage.getItem('ticket-theme') || 'dark';
};

// 전체 저장 데이터 초기화
export const clearAllStoredData = () => {
  localStorage.removeItem('ticket-token');
  localStorage.removeItem('ticket-user');
  localStorage.removeItem('ticket-history');
  localStorage.removeItem('ticket-settings');
  // 테마는 유지
};
