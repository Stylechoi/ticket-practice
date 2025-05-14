import React, { createContext, useState, useEffect, useContext } from 'react';

// 인증 컨텍스트 생성
export const AuthContext = createContext();

// 프로바이더 컴포넌트
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 로컬 스토리지에서 사용자 정보 로드
  useEffect(() => {
    const storedUser = localStorage.getItem('ticket-user');
    if (storedUser) {
      setUser({ username: storedUser });
    }
    setLoading(false);
  }, []);

  // 로그인 처리
  const login = (username, password) => {
    // 실제 구현에서는 API 호출을 통해 인증 처리
    // 현재는 입력된 아이디만 저장하는 간단한 구현
    setUser({ username });
    localStorage.setItem('ticket-user', username);
    return { success: true };
  };

  // 로그아웃 처리
  const logout = () => {
    setUser(null);
    localStorage.removeItem('ticket-user');
  };

  // 회원가입 처리
  const register = (username, password) => {
    // 실제 구현에서는 API 호출을 통해 회원가입 처리
    // 현재는 간단히 성공으로 처리
    return { success: true };
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
