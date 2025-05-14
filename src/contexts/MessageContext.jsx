import React, { createContext, useState, useEffect, useContext } from 'react';

// 메시지 컨텍스트 생성
export const MessageContext = createContext();

// 사용자의 고유 ID 생성 또는 가져오기
const getUserId = () => {
  let userId = localStorage.getItem('ticket-user-id');
  
  if (!userId) {
    // 새로운 사용자 ID 생성 (간단한 랜덤 문자열)
    userId = 'user_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('ticket-user-id', userId);
  }
  
  return userId;
};

// 프로바이더 컴포넌트
export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');
  
  // 사용자 ID와 메시지 불러오기
  useEffect(() => {
    try {
      // 사용자 ID 설정
      const currentUserId = getUserId();
      setUserId(currentUserId);
      
      // 메시지 불러오기
      const storedMessages = localStorage.getItem('ticket-messages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (err) {
      console.error('메시지 로드 오류:', err);
      setError('메시지를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // 메시지 추가
  const addMessage = (author, text) => {
    try {
      const newMessage = {
        id: Date.now(),
        author: author.trim(),
        text: text.trim(),
        date: new Date().toLocaleString(),
        userId: userId // 작성자 ID 저장
      };
      
      const updatedMessages = [newMessage, ...messages].slice(0, 50); // 최대 50개까지만 저장
      setMessages(updatedMessages);
      localStorage.setItem('ticket-messages', JSON.stringify(updatedMessages));
      
      return { success: true };
    } catch (err) {
      console.error('메시지 저장 오류:', err);
      setError('메시지를 저장하는 중 오류가 발생했습니다.');
      return { success: false, error: '메시지를 저장하는 중 오류가 발생했습니다.' };
    }
  };
  
  // 메시지 삭제 (본인 메시지만 삭제 가능)
  const deleteMessage = (id) => {
    try {
      const messageToDelete = messages.find(msg => msg.id === id);
      
      // 메시지가 없거나 본인 메시지가 아닌 경우
      if (!messageToDelete) {
        return { success: false, error: '메시지를 찾을 수 없습니다.' };
      }
      
      if (messageToDelete.userId !== userId) {
        return { success: false, error: '본인이 작성한 메시지만 삭제할 수 있습니다.' };
      }
      
      const updatedMessages = messages.filter(msg => msg.id !== id);
      setMessages(updatedMessages);
      localStorage.setItem('ticket-messages', JSON.stringify(updatedMessages));
      
      return { success: true };
    } catch (err) {
      console.error('메시지 삭제 오류:', err);
      setError('메시지를 삭제하는 중 오류가 발생했습니다.');
      return { success: false, error: '메시지를 삭제하는 중 오류가 발생했습니다.' };
    }
  };
  
  // 모든 메시지 삭제 (관리 기능)
  const clearAllMessages = () => {
    try {
      setMessages([]);
      localStorage.removeItem('ticket-messages');
      
      return { success: true };
    } catch (err) {
      console.error('메시지 전체 삭제 오류:', err);
      setError('메시지를 삭제하는 중 오류가 발생했습니다.');
      return { success: false, error: '메시지를 삭제하는 중 오류가 발생했습니다.' };
    }
  };
  
  // 사용자 ID 확인 - 자신의 메시지인지 확인하는 함수
  const isMyMessage = (messageId) => {
    const message = messages.find(msg => msg.id === messageId);
    return message ? message.userId === userId : false;
  };
  
  const value = {
    messages,
    loading,
    error,
    addMessage,
    deleteMessage,
    clearAllMessages,
    isMyMessage,
    userId
  };
  
  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};

// 커스텀 훅
export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
