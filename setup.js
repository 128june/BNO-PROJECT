/**
 * 프로젝트 초기 설정 스크립트
 * Git에서 복제한 후 필요한 디렉토리를 생성합니다.
 */

const fs = require('fs');
const path = require('path');

// 필요한 디렉토리 목록
const directories = [
  'views',
  'templates/partials',
  'public',
  'public/css',
  'public/js',
  'public/images'
];

// 디렉토리 생성 함수
function createDirectory(dir) {
  const fullPath = path.join(__dirname, dir);
  
  if (!fs.existsSync(fullPath)) {
    try {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`✅ 디렉토리 생성 완료: ${dir}`);
    } catch (err) {
      console.error(`❌ 디렉토리 생성 실패: ${dir}`, err);
    }
  } else {
    console.log(`ℹ️ 디렉토리가 이미 존재합니다: ${dir}`);
  }
}

// 모든 디렉토리 생성
console.log('프로젝트 디렉토리 구조 설정 중...');
directories.forEach(createDirectory);
console.log('설정 완료!');
console.log('이제 `npm install` 명령어로 의존성을 설치하고 `npm start`로 서버를 실행하세요.');