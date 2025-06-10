// 페이지 로드 시 실행되는 공통 함수
document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지 URL 가져오기
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    // 현재 페이지에 해당하는 메뉴 항목에 active 클래스 추가
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // 현재 페이지와 링크 경로 비교
        if (href.includes(currentPage) || 
            (currentPage === '' && href.includes('index.html'))) {
            link.classList.add('active');
            
            // 부모 메뉴 항목도 활성화
            const parentLi = link.closest('li');
            if (parentLi && parentLi.parentElement && parentLi.parentElement.classList.contains('submenu')) {
                const parentMenu = parentLi.parentElement.closest('li').querySelector('a');
                if (parentMenu) {
                    parentMenu.classList.add('active');
                }
            }
        }
    });
    
    // 앵커 링크 부드럽게 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // 헤더 높이 고려
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});