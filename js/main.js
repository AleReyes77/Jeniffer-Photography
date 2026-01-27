// ===== SISTEMA DE CARGA =====
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// ===== MENÚ HAMBURGUESA =====
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== CAMBIO DE TEMA =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const body = document.body;
    
    // Verificar preferencia del usuario
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle en el navbar
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Toggle en el botón flotante
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ===== EFECTO DE SCROLL EN EL NAVBAR =====
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== ANIMACIONES DE SCROLL =====
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Ejecutar una vez al cargar
    handleScrollAnimation();
}

// ===== SISTEMA DE NAVEGACIÓN HOLOGRÁFICA =====
function initHologramNav() {
    const dots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetSection = dot.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Actualizar navegación al hacer scroll
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100 && 
                window.scrollY < sectionTop + sectionHeight - 100) {
                currentSection = section.id;
            }
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === currentSection) {
                dot.classList.add('active');
            }
        });
    });
}

// ===== SISTEMA DE MODAL HOLOGRÁFICO MEJORADO =====
function initHologramModal() {
    const modal = document.getElementById('hologramModal');
    const closeBtn = document.getElementById('modalClose');
    const quantumBtn = document.getElementById('enterQuantum');
    const hologramBtn = document.getElementById('activateHologram');
    const modalBody = modal.querySelector('.modal-body');

    quantumBtn.addEventListener('click', () => {
        // Cargar contenido del portafolio en el modal
        modalBody.innerHTML = `
            <div class="modal-header">
                <h3 style="color: var(--text-light); font-size: 2rem; margin-bottom: 20px;">Portafolio Completo</h3>
            </div>
            <div class="modal-gallery">
                <div class="modal-portfolio-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
                    <div class="modal-portfolio-item">
                        <img src="images/Retrato.jpeg" 
                             alt="Retrato" style="width: 100%; border-radius: 10px;">
                        <h4 style="color: var(--text-light); margin-top: 10px;">Retrato</h4>
                    </div>
                    <div class="modal-portfolio-item">
                        <img src="images/Cumpleaños.jpeg" 
                             alt="Cumpleaños" style="width: 100%; border-radius: 10px;">
                        <h4 style="color: var(--text-light); margin-top: 10px;">Cumpleaños</h4>
                    </div>
                    <div class="modal-portfolio-item">
                        <img src="images/Paisaje.jpeg" 
                             alt="Paisaje" style="width: 100%; border-radius: 10px;">
                        <h4 style="color: var(--text-light); margin-top: 10px;">Paisaje</h4>
                    </div>
                    <div class="modal-portfolio-item">
                        <img src="images/Portafolio 1.jpeg" 
                             alt="Portafolio 1" style="width: 100%; border-radius: 10px;">
                        <h4 style="color: var(--text-light); margin-top: 10px;">Portafolio 1</h4>
                    </div>
                    <div class="modal-portfolio-item">
                        <img src="images/Portafolio2.jpeg" 
                             alt="Portafolio2" style="width: 100%; border-radius: 10px;">
                        <h4 style="color: var(--text-light); margin-top: 10px;">Portafolio 2</h4>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="margin-top: 30px; text-align: center;">
                <button class="btn" id="closeModalBtn" style="padding: 10px 30px;">Cerrar</button>
            </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Añadir funcionalidad al botón de cerrar dentro del modal
        document.getElementById('closeModalBtn').addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    hologramBtn.addEventListener('click', () => {
        // Cargar contenido de servicios en el modal
        modalBody.innerHTML = `
            <div class="modal-header">
                <h3 style="color: var(--text-light); font-size: 2rem; margin-bottom: 20px;">Servicios Disponibles</h3>
            </div>
            <div class="modal-services" style="color: var(--text-light);">
                <ul style="list-style: none; padding: 20px;">
                    <li style="margin-bottom: 15px; font-size: 1.2rem;">
                        <i class="fas fa-camera" style="color: var(--neon-color); margin-right: 10px;"></i>
                        Fotografía Profesional
                    </li>
                    <li style="margin-bottom: 15px; font-size: 1.2rem;">
                        <i class="fas fa-vr-cardboard" style="color: var(--neon-color); margin-right: 10px;"></i>
                        Realidad Aumentada
                    </li>
                    <li style="margin-bottom: 15px; font-size: 1.2rem;">
                        <i class="fas fa-brain" style="color: var(--neon-color); margin-right: 10px;"></i>
                        IA Creativa
                    </li>
                    <li style="margin-bottom: 15px; font-size: 1.2rem;">
                        <i class="fas fa-paint-brush" style="color: var(--neon-color); margin-right: 10px;"></i>
                        Diseño Gráfico
                    </li>
                </ul>
            </div>
            <div class="modal-footer" style="margin-top: 30px; text-align: center;">
                <button class="btn" id="closeModalBtn" style="padding: 10px 30px;">Cerrar</button>
            </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Añadir funcionalidad al botón de cerrar dentro del modal
        document.getElementById('closeModalBtn').addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== SISTEMA DE FAQ INTERACTIVO =====
function initFAQSystem() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar otros items abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar el item actual
            item.classList.toggle('active');
        });
    });
}

// ===== SISTEMA DE FORMULARIO DE CONTACTO =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simular envío exitoso
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = '¡Mensaje Enviado!';
                submitBtn.style.background = 'linear-gradient(135deg, #00cc00, #00ff00)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// ===== SISTEMA DE LAZY LOADING =====
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy-load');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== SISTEMA DE OPTIMIZACIÓN DE RENDIMIENTO =====
function initPerformanceOptimizations() {
    // Debounce para eventos de scroll y resize
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Aplicar debounce a eventos pesados
    const optimizedScrollHandler = debounce(() => {
        // Código que se ejecuta en scroll
    }, 10);
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // Precargar recursos críticos
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Exo+2:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.includes('.css') ? 'style' : 'font';
        document.head.appendChild(link);
    });
}

