// 서버 시간
function updateServerTime() {
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const timeStr = `${now.getFullYear()}. ${now.getMonth()+1}. ${now.getDate()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  document.getElementById('server-time').textContent = timeStr;
}
setInterval(updateServerTime, 1000);
updateServerTime();

// 로그인
const loginModal = document.getElementById('login-modal');
const mainSection = document.getElementById('main-section');
const logoutBtn = document.getElementById('logout-btn');
document.getElementById('login-btn').onclick = () => {
  loginModal.classList.remove('show');
  if (mainSection) mainSection.style.display = '';
  if (logoutBtn) logoutBtn.style.display = '';
  localStorage.setItem('ticket-user', document.getElementById('login-id').value);
};
logoutBtn.onclick = () => {
  localStorage.removeItem('ticket-user');
  location.reload();
};

// 구역/좌석
const zones = ['A', 'B', 'C', 'D'];
const seatsPerZone = 10;
let sold = {};
let selected = null;
let timer = 60;
let interval = null;
let history = JSON.parse(localStorage.getItem('ticket-history')||'[]');

function renderZones() {
  const zonesDiv = document.getElementById('zones');
  zonesDiv.innerHTML = '';
  zones.forEach(z => {
    const div = document.createElement('div');
    div.className = 'zone';
    div.innerHTML = `<b>${z}구역</b><div class="seats"></div>`;
    const seatsDiv = div.querySelector('.seats');
    for (let i=0; i<seatsPerZone; i++) {
      const seat = document.createElement('div');
      seat.className = 'seat' + (sold[z]?.includes(i) ? ' sold' : '') + (selected && selected.zone===z && selected.idx===i ? ' selected' : '');
      seat.onclick = () => {
        if (sold[z]?.includes(i)) return;
        selected = {zone:z, idx:i};
        document.getElementById('selected-seat').textContent = `${z}구역 ${i+1}번`;
        document.getElementById('buy-btn').disabled = false;
        renderZones();
      };
      seatsDiv.appendChild(seat);
    }
    div.appendChild(seatsDiv);
    zonesDiv.appendChild(div);
  });
}

function startGame() {
  sold = {};
  selected = null;
  timer = 60;
  document.getElementById('selected-seat').textContent = '';
  document.getElementById('buy-btn').disabled = true;
  renderZones();
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    timer--;
    document.getElementById('timer').textContent = `남은 시간: ${timer}s`;
    // 랜덤 매진
    zones.forEach(z => {
      if (!sold[z]) sold[z] = [];
      if (Math.random() < 0.2 && sold[z].length < seatsPerZone) {
        let s;
        do { s = Math.floor(Math.random()*seatsPerZone); } while(sold[z].includes(s));
        sold[z].push(s);
      }
    });
    renderZones();
    if (timer <= 0) { clearInterval(interval); alert('타임아웃!'); saveHistory('실패'); startGame(); }
  }, 1000);
}

startGame();

document.getElementById('buy-btn').onclick = () => {
  if (!selected) return;
  document.getElementById('pay-modal').classList.add('show');
  document.getElementById('pay-name').value = '';
  document.getElementById('pay-card').value = '';
  let payTime = 10;
  document.getElementById('pay-timer').textContent = `결제 제한: ${payTime}s`;
  const payInterval = setInterval(() => {
    payTime--;
    document.getElementById('pay-timer').textContent = `결제 제한: ${payTime}s`;
    if (payTime <= 0) {
      clearInterval(payInterval);
      alert('결제 실패(시간초과)');
      document.getElementById('pay-modal').classList.remove('show');
      saveHistory('실패');
      startGame();
    }
  }, 1000);
  document.getElementById('pay-btn').onclick = () => {
    clearInterval(payInterval);
    alert('결제 성공! 예매 완료');
    document.getElementById('pay-modal').classList.remove('show');
    sold[selected.zone].push(selected.idx);
    saveHistory('성공');
    selected = null;
    document.getElementById('selected-seat').textContent = '';
    document.getElementById('buy-btn').disabled = true;
    renderZones();
    startGame();
  };
};

function saveHistory(result) {
  const user = localStorage.getItem('ticket-user') || '게스트';
  const now = new Date();
  history.push({
    user,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    result
  });
  if (history.length > 10) history = history.slice(-10);
  localStorage.setItem('ticket-history', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const hdiv = document.getElementById('history');
  hdiv.innerHTML = '<h3>최근 기록</h3>' +
    '<ul>' + history.map((h, i) =>
      `<li>${h.date} ${h.time} - ${h.user} - ${h.result} <button class="delete-history" onclick="deleteHistory(${i})">×</button></li>`
    ).join('') + '</ul>';
}
window.deleteHistory = function(idx) {
  history.splice(idx, 1);
  localStorage.setItem('ticket-history', JSON.stringify(history));
  renderHistory();
};
document.getElementById('clear-history-btn').onclick = () => {
  if (confirm('정말 모든 기록을 삭제할까요?')) {
    history = [];
    localStorage.removeItem('ticket-history');
    renderHistory();
  }
};
renderHistory(); 