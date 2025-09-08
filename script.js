// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面功能
    initScrollEffects();
    initSmoothScrolling();
    initBackToTop();
    initPrintFunction();
    initSearchFunction();
    initThemeToggle();
});

// 滚动效果
function initScrollEffects() {
    const sections = document.querySelectorAll('.content-section, .sdk-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// 平滑滚动
function initSmoothScrolling() {
    // 为所有内部链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 返回顶部按钮
function initBackToTop() {
    // 创建返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', '返回顶部');
    document.body.appendChild(backToTopBtn);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .back-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
                font-size: 18px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 打印功能
function initPrintFunction() {
    // 创建打印按钮
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '🖨️ 打印';
    printBtn.className = 'print-btn';
    printBtn.setAttribute('aria-label', '打印页面');
    
    // 添加到头部
    const header = document.querySelector('.header');
    header.appendChild(printBtn);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .print-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
            padding: 10px 15px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        
        .print-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .print-btn {
                top: 15px;
                right: 15px;
                padding: 8px 12px;
                font-size: 12px;
            }
        }
        
        @media print {
            .print-btn, .back-to-top {
                display: none !important;
            }
            
            .container {
                box-shadow: none;
                margin: 0;
            }
            
            .header {
                background: #2c3e50 !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }
            
            .content-section {
                break-inside: avoid;
                box-shadow: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 点击打印
    printBtn.addEventListener('click', function() {
        window.print();
    });
}

// 搜索功能
function initSearchFunction() {
    // 创建搜索框
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="searchInput" placeholder="搜索协议内容..." class="search-input">
        <button id="searchBtn" class="search-btn">🔍</button>
        <div id="searchResults" class="search-results"></div>
    `;
    
    // 添加到头部
    const header = document.querySelector('.header');
    header.appendChild(searchContainer);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .search-container {
            position: absolute;
            top: 20px;
            left: 20px;
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 25px;
            padding: 5px;
            backdrop-filter: blur(10px);
        }
        
        .search-input {
            background: transparent;
            border: none;
            color: white;
            padding: 8px 15px;
            font-size: 14px;
            outline: none;
            width: 200px;
        }
        
        .search-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }
        
        .search-btn {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .search-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        .search-results {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            max-height: 300px;
            overflow-y: auto;
            display: none;
            z-index: 1000;
        }
        
        .search-result-item {
            padding: 10px 15px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .search-result-item:hover {
            background: #f8f9fa;
        }
        
        .search-result-item:last-child {
            border-bottom: none;
        }
        
        .search-highlight {
            background: #ffeb3b;
            padding: 2px 4px;
            border-radius: 3px;
        }
        
        @media (max-width: 768px) {
            .search-container {
                top: 15px;
                left: 15px;
            }
            
            .search-input {
                width: 150px;
                font-size: 12px;
            }
        }
    `;
    document.head.appendChild(style);
    
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    // 搜索功能
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const results = searchContent(query);
        displaySearchResults(results, query);
    });
    
    // 点击外部关闭搜索结果
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// 搜索内容
function searchContent(query) {
    const results = [];
    const content = document.querySelectorAll('.content-section, .info-block, .sdk-item');
    
    content.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            const title = element.querySelector('h2, h3')?.textContent || '相关内容';
            const snippet = element.textContent.substring(0, 200) + '...';
            results.push({
                title: title,
                snippet: snippet,
                element: element
            });
        }
    });
    
    return results;
}

// 显示搜索结果
function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">未找到相关内容</div>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" data-element="${result.element.id || ''}">
                <strong>${highlightText(result.title, query)}</strong><br>
                <small>${highlightText(result.snippet, query)}</small>
            </div>
        `).join('');
        
        // 添加点击事件
        searchResults.querySelectorAll('.search-result-item').forEach((item, index) => {
            item.addEventListener('click', function() {
                const element = results[index].element;
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                searchResults.style.display = 'none';
                
                // 高亮显示
                element.style.background = '#fff3cd';
                setTimeout(() => {
                    element.style.background = '';
                }, 3000);
            });
        });
    }
    
    searchResults.style.display = 'block';
}

// 高亮文本
function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

// 主题切换功能
function initThemeToggle() {
    // 创建主题切换按钮
    const themeBtn = document.createElement('button');
    themeBtn.innerHTML = '🌙';
    themeBtn.className = 'theme-toggle';
    themeBtn.setAttribute('aria-label', '切换主题');
    
    // 添加到头部
    const header = document.querySelector('.header');
    header.appendChild(themeBtn);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle {
            position: absolute;
            top: 20px;
            right: 80px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
            padding: 10px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .theme-toggle:hover {
            background: rgba(255, 255, 255, 0.3);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .theme-toggle {
                top: 15px;
                right: 70px;
                width: 40px;
                height: 40px;
                font-size: 14px;
            }
        }
        
        /* 深色主题 */
        .dark-theme {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }
        
        .dark-theme .container {
            background: #2c3e50;
            color: #ecf0f1;
        }
        
        .dark-theme .content-section {
            background: #34495e;
            color: #ecf0f1;
        }
        
        .dark-theme .info-block {
            background: #2c3e50;
            color: #ecf0f1;
        }
        
        .dark-theme .sdk-item {
            background: #2c3e50;
            color: #ecf0f1;
        }
        
        .dark-theme .intro {
            background: #34495e;
            color: #ecf0f1;
        }
    `;
    document.head.appendChild(style);
    
    // 主题切换逻辑
    let isDark = false;
    themeBtn.addEventListener('click', function() {
        isDark = !isDark;
        document.body.classList.toggle('dark-theme', isDark);
        themeBtn.innerHTML = isDark ? '☀️' : '🌙';
        
        // 保存主题偏好
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // 加载保存的主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDark = true;
        document.body.classList.add('dark-theme');
        themeBtn.innerHTML = '☀️';
    }
}

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + F 聚焦搜索框
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // ESC 关闭搜索结果
    if (e.key === 'Escape') {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }
    
    // Ctrl/Cmd + P 打印
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
});
