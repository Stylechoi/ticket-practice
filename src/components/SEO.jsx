import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description }) => {
  const location = useLocation();

  useEffect(() => {
    // 타이틀 설정
    document.title = title || '티켓팅 훈련소 - 실전처럼 티켓팅 연습하기';

    // 메타 설명 설정
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || '실제 상황과 같은 티켓팅 연습 서비스. 티켓팅 성공률을 높이고 싶다면 지금 바로 무료로 연습해보세요.');
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    if (ogTitle) ogTitle.setAttribute('content', title || '티켓팅 훈련소 - 실전처럼 티켓팅 연습하기');
    if (ogDescription) ogDescription.setAttribute('content', description || '실제 상황과 같은 티켓팅 연습 서비스. 티켓팅 성공률을 높이고 싶다면 지금 바로 무료로 연습해보세요.');
    if (ogUrl) ogUrl.setAttribute('content', `https://ticket-practice-peach.vercel.app${location.pathname}`);

    // Twitter
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    const twitterUrl = document.querySelector('meta[property="twitter:url"]');

    if (twitterTitle) twitterTitle.setAttribute('content', title || '티켓팅 훈련소 - 실전처럼 티켓팅 연습하기');
    if (twitterDescription) twitterDescription.setAttribute('content', description || '실제 상황과 같은 티켓팅 연습 서비스. 티켓팅 성공률을 높이고 싶다면 지금 바로 무료로 연습해보세요.');
    if (twitterUrl) twitterUrl.setAttribute('content', `https://ticket-practice-peach.vercel.app${location.pathname}`);
  }, [title, description, location]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default SEO;