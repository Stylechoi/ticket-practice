import { useState, useEffect, useRef } from 'react';

// 타이머 관련 훅
export const useTimer = (initialTime = 60, autoStart = false, onTimeout = null) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  
  // 타이머 시작
  const start = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  
  // 타이머 일시정지
  const pause = () => {
    setIsPaused(true);
  };
  
  // 타이머 재개
  const resume = () => {
    setIsPaused(false);
  };
  
  // 타이머 리셋
  const reset = (newTime = initialTime) => {
    setTime(newTime);
    setIsActive(false);
    setIsPaused(false);
  };
  
  // 시간 형식 변환 (mm:ss)
  const format = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // 타이머 작동
  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            if (onTimeout) onTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isActive, isPaused, onTimeout]);
  
  return {
    time,
    isActive,
    isPaused,
    start,
    pause,
    resume,
    reset,
    format
  };
};

// 디바운스 훅
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

// 로컬 스토리지 훅
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
};

// 미디어 쿼리 훅
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [matches, query]);
  
  return matches;
};

// 클릭 외부 감지 훅
export const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};

// 스크롤 위치 훅
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);
  
  return scrollPosition;
};

// 윈도우 크기 훅
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
};
