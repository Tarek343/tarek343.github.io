document.addEventListener('DOMContentLoaded', () => {
    
    // 🚨 التعديل النهائي: لفرض التمرير للأعلى عند التحميل ومنع القفز إلى #Contact
    // نستخدم setTimeout لضمان أن هذا الكود يعمل بعد اكتمال تحميل الصفحة بالكامل
    setTimeout(() => {
        window.scrollTo(0, 0);
        // إزالة علامة الهاش من الرابط لمنع التمرير التلقائي في التحميلات المستقبلية
        if(window.location.hash) {
            history.replaceState('', document.title, window.location.pathname + window.location.search);
        }
    }, 50); // تأخير بسيط جداً (50ms)
    
    // ==============================================
    // Scripts from Original HTML (وظائف أساسية)
    // ==============================================
    
    // Smooth Scrolling 
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{anchor.addEventListener('click', function(e){e.preventDefault();const target=document.querySelector(this.getAttribute('href'));if(target){target.scrollIntoView({behavior:'smooth',block:'start', block: (this.getAttribute('href') === '#hero-content' ? 'start' : 'center')});}
    });});

    // Fade-in Animation
    const observerOptions={threshold:0.1,rootMargin:'0px 0px -50px 0px'};
    const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');}});},observerOptions);
    document.querySelectorAll('.fade-in').forEach(el=>{observer.observe(el);});

    // Drill-Down Menu Toggle Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.getElementById('drill-down-menu');
    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('open');
    });
    sideMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                sideMenu.classList.remove('open');
            }, 300); 
        });
    });

    // Script for Read More / Read Less functionality
    document.querySelectorAll('.read-more-content').forEach(content => {
        content.style.display = 'none';
        content.style.transition = 'opacity 0.5s ease'; 
        content.style.opacity = '0'; 
    });
    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);

            if (content.style.display === 'none') {
                content.style.display = 'inline'; 
                setTimeout(() => {
                    content.style.opacity = '1';
                }, 10); 
                this.textContent = 'Read Less';
            } else {
                content.style.opacity = '0';
                setTimeout(() => {
                    content.style.display = 'none';
                }, 500); 
                this.textContent = 'Read More';
            }
        });
    });

    // Quotes Display Logic 
    const dataQuotes = [
        "Data is the new oil.",
        "Without big data analytics, companies are blind and deaf, wandering out onto the web like deer on a freeway.",
        "The goal is to turn data into information, and information into insight.",
        "We are drowning in information and starving for wisdom.",
        "The world is now driven by data, not by oil.",
        "Where there is data, there is value.",
        "Hiding within those mounds of data is knowledge that could change the world.",
        "Torture the data, and it will confess to anything.",
        "You can have all the data in the world, but if you don't use it, it means nothing.",
        "The data stream is huge, and its potential is even bigger."
    ];
    let currentQuoteIndex = 0;
    const quoteTextElement = document.getElementById('data-quote-display');

    if (quoteTextElement) {
        quoteTextElement.textContent = dataQuotes[currentQuoteIndex];
        quoteTextElement.classList.add('active');
        setInterval(() => {
            quoteTextElement.classList.remove('active');
            setTimeout(() => {
                currentQuoteIndex = (currentQuoteIndex + 1) % dataQuotes.length;
                quoteTextElement.textContent = dataQuotes[currentQuoteIndex];
                quoteTextElement.classList.add('active');
            }, 1000); 
        }, 5000); 
    }
    
    // ==============================================
    // 1. Dot Grid Background Effect (Canvas)
    // ==============================================
    function setupDotGrid() {
        const container = document.getElementById('dot-grid-container');
        if (!container) return;

        const canvas = document.createElement('canvas');
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let width, height;
        let mouse = { x: 0, y: 0 };
        const config = {
            dotSize: 1.5,
            gap: 50,
            color: 'rgba(132, 0, 255, 0.4)', 
            activeColor: 'rgba(255, 255, 255, 1)',
            proximity: 100,
            maxScale: 1.5,
            throttle: 80 
        };

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            drawGrid();
        }

        function drawGrid() {
            ctx.clearRect(0, 0, width, height);
            
            for (let x = 0; x < width; x += config.gap) {
                for (let y = 0; y < height; y += config.gap) {
                    let dotX = x + (config.gap / 2);
                    let dotY = y + (config.gap / 2);
                    
                    const dx = dotX - mouse.x;
                    const dy = dotY - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    let scale = 1;
                    let opacity = 0.4;

                    if (distance < config.proximity) {
                        const influence = 1 - (distance / config.proximity);
                        scale = 1 + influence * (config.maxScale - 1);
                        opacity = 0.4 + influence * 0.6; 
                    }
                    
                    ctx.beginPath();
                    ctx.arc(dotX, dotY, config.dotSize * scale, 0, Math.PI * 2);
                    
                    ctx.fillStyle = (distance < config.proximity) ? config.activeColor : config.color;
                    ctx.globalAlpha = opacity;
                    ctx.fill();
                }
            }
        }
        
        let lastUpdateTime = 0;
        function handleMouseMove(e) {
            const now = performance.now();
            if (now - lastUpdateTime > config.throttle) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                requestAnimationFrame(drawGrid);
                lastUpdateTime = now;
            }
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        resizeCanvas(); 
    }
    
    // ==============================================
    // 2. Dock Magnification Effect (أيقونات التواصل)
    // ==============================================
    function setupDockMagnification() {
        const dock = document.querySelector('.social-links.dock-container');
        if (!dock) return;

        const items = gsap.utils.toArray(dock.querySelectorAll('.dock-item'));

        dock.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return; 

            items.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.left + itemRect.width / 2;
                const distance = Math.abs(e.clientX - itemCenter);
                
                const maxDistance = 150; 
                let scale = 1;

                if (distance < maxDistance) {
                    const influence = 1 - (distance / maxDistance);
                    scale = 1 + influence * 0.8; 
                }
                
                gsap.to(item, { scale: scale, duration: 0.15, ease: 'power2.out' });
            });
        });

        dock.addEventListener('mouseleave', () => {
            gsap.to(items, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
        });
    }

    // ==============================================
    // 3. Progressive Form (نموذج التواصل)
    // ==============================================
    function setupProgressiveForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const originalGroups = Array.from(form.querySelectorAll('.form-group'));
        const formContent = document.createElement('div');
        formContent.id = 'form-steps-container';
        form.prepend(formContent); 

        let stepsElements = [];

        originalGroups.forEach((group, index) => {
            group.classList.add('form-step');
            group.setAttribute('data-step', index + 1);
            formContent.appendChild(group);
            stepsElements.push(group);

            const inputField = group.querySelector('input, textarea');
            
            if (index < originalGroups.length - 1) {
                const nextButton = document.createElement('button');
                nextButton.type = 'button';
                nextButton.className = 'next-step-btn submit-btn';
                nextButton.textContent = 'Next';
                group.appendChild(nextButton);
                
                nextButton.addEventListener('click', () => handleNextStep(index + 1, inputField));
            }
            
            gsap.set(group, { opacity: 0, maxHeight: 0, y: 20 });
        });

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'submit-btn';
        submitButton.textContent = 'Send Message';
        if (stepsElements.length > 0) {
            stepsElements[stepsElements.length - 1].appendChild(submitButton);
        }

        const firstStep = formContent.querySelector('[data-step="1"]');
        if (firstStep) {
            firstStep.classList.add('active');
            gsap.to(firstStep, { opacity: 1, maxHeight: 500, y: 0, duration: 0.5, ease: 'power2.out' });
            firstStep.querySelector('input').focus();
        }

        function handleNextStep(currentStepId, inputField) {
            if (!inputField.value.trim() || (inputField.type === 'email' && !inputField.value.includes('@'))) {
                gsap.fromTo(inputField, { x: -5 }, { x: 5, repeat: 3, yoyo: true, clearProps: "x", duration: 0.05 });
                return;
            }

            const currentStepEl = formContent.querySelector(`[data-step="${currentStepId}"]`);
            const nextStepEl = formContent.querySelector(`[data-step="${currentStepId + 1}"]`);

            if (nextStepEl) {
                gsap.to(currentStepEl, {
                    opacity: 0,
                    maxHeight: 0,
                    y: -20,
                    duration: 0.3,
                    onComplete: () => {
                        currentStepEl.classList.remove('active');
                        nextStepEl.classList.add('active'); 
                        gsap.fromTo(nextStepEl, 
                            { opacity: 0, y: 20 }, 
                            { opacity: 1, y: 0, maxHeight: 500, duration: 0.5, ease: 'power2.out',
                              onComplete: () => {
                                  nextStepEl.querySelector('input, textarea').focus();
                              }
                            }
                        );
                    }
                });
            }
        }
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); 
            const messageField = form.querySelector('textarea#message');
            if (!messageField.value.trim()) {
                gsap.fromTo(messageField, { x: -5 }, { x: 5, repeat: 3, yoyo: true, clearProps: "x", duration: 0.05 });
                return;
            }

            const data = new FormData(form);
            const formStatus = document.getElementById('form-status');
            
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {'Accept': 'application/json'}
                });

                if (response.ok) {
                    formStatus.style.display = 'block';
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    
                    gsap.to(stepsElements[stepsElements.length - 1], { opacity: 0, maxHeight: 0, y: -20, duration: 0.3 });
                    
                    setTimeout(() => {
                        form.reset(); 
                        gsap.fromTo(stepsElements[0], { opacity: 0, y: 20 }, { opacity: 1, y: 0, maxHeight: 500, duration: 0.5 });
                        stepsElements.forEach(el => el.classList.remove('active'));
                        stepsElements[0].classList.add('active');
                        
                        setTimeout(() => {formStatus.style.display = 'none';}, 4000); 
                    }, 400);

                } else {
                    formStatus.style.display = 'block';
                    formStatus.style.backgroundColor = 'red';
                    formStatus.textContent = 'Oops! There was an error sending your message.';
                    setTimeout(() => {formStatus.style.display = 'none'; formStatus.style.backgroundColor = '#50E3C2';}, 4000);
                }
            } catch (error) {
                formStatus.style.display = 'block';
                formStatus.style.backgroundColor = 'red';
                formStatus.textContent = 'Network error. Please try again later.';
                setTimeout(() => {formStatus.style.display = 'none'; formStatus.style.backgroundColor = '#50E3C2';}, 4000);
            }
        });
    }
    
    // ==============================================
    // 4. Magic Bento Grid (تفاعلات البطاقات)
    // ==============================================
    function setupBentoGridInteractions() {
        const cards = gsap.utils.toArray('.magic-bento-card');

        cards.forEach(card => {
            const isLargeScreen = window.innerWidth >= 1024;

            card.addEventListener('mousemove', (e) => {
                if (!isLargeScreen) return; 
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5; 
                const rotateY = ((x - centerX) / centerX) * 5;  
                const magnetX = (x - centerX) * 0.05; 
                const magnetY = (y - centerY) * 0.05;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    x: magnetX,
                    y: magnetY,
                    duration: 0.1,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });

                const relativeX = ((x) / rect.width) * 100;
                const relativeY = ((y) / rect.height) * 100;
                card.style.setProperty('--glow-x', `${relativeX}%`);
                card.style.setProperty('--glow-y', `${relativeY}%`);
            });

            card.addEventListener('mouseenter', () => {
                 if (isLargeScreen) {
                    gsap.to(card, { '--glow-intensity': 1, duration: 0.5 });
                    const afterElement = card.querySelector('.magic-bento-card--border-glow');
                    if(afterElement) gsap.to(afterElement, { opacity: 1, duration: 0.3 });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    x: 0,
                    y: 0,
                    '--glow-intensity': 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
                if (isLargeScreen) {
                    const afterElement = card.querySelector('.magic-bento-card--border-glow');
                    if(afterElement) gsap.to(afterElement, { opacity: 0, duration: 0.3 });
                }
            });

            card.addEventListener('click', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const maxDistance = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));
                const glowColor = '132, 0, 255'; 

                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    width: ${maxDistance * 2}px;
                    height: ${maxDistance * 2}px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                    left: ${x - maxDistance}px;
                    top: ${y - maxDistance}px;
                    pointer-events: none;
                    z-index: 1000;
                `;

                card.appendChild(ripple);

                gsap.fromTo(
                    ripple,
                    { scale: 0, opacity: 1 },
                    { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() }
                );
            });
        });
    }
    
    // ==============================================
    // 5. & 6. Placeholders for Carousel & Card Nav
    // ==============================================
    console.log("3D Carousel and Card Nav placeholders ready. Further HTML/JS required for full implementation.");

    // ==============================================
    // Initialization
    // ==============================================
    setupDotGrid(); 
    setupDockMagnification();
    setupProgressiveForm();
    setupBentoGridInteractions();
});
