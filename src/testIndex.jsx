import React from 'react';
import ReactDOM from 'react-dom/client';
import TestApp from './TestApp';

// 최소 테스트 앱 (스타일 없이)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>
);