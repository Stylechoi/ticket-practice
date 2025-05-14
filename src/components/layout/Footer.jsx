import React from 'react';
import '../../styles/components/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">티켓팅 훈련소</div>
            <p className="footer-description">
              실제 티켓팅 환경을 시뮬레이션하여 티켓팅 연습을 할 수 있는 웹 애플리케이션입니다.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>메뉴</h4>
            <ul className="footer-links">
              <li><a href="/">홈</a></li>
              <li><a href="/ticket">티켓팅 연습</a></li>
              <li><a href="/stats">기록/통계</a></li>
              <li><a href="/login">로그인</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>소셜 미디어</h4>
            <div className="footer-social">
              <a href="#" className="social-link"><i className="fab fa-github"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} 티켓팅 훈련소. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;