// 헤더와 푸터를 포함시키는 함수
document.addEventListener('DOMContentLoaded', function() {
    // 헤더 포함
    const headerPlaceholder = document.querySelector('#header-placeholder');
    if (headerPlaceholder) {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // 헤더가 로드된 후 메뉴 스크립트 실행
                const menuToggle = document.querySelector('.menu-toggle');
                const nav = document.querySelector('nav');
                
                if (menuToggle) {
                    menuToggle.addEventListener('click', function() {
                        nav.classList.toggle('active');
                    });
                }
                
                // 현재 페이지 메뉴 활성화
                const currentPage = window.location.pathname.split('/').pop();
                const menuLinks = document.querySelectorAll('nav ul li a');
                
                menuLinks.forEach(link => {
                    if (link.getAttribute('href') === currentPage) {
                        link.classList.add('active');
                    }
                });
            })
            .catch(error => console.error('헤더를 불러오는 중 오류가 발생했습니다:', error));
    }
    
    // 푸터 포함
    const footerPlaceholder = document.querySelector('#footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('푸터를 불러오는 중 오류가 발생했습니다:', error));
    }
});