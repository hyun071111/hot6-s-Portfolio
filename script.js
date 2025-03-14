// 스무스 스크롤 구현
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;

    // 오버레이 엘리먼트 생성
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    body.appendChild(overlay);

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    }

    // 햄버거 버튼 클릭 이벤트
    hamburger.addEventListener('click', toggleMenu);

    // 오버레이 클릭 시 메뉴 닫기
    overlay.addEventListener('click', toggleMenu);

    // 메뉴 링크 클릭 시 메뉴 닫기
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 화면 크기가 변경될 때 메뉴 상태 초기화
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && hamburger.classList.contains('active')) {
            toggleMenu();
        }
    });

    // 프로젝트 카드 호버 효과
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 프로젝트 카드 클릭 이벤트 처리
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url') || card.getAttribute('data-github-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });

    // 스무스 스크롤 구현
    const navLinksList = navLinks.querySelectorAll('a');
    
    navLinksList.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const headerOffset = 80; // 헤더 높이를 고려한 오프셋
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // 활성 링크 스타일 적용
            navLinksList.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 스크롤 위치에 따른 활성 메뉴 표시
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const headerOffset = 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - headerOffset) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
