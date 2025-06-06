const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

// 인코딩 수정 함수
function fixEncoding(filePath) {
  try {
    // 파일 읽기
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 메뉴 토글 버튼 수정
    let fixedContent = content.replace(/(?:<button class="menu-toggle">).*?(?:<\/button>)/g, '<button class="menu-toggle">☰</button>');
    
    // 닫히지 않은 태그 수정
    fixedContent = fixedContent.replace(/<h1>.*?(?!<\/h1>)(\r?\n)/g, (match, p1) => match.replace(p1, '</h1>' + p1));
    fixedContent = fixedContent.replace(/<p>.*?(?!<\/p>)(\r?\n)/g, (match, p1) => match.replace(p1, '</p>' + p1));
    fixedContent = fixedContent.replace(/<h2>.*?(?!<\/h2>)(\r?\n)/g, (match, p1) => match.replace(p1, '</h2>' + p1));
    fixedContent = fixedContent.replace(/<h3>.*?(?!<\/h3>)(\r?\n)/g, (match, p1) => match.replace(p1, '</h3>' + p1));
    
    // 깨진 스크립트 태그 수정
    fixedContent = fixedContent.replace(/<script src="\/js\/url-handler.js"><\/script>\\r\\n<\/body>/g, '<script src="/js/url-handler.js"></script>\n</body>');
    
    // 파일 저장
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log(`Fixed: ${filePath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}: ${err.message}`);
  }
}

// 모든 HTML 파일 처리
function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (path.extname(file).toLowerCase() === '.html') {
      fixEncoding(filePath);
    }
  });
}

// 실행
console.log('Starting encoding fix...');
processDirectory(path.resolve(__dirname));
console.log('Encoding fix completed!');