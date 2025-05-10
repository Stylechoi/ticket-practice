// 서버 시간 표시
function updateServerTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    document.getElementById('current-time').textContent = timeString;
}

// 매 초마다 서버 시간 업데이트
setInterval(updateServerTime, 1000);
updateServerTime();

// 티켓팅 연습 관련 변수
let practiceStartTime = null;
let countdownInterval = null;
let ticketInterval = null;
let successCount = 0;
let failCount = 0;
let remainingTickets = 0;

// 티켓 생성 함수
function generateTicket() {
    const seatNumber = Math.floor(Math.random() * 100) + 1;
    const price = Math.floor(Math.random() * 5 + 1) * 10000;
    
    document.getElementById('seat-number').textContent = `A${seatNumber}`;
    document.getElementById('ticket-price').textContent = price.toLocaleString();
    
    // 티켓이 나타나는 애니메이션
    const ticket = document.getElementById('ticket');
    ticket.style.opacity = '0';
    setTimeout(() => {
        ticket.style.opacity = '1';
    }, 100);
}

// 연습 시작 버튼 클릭 이벤트
document.getElementById('start-practice').addEventListener('click', function() {
    if (practiceStartTime) return;

    const now = new Date();
    practiceStartTime = now;
    
    // 시작 시간 표시
    document.getElementById('start-time').textContent = now.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    // 카운트다운 시작 (5분)
    let timeLeft = 5 * 60;
    updateCountdown(timeLeft);

    countdownInterval = setInterval(() => {
        timeLeft--;
        updateCountdown(timeLeft);

        if (timeLeft <= 0) {
            endPractice();
        }
    }, 1000);

    // 티켓 게임 시작
    document.getElementById('ticket-game').classList.add('active');
    document.getElementById('buy-ticket').disabled = false;
    document.getElementById('end-practice').disabled = false;
    this.disabled = true;
    
    // 초기 티켓 생성
    remainingTickets = 10;
    document.getElementById('remaining-tickets').textContent = remainingTickets;
    generateTicket();
    
    // 3초마다 새로운 티켓 생성
    ticketInterval = setInterval(() => {
        if (remainingTickets > 0) {
            generateTicket();
        }
    }, 3000);
});

// 티켓 구매 버튼 클릭 이벤트
document.getElementById('buy-ticket').addEventListener('click', function() {
    if (remainingTickets <= 0) return;
    
    remainingTickets--;
    document.getElementById('remaining-tickets').textContent = remainingTickets;
    
    // 랜덤하게 성공/실패 결정 (70% 성공 확률)
    const isSuccess = Math.random() < 0.7;
    if (isSuccess) {
        successCount++;
        document.getElementById('success-count').textContent = successCount;
    } else {
        failCount++;
        document.getElementById('fail-count').textContent = failCount;
    }
    
    // 새로운 티켓 생성
    if (remainingTickets > 0) {
        generateTicket();
    } else {
        endPractice();
    }
});

// 연습 종료 버튼 클릭 이벤트
document.getElementById('end-practice').addEventListener('click', function() {
    endPractice();
});

// 연습 초기화 버튼 클릭 이벤트
document.getElementById('reset-practice').addEventListener('click', function() {
    resetPractice();
});

// 카운트다운 업데이트
function updateCountdown(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    document.getElementById('countdown').textContent = timeString;
}

// 연습 종료
function endPractice() {
    clearInterval(countdownInterval);
    clearInterval(ticketInterval);
    practiceStartTime = null;
    
    document.getElementById('start-practice').disabled = false;
    document.getElementById('end-practice').disabled = true;
    document.getElementById('buy-ticket').disabled = true;
    document.getElementById('ticket-game').classList.remove('active');
    
    // 연습 기록 추가
    addPracticeRecord();
}

// 연습 초기화
function resetPractice() {
    clearInterval(countdownInterval);
    clearInterval(ticketInterval);
    practiceStartTime = null;
    successCount = 0;
    failCount = 0;
    remainingTickets = 0;
    
    document.getElementById('start-practice').disabled = false;
    document.getElementById('end-practice').disabled = true;
    document.getElementById('buy-ticket').disabled = true;
    document.getElementById('ticket-game').classList.remove('active');
    document.getElementById('start-time').textContent = '--:--:--';
    document.getElementById('countdown').textContent = '--:--:--';
    document.getElementById('remaining-tickets').textContent = '0';
    document.getElementById('success-count').textContent = '0';
    document.getElementById('fail-count').textContent = '0';
}

// 연습 기록 추가
function addPracticeRecord() {
    const now = new Date();
    const startTime = practiceStartTime.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const duration = Math.floor((now - practiceStartTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    const durationString = `${minutes}분 ${seconds}초`;
    
    const totalAttempts = successCount + failCount;
    const successRate = totalAttempts > 0 ? Math.round((successCount / totalAttempts) * 100) : 0;

    const tbody = document.getElementById('history-body');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${now.toLocaleDateString('ko-KR')}</td>
        <td>${startTime}</td>
        <td>${durationString}</td>
        <td>${successCount}</td>
        <td>${failCount}</td>
        <td>${successRate}%</td>
    `;
    
    tbody.insertBefore(row, tbody.firstChild);
} 