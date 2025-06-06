import React from 'react';
import '../../styles/components/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section main-info">
            <div className="footer-logo">티켓팅 훈련소</div>
            <p className="footer-description">
              실제 티켓팅 환경을 시뮬레이션하여 티켓팅 연습을 할 수 있는 웹 애플리케이션입니다.
            </p>
          </div>
          
          <div className="footer-section">
            <div className="footer-dev">
              <div className="dev-title">개발자 GitHub</div>
              <a href="https://github.com/StyleChoi" target="_blank" rel="noopener noreferrer" className="github-link">
                <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
                <span>StyleChoi</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
        </div>
      </div>
    </footer>
  );
};

export default Footer;