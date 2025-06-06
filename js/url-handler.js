// URL 핸들러 - HTML 확장자 제거
document.addEventListener('DOMContentLoaded', function() {
    // 모든 링크에서 .html 확장자를 제거
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        // 외부 링크나 앵커 링크, 이미 처리된 링크는 건너뜀
        if (href.startsWith('http') || href.startsWith('#') || href === '/' || href.startsWith('/') && !href.endsWith('.html')) {
            return;
        }
        
        // index.html은 루트 경로로 변경
        if (href === 'index.html') {
            link.setAttribute('href', '/');
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
        } else if (!href.startsWith('/') && href !== '#') {
            link.setAttribute('href', '/' + href);
        }
    });
});