import React, { useState, useEffect } from 'react';
import { getAvailableVenues } from '../../services/api';
import '../../styles/components/VenueSelector.css';

const VenueSelector = ({ selectedVenue, onChange }) => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 공연장 목록 로드
  useEffect(() => {
    const loadVenues = async () => {
      try {
        const venueList = await getAvailableVenues();
        setVenues(venueList);
        
        // 기본 공연장 선택 (selectedVenue가 없는 경우)
        if (!selectedVenue && venueList.length > 0 && onChange) {
          onChange(venueList[0]);
        }
      } catch (err) {
        console.error('Failed to load venues:', err);
        setError('공연장 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    loadVenues();
  }, [selectedVenue, onChange]);
  
  // 공연장 선택 핸들러
  const handleVenueSelect = (venue) => {
    if (onChange) {
      onChange(venue);
    }
  };
  
  // 로딩 중 표시
  if (loading) {
    return (
      <div className="venue-selector">
        <h3>공연장 선택</h3>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>공연장 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }
  
  // 에러 표시
  if (error) {
    return (
      <div className="venue-selector">
        <h3>공연장 선택</h3>
        <div className="error-message">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="venue-selector">
      <h3>공연장 선택</h3>
      
      <div className="venue-options">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className={`venue-option ${selectedVenue?.id === venue.id ? 'selected' : ''}`}
            onClick={() => handleVenueSelect(venue)}
          >
            <div className="venue-image">
              {venue.image ? (
                <img src={venue.image} alt={venue.name} />
              ) : (
                <div className="venue-image-placeholder">
                  <span>{venue.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="venue-details">
              <div className="venue-name">{venue.name}</div>
              <div className="venue-capacity">수용 인원: {venue.capacity.toLocaleString()}명</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueSelector;