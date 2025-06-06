// 공통 요소 관리 스크립트
document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지 경로 확인
    const path = window.location.pathname;
    const currentPage = path.split('/').pop().replace('.html', '') || 'index';
    
    // 헤더 삽입
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = `
        <div class="header-container container">
            <div class="logo">
                <a href="index.html">BNO COMPANY</a>
            </div>
            <nav>
                <button class="menu-toggle">☰</button>
                <ul>
                    <li><a href="company.html" ${currentPage === 'company' ? 'class="active"' : ''}>회사 소개</a>
                        <ul class="submenu">
                            <li><a href="apps.html" ${currentPage === 'apps' ? 'class="active"' : ''}>앱 소개</a></li>
                        </ul>
                    </li>
                    <li><a href="characters.html" ${currentPage === 'characters' ? 'class="active"' : ''}>캐릭터 소개</a></li>
                    <li><a href="products.html" ${currentPage === 'products' ? 'class="active"' : ''}>상품</a>
                        <ul class="submenu">
                            <li><a href="products.html#keyring">키링</a></li>
                            <li><a href="products.html#doll">인형</a></li>
                            <li><a href="products.html#others">그 외</a></li>
                        </ul>
                    </li>
                    <li><a href="terms.html" ${currentPage === 'terms' ? 'class="active"' : ''}>약관</a></li>
                    <li><a href="contact.html" ${currentPage === 'contact' ? 'class="active"' : ''}>CONTACT US</a></li>
                </ul>
            </nav>
        </div>
        `;
    }
    
    // 푸터 삽입
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>회사 정보</h3>
                    <p>주소: 서울특별시 강남구 강남대로112길 47</p>
                    <p>이메일: bnocompany818@gmail.com</p>
                    <p>사업자등록번호: 373-43-01170</p>
                </div>
                <div class="footer-section">
                    <h3>바로가기</h3>
                    <ul>
                        <li><a href="company.html">회사 소개</a></li>
                        <li><a href="characters.html">캐릭터 소개</a></li>
                        <li><a href="products.html">상품</a></li>
                        <li><a href="terms.html">약관</a></li>
                        <li><a href="contact.html">CONTACT US</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>소셜 미디어</h3>
                    <ul>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">YouTube</a></li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; 2023 BNO COMPANY. All rights reserved.</p>
            </div>
        </div>
        `;
    }
    
    // 모바일 메뉴 토글
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
    });
});