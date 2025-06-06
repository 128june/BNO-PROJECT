const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 라우팅 설정
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/company', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'company.html'));
});

app.get('/apps', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'apps.html'));
});

app.get('/characters', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'characters.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'terms.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// 404 페이지
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});