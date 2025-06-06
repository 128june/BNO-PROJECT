// HTML 파일 포함 기능
document.addEventListener('DOMContentLoaded', function() {
    // 모든 링크에서 .html 확장자를 제거하는 함수
    function updateLinks() {
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            // 외부 링크나 앵커 링크는 건너뜀
            if (href.startsWith('http') || href.startsWith('#') || href === '/') {
                return;
            }
            
            // .html 확장자 제거 및 경로 정규화
            if (href.endsWith('.html')) {
                const newHref = href.replace('.html', '');
                if (!newHref.startsWith('/')) {
                    link.setAttribute('href', '/' + newHref);
                } else {
                    link.setAttribute('href', newHref);
                }
            } else if (!href.startsWith('/')) {
                link.setAttribute('href', '/' + href);
            }
        });
    }

    // 헤더와 푸터 로드
    const includeElements = document.querySelectorAll('[data-include]');
    let loaded = 0;
    
    includeElements.forEach(element => {
        const file = element.getAttribute('data-include');
        fetch(file)
            .then(response => response.text())
            .then(html => {
                element.innerHTML = html;
                loaded++;
                
                // 모든 include가 로드된 후 링크 업데이트
                if (loaded === includeElements.length) {
                    updateLinks();
                }
            })
            .catch(error => {
                console.error(`Error loading ${file}: ${error}`);
            });
    });
    
    // 직접 페이지에 있는 링크도 업데이트
    updateLinks();
});