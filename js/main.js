// OpenClaw教学网站主脚本

document.addEventListener('DOMContentLoaded', function() {
    console.log('OpenClaw教学网站已加载');
    
    // 添加页面加载动画
    addPageAnimations();
    
    // 初始化滚动监听
    initScrollEffects();
    
    // 添加代码复制功能
    initCodeCopy();
    
    // 添加导航栏激活状态
    initNavbarActive();
});

/**
 * 添加页面加载动画
 */
function addPageAnimations() {
    // 为所有卡片添加淡入动画
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // 为标题添加动画
    const headings = document.querySelectorAll('h1, h2, h3, h4');
    headings.forEach((heading, index) => {
        heading.classList.add('fade-in');
        heading.style.animationDelay = `${index * 0.1}s`;
    });
}

/**
 * 初始化滚动效果
 */
function initScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 导航栏滚动效果
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            navbar.style.background = 'rgba(33, 37, 41, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'var(--bs-dark)';
        }
        
        // 滚动方向检测
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // 向下滚动
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // 滚动到顶部按钮
        toggleScrollToTop(scrollTop);
    });
}

/**
 * 显示/隐藏滚动到顶部按钮
 */
function toggleScrollToTop(scrollTop) {
    let scrollBtn = document.getElementById('scrollToTop');
    
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.id = 'scrollToTop';
        scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollBtn.className = 'btn btn-primary rounded-circle';
        scrollBtn.style.position = 'fixed';
        scrollBtn.style.bottom = '20px';
        scrollBtn.style.right = '20px';
        scrollBtn.style.zIndex = '1000';
        scrollBtn.style.width = '50px';
        scrollBtn.style.height = '50px';
        scrollBtn.style.display = 'none';
        scrollBtn.style.fontSize = '1.2rem';
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollBtn);
    }
    
    if (scrollTop > 300) {
        scrollBtn.style.display = 'block';
        setTimeout(() => {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'scale(1)';
        }, 10);
    } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (scrollTop <= 300) {
                scrollBtn.style.display = 'none';
            }
        }, 300);
    }
}

/**
 * 初始化代码复制功能
 */
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        
        // 创建复制按钮
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn btn-sm btn-outline-light copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> 复制';
        copyBtn.style.position = 'absolute';
        copyBtn.style.top = '10px';
        copyBtn.style.right = '10px';
        copyBtn.style.zIndex = '10';
        
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', function() {
            const code = block.textContent;
            navigator.clipboard.writeText(code).then(() => {
                // 显示复制成功提示
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> 已复制';
                copyBtn.classList.remove('btn-outline-light');
                copyBtn.classList.add('btn-success');
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.classList.remove('btn-success');
                    copyBtn.classList.add('btn-outline-light');
                }, 2000);
            }).catch(err => {
                console.error('复制失败:', err);
                copyBtn.innerHTML = '<i class="fas fa-times"></i> 失败';
                copyBtn.classList.remove('btn-outline-light');
                copyBtn.classList.add('btn-danger');
                
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i> 复制';
                    copyBtn.classList.remove('btn-danger');
                    copyBtn.classList.add('btn-outline-light');
                }, 2000);
            });
        });
    });
}

/**
 * 初始化导航栏激活状态
 */
function initNavbarActive() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * 添加页面加载进度条
 */
function addLoadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'loadingProgress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'var(--primary-color)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.3s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 调用加载进度条
addLoadingProgress();