import React from 'react';
import '../../styles/components/DifficultySelector.css';

const DifficultySelector = ({ selectedDifficulty, onChange }) => {
  // 난이도 옵션
  const difficulties = [
    {
      id: 'easy',
      name: '쉬움',
      description: '대기열 없음, 매진율 낮음',
      icon: '🔰'
    },
    {
      id: 'normal',
      name: '보통',
      description: '짧은 대기열, 중간 매진율',
      icon: '⭐'
    },
    {
      id: 'hard',
      name: '어려움',
      description: '긴 대기열, 높은 매진율',
      icon: '🔥'
    },
    {
      id: 'nightmare',
      name: '악몽',
      description: 'BTS급 티켓팅 난이도',
      icon: '💀'
    }
  ];
  
  // 난이도 선택 핸들러
  const handleDifficultyChange = (difficulty) => {
    if (onChange) {
      onChange(difficulty);
    }
  };
  
  return (
    <div className="difficulty-selector">
      <h3>난이도 선택</h3>
      
      <div className="difficulty-options">
        {difficulties.map((difficulty) => (
          <div
            key={difficulty.id}
            className={`difficulty-option ${selectedDifficulty === difficulty.id ? 'selected' : ''}`}
            onClick={() => handleDifficultyChange(difficulty.id)}
          >
            <div className="difficulty-icon">{difficulty.icon}</div>
            <div className="difficulty-details">
              <div className="difficulty-name">{difficulty.name}</div>
              <div className="difficulty-description">{difficulty.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;