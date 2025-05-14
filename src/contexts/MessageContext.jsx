import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, limit } from 'firebase/firestore';

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
    const fetchMessages = async () => {
      try {
        // 사용자 ID 설정
        const currentUserId = getUserId();
        setUserId(currentUserId);
        
        // Firestore에서 메시지 불러오기
        const messagesRef = collection(db, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(50));
        const querySnapshot = await getDocs(q);
        
        const fetchedMessages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setMessages(fetchedMessages);
      } catch (err) {
        console.error('메시지 로드 오류:', err);
        setError('메시지를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
  }, []);
  
  // 메시지 추가
  const addMessage = async (author, text) => {
    try {
      const messagesRef = collection(db, 'messages');
      const currentUserId = getUserId(); // 항상 최신값 사용
      const newMessage = {
        author: author.trim(),
        text: text.trim(),
        timestamp: new Date().toISOString(),
        userId: currentUserId
      };
      
      const docRef = await addDoc(messagesRef, newMessage);
      const addedMessage = {
        id: docRef.id,
        ...newMessage
      };
      
      setMessages(prevMessages => [addedMessage, ...prevMessages].slice(0, 50));
      
      return { success: true };
    } catch (err) {
      console.error('메시지 저장 오류:', err);
      setError('메시지를 저장하는 중 오류가 발생했습니다.');
      return { success: false, error: '메시지를 저장하는 중 오류가 발생했습니다.' };
    }
  };
  
  // 메시지 삭제
  const deleteMessage = async (id) => {
    try {
      const messageToDelete = messages.find(msg => msg.id === id);
      
      if (!messageToDelete) {
        return { success: false, error: '메시지를 찾을 수 없습니다.' };
      }
      
      // 로컬 저장소의 사용자 ID를 직접 확인하여 더 안정적으로 검증
      const currentUserId = getUserId();
      
      if (messageToDelete.userId !== currentUserId) {
        return { success: false, error: '본인이 작성한 메시지만 삭제할 수 있습니다.' };
      }
      
      // Firebase에서 문서 삭제
      await deleteDoc(doc(db, 'messages', id));
      
      // 상태 업데이트
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
      
      console.log('메시지가 성공적으로 삭제되었습니다:', id);
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
    try {
      const message = messages.find(msg => msg.id === messageId);
      // 항상 최신 사용자 ID 사용
      const currentUserId = getUserId();
      return message ? message.userId === currentUserId : false;
    } catch (error) {
      console.error('메시지 확인 오류:', error);
      return false;
    }
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
