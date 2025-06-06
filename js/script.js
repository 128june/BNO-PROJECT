// 모바일 메뉴 토글
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // 서브메뉴가 있는 항목 클릭 처리 (모바일)
    const menuItems = document.querySelectorAll('nav ul li');
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');
        
        if (submenu && window.innerWidth <= 768) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });
    
    // 현재 페이지 메뉴 활성화
    const currentPage = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('nav ul li a');
    
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});