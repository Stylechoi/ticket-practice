import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMessages } from '../contexts/MessageContext';
import { toast } from 'react-toastify';
import '../styles/pages/Messages.css';

const MessagesPage = () => {
  const { messages, addMessage, deleteMessage, loading, error: contextError, isMyMessage } = useMessages();
  const [newMessage, setNewMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 메시지 추가
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) {
      setError('응원 메시지를 입력해주세요.');
      return;
    }
    
    if (!author.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // 메시지 추가
    const result = addMessage(author, newMessage);
    
    if (result.success) {
      // 입력 필드 초기화
      setNewMessage('');
      toast.success('응원 메시지가 등록되었습니다.');
    } else {
      setError(result.error || '메시지 저장에 실패했습니다.');
      toast.error(result.error || '메시지 저장에 실패했습니다.');
    }
    
    setIsLoading(false);
  };
  
  // 메시지 삭제
  const handleDelete = (id) => {
    // 본인 메시지인지 확인
    if (!isMyMessage(id)) {
      toast.error('본인이 작성한 메시지만 삭제할 수 있습니다.');
      return;
    }
    
    if (window.confirm('정말 이 메시지를 삭제하시겠습니까?')) {
      const result = deleteMessage(id);
      
      if (result.success) {
        toast.success('메시지가 삭제되었습니다.');
      } else {
        toast.error(result.error || '메시지 삭제에 실패했습니다.');
      }
    }
  };
  
  // 랜덤 응원 문구
  const getRandomCheerMessage = () => {
    const cheers = [
      "오늘 꼭 성공할 거예요!",
      "이번에는 티켓팅 성공!",
      "행운이 함께하길 바랍니다!",
      "티켓팅의 신이 되어보세요!",
      "오늘은 무조건 성공!",
      "끈기와 집중력으로 꼭 성공하세요!",
      "포기하지 말고 도전하세요!",
      "오늘 행운이 당신과 함께하길!",
      "반드시 성공할 거예요!",
      "기다리던 공연 꼭 보러 가요!"
    ];
    
    return cheers[Math.floor(Math.random() * cheers.length)];
  };
  
  return (
    <div className="messages-page">
      <div className="messages-container">
        <h2>티켓팅 응원 메시지</h2>
        <div className="message-subtitle">티켓팅 도전에 대한 응원이나 다짐을 남겨보세요!</div>
        
        {/* 메시지 작성 폼 */}
        <form onSubmit={handleSubmit} className="message-form">
          <div className="form-group">
            <label htmlFor="author">닉네임</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="닉네임을 입력하세요"
              maxLength={15}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">응원 메시지</label>
            <textarea
              id="message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={getRandomCheerMessage()}
              rows={3}
              maxLength={100}
              required
            />
            <div className="char-count">{newMessage.length}/100</div>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          {contextError && <div className="error-message">{contextError}</div>}
          
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? '저장 중...' : '메시지 남기기'}
          </button>
        </form>
        
        <div className="message-divider">
          <span>응원 메시지 목록</span>
        </div>
        
        {/* 메시지 목록 */}
        <div className="message-list">
          {loading ? (
            <div className="loading-message">메시지를 불러오는 중...</div>
          ) : messages.length === 0 ? (
            <div className="empty-message">
              아직 응원 메시지가 없습니다. 첫 번째 응원 메시지를 남겨보세요!
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`message-card ${isMyMessage(message.id) ? 'my-message' : ''}`}>
                <div className="message-header">
                  <div className="message-author">
                    {message.author}
                    {isMyMessage(message.id) && <span className="my-label">(내 메시지)</span>}
                  </div>
                  <div className="message-date">
                    {new Date(message.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="message-text">{message.text}</div>
                {isMyMessage(message.id) && (
                  <button 
                    className="delete-button" 
                    onClick={() => handleDelete(message.id)}
                    title="메시지 삭제"
                  >
                    ×
                  </button>
                )}
              </div>
            ))
          )}
        </div>
        
        <div className="page-actions">
          <Link to="/ticket" className="practice-button">
            티켓팅 연습하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;