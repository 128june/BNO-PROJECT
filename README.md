# BNO COMPANY 웹사이트

BNO COMPANY의 공식 웹사이트 프로젝트입니다.

## 기능

- 회사 소개
- 앱 소개
- 캐릭터 소개
- 상품 소개
- 약관
- 문의하기

## 기술 스택

- HTML5
- CSS3
- JavaScript
- Node.js
- Express

## 설치 및 실행 방법

1. 저장소 클론
```bash
git clone https://github.com/yourusername/bno-company-website.git
cd bno-company-website
```

2. 의존성 설치
```bash
npm install
```

3. 서버 실행
```bash
npm start
```

4. 브라우저에서 `http://localhost:3000` 접속

## GitHub Pages 배포 방법

1. GitHub 저장소 생성

2. 저장소에 코드 푸시
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/bno-company-website.git
git push -u origin main
```

3. GitHub Pages 설정
   - GitHub 저장소 페이지에서 Settings > Pages로 이동
   - Source를 main 브랜치의 /docs 폴더로 설정
   - Save 클릭

4. 배포를 위한 정적 파일 생성
   - public 폴더의 내용을 docs 폴더로 복사
   - 모든 URL을 상대 경로로 변경 (예: `/css/style.css` → `css/style.css`)

## 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.