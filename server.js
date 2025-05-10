require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const users = [];

// JWT 시크릿 키
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 회원가입 엔드포인트
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // 이미 존재하는 사용자인지 확인
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
        }
        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);
        // 새 사용자 생성
        users.push({
            username,
            password: hashedPassword,
            practiceHistory: []
        });
        res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 로그인 엔드포인트
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // 사용자 찾기
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ message: '사용자를 찾을 수 없습니다.' });
        }
        // 비밀번호 확인
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
        }
        // JWT 토큰 생성
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, username: user.username });
    } catch (error) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 연습 기록 저장 엔드포인트
app.post('/api/practice-history', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: '인증이 필요합니다.' });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = users.find(u => u.username === decoded.username);
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
        const practiceData = req.body;
        user.practiceHistory.push(practiceData);
        res.status(201).json({ message: '연습 기록이 저장되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 연습 기록 조회 엔드포인트
app.get('/api/practice-history', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: '인증이 필요합니다.' });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = users.find(u => u.username === decoded.username);
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
        res.json(user.practiceHistory);
    } catch (error) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 기본 사용자 생성 (abcd/111)
async function createDefaultUser() {
    const existingUser = users.find(u => u.username === 'abcd');
    if (!existingUser) {
        const hashedPassword = await bcrypt.hash('111', 10);
        users.push({
            username: 'abcd',
            password: hashedPassword,
            practiceHistory: []
        });
        console.log('기본 사용자가 생성되었습니다.');
    }
}

// 모든 라우트를 index.html로 리다이렉트
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    createDefaultUser();
}); 