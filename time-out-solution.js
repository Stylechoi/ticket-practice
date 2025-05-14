// 타이머 로직 부분만 - TicketingPage.jsx에 적용할 코드

// 타이머 감시 효과 - 시간 초과 시 강제로 실패 처리
useEffect(() => {
  // 타이머가 0이 되었을 때 처리
  if (state.timeLeft === 0 && (currentStep === 'seats' || currentStep === 'payment')) {
    // 타이머 비활성화
    dispatch({ type: 'SET_ACTIVE', payload: false });
    
    // 강력한 알림 표시
    const message = currentStep === 'seats' 
      ? '좌석 선택 시간이 초과되었습니다! 예매에 실패했습니다!' 
      : '결제 시간이 초과되었습니다! 예매에 실패했습니다!';
    
    // toast가 무조건 표시되도록 강제
    toast.dismiss(); // 기존 toast 모두 제거
    toast.error(message, {
      position: "top-center",
      autoClose: false, // 자동으로 닫히지 않음
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      style: {
        background: "#ff3333",
        color: "white",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "center",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        border: "1px solid #cc0000"
      },
    });
    
    // 5초 뒤에 다시 한번 알림 (toast가 제대로 뜨지 않았을 경우를 대비)
    setTimeout(() => {
      alert("예매 실패! 시간이 초과되었습니다!");
      
      // 실패 화면으로 이동
      setCurrentStep('failed');
    }, 300);
    
    // 즉시 실패 화면으로 전환
    setCurrentStep('failed');
    
    // 실패 기록 저장
    dispatch({
      type: 'SAVE_HISTORY',
      payload: {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        seats: currentStep === 'seats' ? [] : state.selectedSeats,
        result: '실패 (시간 초과)',
        venue: selectedVenue?.name
      }
    });
  }
}, [state.timeLeft, currentStep, dispatch, state.selectedSeats, selectedVenue]);
