// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const body = document.body;
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const background = document.querySelector('.background');
    const socialIcons = document.querySelectorAll('.social-icon');
    const logo = document.querySelector('.logo svg');
    const loadingScreen = document.querySelector('.loading-screen');
    const fluidPaths = document.querySelectorAll('.fluid-path');
    
    // 确保社交图标链接正常工作，并添加点击动画效果
    socialIcons.forEach(icon => {
        // 添加悬停效果
        icon.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        // 点击效果 - 只添加动画，不干预链接默认行为
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // 初始化流体动画
    function initFluidAnimation() {
        if (fluidPaths && fluidPaths.length > 0) {
            const paths = [
                "M800,0 Q600,200 400,100 T0,300 V0 H800 Z",
                "M800,0 Q550,250 350,150 T0,350 V0 H800 Z",
                "M800,0 Q500,300 300,200 T0,400 V0 H800 Z"
            ];
            
            // 设置初始路径
            fluidPaths.forEach((path, index) => {
                if (index < paths.length) {
                    path.setAttribute('d', paths[index]);
                }
            });
            
            // 添加动画
            const animations = [
                'fluidMove1 25s ease-in-out infinite alternate',
                'fluidMove2 20s ease-in-out infinite alternate',
                'fluidMove3 30s ease-in-out infinite alternate'
            ];
            
            fluidPaths.forEach((path, index) => {
                if (index < animations.length) {
                    path.style.animation = animations[index];
                }
            });
        }
    }
    
    // 乱码到文字效果函数
    function decryptEffect(element, finalText, duration = 2000, stepTime = 30) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}:<>?|~`";
        const steps = Math.floor(duration / stepTime);
        const finalLength = finalText.length;
        let currentStep = 0;
        
        // 初始化为随机字符
        element.textContent = Array(finalLength)
            .fill()
            .map(() => characters[Math.floor(Math.random() * characters.length)])
            .join('');
        
        const interval = setInterval(() => {
            currentStep++;
            
            // 计算已解密的字符数
            const decryptedLength = Math.floor((currentStep / steps) * finalLength);
            
            // 构建当前文本状态
            let currentText = '';
            for (let i = 0; i < finalLength; i++) {
                if (i < decryptedLength) {
                    // 已解密的字符
                    currentText += finalText[i];
                } else {
                    // 仍是乱码的字符
                    currentText += characters[Math.floor(Math.random() * characters.length)];
                }
            }
            
            element.textContent = currentText;
            
            // 全部解密完成后清除定时器
            if (currentStep >= steps) {
                clearInterval(interval);
                element.textContent = finalText;
            }
        }, stepTime);
    }
    
    // 处理加载动画
    window.addEventListener('load', function() {
        // 初始化流体动画
        initFluidAnimation();
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                
                // 页面加载完成后开始文字动画效果
                const greetingElement = document.querySelector('.greeting');
                const nameElement = document.querySelector('.name');
                
                if (greetingElement && nameElement) {
                    // 存储原始文本
                    const greetingText = greetingElement.textContent;
                    const nameText = nameElement.textContent;
                    
                    // 确保元素可见
                    greetingElement.style.opacity = '1';
                    nameElement.style.opacity = '1';
                    
                    // 应用乱码效果
                    setTimeout(() => {
                        decryptEffect(greetingElement, greetingText, 1500, 25);
                    }, 100);
                    
                    setTimeout(() => {
                        decryptEffect(nameElement, nameText, 2000, 30);
                    }, 800);
                }
            }, 500);
        }, 1500); // 1.5秒后隐藏加载动画
    });
    
    // 检查本地存储中的主题偏好
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // 切换暗/亮模式
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        
        // 更新图标并添加旋转动画
        if (body.classList.contains('light-mode')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
            this.style.animation = 'rotate 0.5s ease-out';
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
            this.style.animation = 'rotate 0.5s ease-out';
        }
        
        // 动画结束后移除动画
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
    
    // 添加css旋转动画
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
            }
            100% {
                transform: translateY(30px) translateX(15px);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 0.8;
            }
            50% {
                transform: scale(1.05);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // 创建更高级的背景动画效果
    function createBackgroundEffect() {
        // 清除现有粒子
        const particles = document.querySelectorAll('.particle');
        particles.forEach(p => p.remove());
        
        // 移动设备上减少粒子数量以提高性能
        let particleCount = window.innerWidth <= 768 ? 15 : 30;
        
        // 创建粒子效果
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // 随机样式
            const size = Math.random() * 15 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const opacity = Math.random() * 0.3 + 0.1;
            const delay = Math.random() * 5;
            const duration = Math.random() * 20 + 15;
            
            // 使用自定义动画
            const animationType = Math.random() > 0.7 ? 'pulse' : 'float';
            const animationParams = animationType === 'pulse' 
                ? `${animationType} ${Math.random() * 5 + 3}s ease-in-out infinite`
                : `${animationType} ${duration}s ease-in-out infinite alternate`;
            
            // 应用样式
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: ${Math.random() > 0.9 ? 'rgba(0, 200, 255, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
                border-radius: 50%;
                top: ${posY}%;
                left: ${posX}%;
                animation: ${animationParams};
                animation-delay: ${delay}s;
                z-index: 0;
                filter: blur(${Math.random() * 2}px);
            `;
            
            background.appendChild(particle);
        }
        
        // 添加特殊效果粒子（较大，透明度更低）
        for (let i = 0; i < 3; i++) {
            const specialParticle = document.createElement('div');
            specialParticle.classList.add('particle');
            
            const size = Math.random() * 50 + 30;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            specialParticle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(0, 200, 255, 0.05);
                border-radius: 50%;
                top: ${posY}%;
                left: ${posX}%;
                animation: pulse ${Math.random() * 10 + 10}s ease-in-out infinite;
                z-index: 0;
                filter: blur(10px);
            `;
            
            background.appendChild(specialParticle);
        }
    }
    
    // 添加鼠标移动效果
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        if (!isMoving) {
            isMoving = true;
            requestAnimationFrame(updateParticles);
        }
    });
    
    function updateParticles() {
        if (!isMoving) return;
        
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const moveX = (mouseX - 0.5) * 10;
            const moveY = (mouseY - 0.5) * 10;
            
            // 添加微小的视差效果
            const speedFactor = Math.random() * 0.2 + 0.1;
            particle.style.transform = `translate(${moveX * speedFactor}px, ${moveY * speedFactor}px)`;
        });
        
        // Logo 跟随鼠标微小移动
        if (logo) {
            const logoMoveX = (mouseX - 0.5) * 5;
            const logoMoveY = (mouseY - 0.5) * 5;
            logo.style.transform = `translate(${logoMoveX}px, ${logoMoveY}px)`;
        }
        
        // 流体动画跟随鼠标移动
        if (fluidPaths && fluidPaths.length > 0) {
            fluidPaths.forEach((path, index) => {
                const moveX = (mouseX - 0.5) * (index + 1) * 20;
                const moveY = (mouseY - 0.5) * (index + 1) * 20;
                path.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        }
        
        requestAnimationFrame(updateParticles);
    }
    
    // 初始化背景效果
    createBackgroundEffect();
    
    // 监听窗口大小变化，根据需要重新创建背景效果
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            createBackgroundEffect();
        }, 200);
    });
    
    // 添加技能标签动画效果
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
    
    // 添加打字机效果（可选）- 修改为在乱码效果之后执行
    const typingElement = document.querySelector('.job');
    if (typingElement) {
        const jobText = typingElement.textContent;
        typingElement.textContent = '';
        
        function typeWriter(text, element, i = 0) {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(() => typeWriter(text, element, i), 100);
            }
        }
        
        // 页面加载后延迟开始打字效果，在乱码效果之后
        setTimeout(() => {
            typingElement.style.opacity = '1';
            typeWriter(jobText, typingElement);
        }, 3000);
    }
}); 