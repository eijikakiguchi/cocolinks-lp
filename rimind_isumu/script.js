document.addEventListener('DOMContentLoaded', () => {
    // 1. スムーススクロール（ページ内リンク）
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // ヘッダーが固定される場合などを考慮して調整可能
                const offset = 0; 
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. スクロール時のフェードインアニメーション
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');
    
    // Intersection Observerの設定
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 要素が15%画面に入ったら発火
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // 一度発火したら監視を解除する
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // ファーストビューのコンテンツは読み込み後すぐにフェードインさせる
    setTimeout(() => {
        const fvContent = document.querySelector('.fv-content');
        if (fvContent) {
            fvContent.classList.add('is-visible');
        }
    }, 300);

    // 3. 下部固定CTAの表示・非表示制御
    const fixedCta = document.getElementById('fixed-cta');
    const fvSection = document.getElementById('fv');
    // const closingSection = document.getElementById('closing'); // 最後に隠す場合などに使用

    if (fixedCta && fvSection) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            // ファーストビューの高さを取得
            const fvBottom = fvSection.offsetHeight;
            
            // スクロール量がFVの高さを超えたら固定CTAを表示
            if (scrollY > fvBottom - 100) {
                fixedCta.classList.add('is-show');
            } else {
                fixedCta.classList.remove('is-show');
            }
        });
    }
});
