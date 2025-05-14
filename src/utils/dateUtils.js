// 날짜 및 시간 관련 유틸리티 함수

// 현재 시간을 yyyy. MM. dd HH:mm:ss 형식으로 반환
export const formatCurrentTime = () => {
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  
  return `${now.getFullYear()}. ${pad(now.getMonth() + 1)}. ${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};

// 초 단위 시간을 mm:ss 형식으로 변환
export const formatTimeRemaining = (seconds) => {
  if (seconds <= 0) return '00:00';
  
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 날짜를 yyyy-MM-dd 형식으로 변환
export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

// 시간을 HH:mm 형식으로 변환
export const formatTime = (date) => {
  const d = new Date(date);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  
  return `${hours}:${minutes}`;
};

// 날짜와 시간을 yyyy-MM-dd HH:mm:ss 형식으로 변환
export const formatDateTime = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const seconds = d.getSeconds().toString().padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 상대적인 시간 표시 (예: '3분 전', '방금 전')
export const formatRelativeTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.floor((now - then) / 1000); // 초 단위 차이
  
  if (diff < 60) return '방금 전';
  if (diff < 60 * 60) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 60 * 60 * 24) return `${Math.floor(diff / (60 * 60))}시간 전`;
  if (diff < 60 * 60 * 24 * 7) return `${Math.floor(diff / (60 * 60 * 24))}일 전`;
  if (diff < 60 * 60 * 24 * 30) return `${Math.floor(diff / (60 * 60 * 24 * 7))}주 전`;
  if (diff < 60 * 60 * 24 * 365) return `${Math.floor(diff / (60 * 60 * 24 * 30))}개월 전`;
  
  return `${Math.floor(diff / (60 * 60 * 24 * 365))}년 전`;
};

// 주어진 날짜가 오늘인지 확인
export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  
  return (
    today.getFullYear() === checkDate.getFullYear() &&
    today.getMonth() === checkDate.getMonth() &&
    today.getDate() === checkDate.getDate()
  );
};

// 남은 시간 계산 (지정된 날짜까지 남은 시간)
export const getTimeRemaining = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = target - now;
  
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  return {
    days,
    hours,
    minutes,
    seconds,
    total: diff
  };
};
