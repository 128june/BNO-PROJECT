# BNO COMPANY 웹사이트

## 프로젝트 설명
BNO COMPANY의 공식 웹사이트입니다.

## 설치 방법

### 1. 저장소 복제
```
git clone [저장소 URL]
cd BNO-PROJECT
```

### 2. 필요한 디렉토리 생성
```
mkdir -p views templates/partials
```

### 3. 의존성 설치
```
npm install
```

### 4. 서버 실행
```
npm start
```

## 개발 모드로 실행
```
npm run dev
```

## 디렉토리 구조
- `views/`: 각 페이지의 콘텐츠 템플릿
- `templates/`: 레이아웃 템플릿
- `templates/partials/`: 부분 템플릿
- `public/`: 정적 파일 (CSS, 이미지 등)
- `js/`: 자바스크립트 파일

## 기술 스택
- Node.js
- Express
- Handlebars (템플릿 엔진)