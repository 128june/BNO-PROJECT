// 페이지 로드 시 실행되는 스크립트
document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 완료 후 페이드인 효과
    document.body.classList.add('loaded');
    
    // 스크롤 이벤트 처리
    window.addEventListener('scroll', function() {
        // 스크롤 위치에 따라 헤더 스타일 변경
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 요소가 화면에 나타날 때 애니메이션 효과
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    });
    
    // 이미지 로드 지연 처리
    const lazyImages = document.querySelectorAll('.lazy-load');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-load');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // IntersectionObserver를 지원하지 않는 브라우저를 위한 폴백
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});