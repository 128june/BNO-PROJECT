const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8080;

// Handlebars 템플릿 엔진 설정
app.engine('html', engine({
  extname: '.html',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'templates'),
  partialsDir: path.join(__dirname, 'templates/partials')
}));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// 정적 파일 제공 (CSS, JS, 이미지 등)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// HTML 확장자 제거를 위한 URL 리다이렉션
app.get('*.html', (req, res) => {
  const urlPath = req.path.replace('.html', '');
  res.redirect(301, urlPath === '/index' ? '/' : urlPath);
});

// 디렉토리 존재 확인 (에러 처리)
try {
  const viewsDir = path.join(__dirname, 'views');
  const partialsDir = path.join(__dirname, 'templates/partials');
  
  // 디렉토리가 없으면 경고만 출력
  if (!fs.existsSync(viewsDir)) {
    console.warn('경고: views 디렉토리가 없습니다. Git에서 clone 후 디렉토리를 생성해주세요.');
  }
  
  if (!fs.existsSync(partialsDir)) {
    console.warn('경고: templates/partials 디렉토리가 없습니다. Git에서 clone 후 디렉토리를 생성해주세요.');
  }
} catch (err) {
  console.error('디렉토리 확인 중 오류 발생:', err);
}

// 라우팅 설정
app.get('/', (req, res) => {
  res.render('index', {
    title: '홈',
    isHome: true
  });
});

app.get('/company', (req, res) => {
  res.render('company', {
    title: '회사 소개',
    isCompany: true
  });
});

app.get('/apps', (req, res) => {
  res.render('apps', {
    title: '앱 소개',
    isApps: true
  });
});

app.get('/characters', (req, res) => {
  res.render('characters', {
    title: '캐릭터 소개',
    isCharacters: true
  });
});

app.get('/products', (req, res) => {
  res.render('products', {
    title: '상품',
    isProducts: true
  });
});

app.get('/terms', (req, res) => {
  res.render('terms', {
    title: '약관',
    isTerms: true
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'CONTACT US',
    isContact: true
  });
});

// 404 페이지
app.use((req, res) => {
  res.status(404).render('404', {
    title: '페이지를 찾을 수 없습니다'
  });
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});