// ===== SISTEMA DE ANÁLISIS Y MÉTRICAS =====
function initAnalytics() {
    // Simular el envío de datos de analytics
    const trackEvent = (category, action, label) => {
        console.log('Analytics Event:', { category, action, label, timestamp: new Date().toISOString() });
        
        // En un entorno real, aquí se enviarían los datos a Google Analytics o similar
        // gtag('event', action, {
        //   'event_category': category,
        //   'event_label': label
        // });
    };
    
    // Track page views
    trackEvent('Page', 'View', window.location.pathname);
    
    // Track clicks en botones importantes
    document.querySelectorAll('.btn, .ar-btn, .social-link').forEach(button => {
        button.addEventListener('click', (e) => {
            const text = e.target.textContent || e.target.innerText;
            trackEvent('Button', 'Click', text);
        });
    });
    
    // Track formularios
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            trackEvent('Form', 'Submit', form.id || 'unknown-form');
        });
    });
}

// ===== SISTEMA DE NOTIFICACIONES =====
function initNotificationSystem() {
    // Sistema de notificaciones toast
    const showNotification = (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Estilos para las notificaciones
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-bg-dark);
            color: var(--text-light);
            padding: 15px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-heavy);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-left: 4px solid ${type === 'success' ? '#00cc00' : type === 'error' ? '#ff3333' : '#8A2BE2'};
        `;
        
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Cerrar notificación
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Auto cerrar después de 5 segundos
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    };
    
    // Ejemplo de uso
    // showNotification('¡Bienvenido a Jeniffer Photography!', 'success');
}

// ===== SISTEMA DE GESTIÓN DE ESTADO =====
function initStateManagement() {
    // Sistema simple de estado para la aplicación
    const state = {
        theme: localStorage.getItem('theme') || 'dark',
        currentSection: 'home',
        modalOpen: false,
        animationsEnabled: true
    };
    
    // Actualizar estado
    const setState = (newState) => {
        Object.assign(state, newState);
        // Disparar eventos de cambio de estado si es necesario
        window.dispatchEvent(new CustomEvent('stateChange', { detail: state }));
    };
    
    // Obtener estado
    const getState = () => ({ ...state });
    
    // Hacer disponible globalmente
    window.appState = {
        setState,
        getState
    };
}

// ===== INICIALIZACIÓN DE TODOS LOS SISTEMAS =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar animaciones
    initQuantumParticles();
    initQuantumCarousel();
    initNeuralNetwork();
    initARExperience();
    initGlitchEffects();
    initFloatingPhysics();
    initAudioVisualizer();
    initAnimatedCounters();
    initTestimonialSlider();
    
    // Inicializar funcionalidades principales
    initHologramNav();
    initHologramModal();
    initHamburgerMenu();
    initThemeToggle();
    initNavbarScroll();
    initScrollAnimations();
    initFAQSystem();
    initContactForm();
    initLazyLoading();
    initPerformanceOptimizations();
    initAnalytics();
    initNotificationSystem();
    initStateManagement();
    
    // Efectos GSAP avanzados
    gsap.registerPlugin(ScrollTrigger);
    
    // Animaciones de entrada para secciones
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 100,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Animación de entrada para el hero
    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5
    });
    
    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8
    });
    
    gsap.from('.hero-buttons', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.1
    });
});

// ===== OPTIMIZACIONES ADICIONALES =====
// Prevenir layout shifts
window.addEventListener('load', () => {
    // Establecer alturas mínimas para elementos críticos
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.minHeight = `${window.innerHeight}px`;
    }
});

// Optimizar para móviles
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.classList.add('mobile-device');
    
    // Reducir animaciones en móviles para mejor rendimiento
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .quantum-particles { display: none; }
            .floating-image { animation-duration: 8s !important; }
            .hologram-card:hover { transform: none; }
        }
    `;
    document.head.appendChild(style);
}

// ===== SISTEMA OFFLINE =====
// Registrar Service Worker para funcionalidad offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== GESTIÓN DE ERRORES =====
window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.error);
    // En un entorno real, aquí se enviaría el error a un servicio de monitoreo
});

// ===== COMPRESIÓN DE DATOS =====
// Función para comprimir datos antes de enviarlos
const compressData = (data) => {
    // En un entorno real, aquí se usaría una librería de compresión
    return JSON.stringify(data);
};

// ===== CACHÉ INTELIGENTE =====
const smartCache = {
    set: (key, value, ttl = 300000) => { // 5 minutos por defecto
        const item = {
            value: value,
            expiry: Date.now() + ttl
        };
        localStorage.setItem(key, JSON.stringify(item));
    },
    get: (key) => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;
        
        const item = JSON.parse(itemStr);
        if (Date.now() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        
        return item.value;
    },
    remove: (key) => {
        localStorage.removeItem(key);
    }
};

// ===== SISTEMA DE INTERNACIONALIZACIÓN =====
const i18n = {
    currentLang: 'es',
    translations: {
        es: {
            welcome: "Bienvenido a Jeniffer Photography",
            explore: "Explorar Portafolio",
            // ... más traducciones
        },
        en: {
            welcome: "Welcome to Jeniffer Photography",
            explore: "Explore Portfolio",
            // ... más traducciones
        }
    },
    t(key) {
        return this.translations[this.currentLang][key] || key;
    },
    setLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.lang = lang;
        // Disparar evento para que los componentes se actualicen
        window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
    }
};

// Hacer disponible globalmente
window.i18n = i18n;