import React, { useState, useEffect, useRef } from 'react';
import { useTicketing } from '../../contexts/TicketingContext';
import { formatPrice } from '../../utils/formatUtils';
import '../../styles/components/SeatMap.css';

// 좌석 등급별 색상 및 가격
const SEAT_GRADES = {
  VIP: { color: '#ffbf00', price: 150000 },
  R: { color: '#ff5e87', price: 130000 },
  S: { color: '#3d9bff', price: 100000 },
  A: { color: '#5ddb5d', price: 80000 },
  B: { color: '#a797ff', price: 60000 }
};

const SeatMap = ({ venueType = 'concert', onSeatSelect }) => {
  const { state, dispatch } = useTicketing();
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewPosition, setViewPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showHeatmap, setShowHeatmap] = useState(false);
  
  const seatMapRef = useRef(null);
  
  // 좌석 클릭 처리
  const handleSeatClick = (zone, row, seat) => {
    const seatId = `${zone.id}-${row.id}-${seat.id}`;
    
    // 이미 매진된 좌석인지 확인
    if (state.soldSeats.includes(seatId)) {
      return;
    }
    
    // 좌석 선택/해제
    if (state.selectedSeats.some(s => `${s.zone}-${s.row}-${s.seat}` === seatId)) {
      dispatch({
        type: 'DESELECT_SEAT',
        payload: seatId
      });
    } else {
      // 최대 4석까지만 선택 가능
      if (state.selectedSeats.length >= 4) {
        alert('최대 4석까지만 선택 가능합니다.');
        return;
      }
      
      dispatch({
        type: 'SELECT_SEAT',
        payload: {
          zone: zone.id,
          row: row.id,
          seat: seat.id,
          grade: zone.grade,
          price: SEAT_GRADES[zone.grade]?.price || 0,
          location: `${zone.name} ${row.name} ${seat.name}`
        }
      });
    }
  };
  
  // 좌석 호버 처리
  const handleSeatHover = (zone, row, seat) => {
    setHoveredSeat({
      zone,
      row,
      seat,
      id: `${zone.id}-${row.id}-${seat.id}`
    });
  };
  
  // 줌 조절
  const handleZoom = (direction) => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? prev + 0.1 : prev - 0.1;
      return Math.min(Math.max(newZoom, 0.5), 2.5); // 0.5 ~ 2.5 배율 제한
    });
  };
  
  // 드래그 시작
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // 좌클릭만
    setIsDragging(true);
    setDragStart({
      x: e.clientX - viewPosition.x,
      y: e.clientY - viewPosition.y
    });
  };
  
  // 드래그 이동
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setViewPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };
  
  // 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // 히트맵 토글
  const toggleHeatmap = () => {
    setShowHeatmap(prev => !prev);
  };
  
  // 선택 완료 처리
  const handleSelectionComplete = () => {
    if (state.selectedSeats.length === 0) {
      alert('좌석을 선택해주세요.');
      return;
    }
    
    if (onSeatSelect) {
      onSeatSelect(state.selectedSeats);
    }
  };
  
  // 좌석 정보 렌더링
  const renderSeatInfo = () => {
    if (!hoveredSeat) return null;
    
    const zone = hoveredSeat.zone;
    const row = hoveredSeat.row;
    const seat = hoveredSeat.seat;
    const seatId = hoveredSeat.id;
    
    const isSold = state.soldSeats.includes(seatId);
    const isSelected = state.selectedSeats.some(s => `${s.zone}-${s.row}-${s.seat}` === seatId);
    
    return (
      <div className="seat-tooltip">
        <div className="seat-tooltip-header">
          <span className="seat-grade" style={{ backgroundColor: SEAT_GRADES[zone.grade]?.color }}>
            {zone.grade}
          </span>
          <span className="seat-location">{zone.name} {row.name} {seat.name}번</span>
        </div>
        <div className="seat-tooltip-body">
          <div className="seat-price">{formatPrice(SEAT_GRADES[zone.grade]?.price || 0)}</div>
          <div className={`seat-status ${isSold ? 'sold' : isSelected ? 'selected' : 'available'}`}>
            {isSold ? '매진' : isSelected ? '선택됨' : '선택 가능'}
          </div>
        </div>
        {seat.isSpecial && (
          <div className="seat-special-info">
            <span>장애인 전용석</span>
          </div>
        )}
      </div>
    );
  };
  
  // 선택된 좌석 요약
  const renderSelectedSummary = () => {
    if (state.selectedSeats.length === 0) {
      return (
        <div className="empty-selection">
          <p>좌석을 선택해주세요.</p>
          <p className="selection-hint">최대 4석까지 선택 가능합니다.</p>
        </div>
      );
    }
    
    const totalPrice = state.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    
    return (
      <div className="selection-summary">
        <h3>선택된 좌석 ({state.selectedSeats.length}석)</h3>
        <ul className="selected-seats-list">
          {state.selectedSeats.map((seat, index) => (
            <li key={index} className="selected-seat-item">
              <div className="seat-info">
                <span className="seat-grade" style={{ backgroundColor: SEAT_GRADES[seat.grade]?.color }}>
                  {seat.grade}
                </span>
                <span className="seat-location">{seat.location}</span>
              </div>
              <div className="seat-actions">
                <span className="seat-price">{formatPrice(seat.price)}</span>
                <button 
                  className="remove-seat" 
                  onClick={() => dispatch({ 
                    type: 'DESELECT_SEAT', 
                    payload: `${seat.zone}-${seat.row}-${seat.seat}` 
                  })}
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="total-price">
          <span>총 결제금액</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <button 
          className="select-complete-button" 
          onClick={handleSelectionComplete}
        >
          선택 완료
        </button>
      </div>
    );
  };
  
  // 좌석 렌더링
  const renderSeats = () => {
    if (!state.seatLayout || state.seatLayout.length === 0) {
      return (
        <div className="loading-seats">
          <div className="spinner"></div>
          <p>좌석 정보를 불러오는 중...</p>
        </div>
      );
    }
    
    return (
      <div 
        className="seat-map-container" 
        ref={seatMapRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="seat-map-controls">
          <div className="zoom-controls">
            <button onClick={() => handleZoom('in')}>+</button>
            <span>{Math.round(zoomLevel * 100)}%</span>
            <button onClick={() => handleZoom('out')}>-</button>
          </div>
          <div className="view-controls">
            <button 
              className={`view-toggle ${showHeatmap ? 'active' : ''}`}
              onClick={toggleHeatmap}
            >
              인기구역
            </button>
          </div>
        </div>
        
        <div className="stage-indicator">STAGE</div>
        
        <div 
          className="seat-map"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center top'
          }}
        >
          {state.seatLayout.map((zone) => (
            <div 
              key={zone.id} 
              className={`zone ${showHeatmap ? 'heatmap' : ''}`}
              data-popularity={zone.popularity || 0.5}
              style={{
                borderColor: SEAT_GRADES[zone.grade]?.color
              }}
            >
              <div className="zone-header" style={{ backgroundColor: SEAT_GRADES[zone.grade]?.color }}>
                {zone.name} ({formatPrice(SEAT_GRADES[zone.grade]?.price || 0)})
              </div>
              <div className="zone-content">
                {zone.rows.map((row) => (
                  <div key={row.id} className="row">
                    <div className="row-header">{row.name}</div>
                    <div className="seats">
                      {row.seats.map((seat) => {
                        const seatId = `${zone.id}-${row.id}-${seat.id}`;
                        const isSold = state.soldSeats.includes(seatId);
                        const isSelected = state.selectedSeats.some(
                          s => `${s.zone}-${s.row}-${s.seat}` === seatId
                        );
                        
                        return (
                          <div
                            key={seat.id}
                            className={`seat ${isSold ? 'sold' : ''} ${isSelected ? 'selected' : ''} ${seat.isSpecial ? 'special' : ''}`}
                            onClick={() => handleSeatClick(zone, row, seat)}
                            onMouseEnter={() => handleSeatHover(zone, row, seat)}
                            onMouseLeave={() => setHoveredSeat(null)}
                            style={{
                              borderColor: SEAT_GRADES[zone.grade]?.color,
                              backgroundColor: isSelected ? SEAT_GRADES[zone.grade]?.color : ''
                            }}
                          >
                            {seat.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="seat-selection">
      <div className="seat-map-section">
        {renderSeats()}
        {hoveredSeat && renderSeatInfo()}
      </div>
      <div className="selection-section">
        {renderSelectedSummary()}
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color available"></div>
            <span>선택 가능</span>
          </div>
          <div className="legend-item">
            <div className="legend-color sold"></div>
            <span>매진</span>
          </div>
          <div className="legend-item">
            <div className="legend-color selected"></div>
            <span>선택됨</span>
          </div>
          <div className="legend-item">
            <div className="legend-color special"></div>
            <span>장애인석</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;