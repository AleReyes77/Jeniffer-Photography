// ===== SISTEMA DE PARTÍCULAS CUÁNTICAS =====
function initQuantumParticles() {
    const container = document.getElementById('quantumParticles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 6 + Math.random() * 4;
        
        particle.style.left = `${left}vw`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Tamaño y color aleatorios
        const size = 2 + Math.random() * 4;
        const hue = 270 + Math.random() * 60;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = `hsl(${hue}, 100%, 65%)`;
        particle.style.boxShadow = `0 0 ${size * 2}px hsl(${hue}, 100%, 65%)`;
        
        container.appendChild(particle);
    }
}

// ===== SISTEMA DE CARRUSEL 3D CUÁNTICO =====
function initQuantumCarousel() {
    const carousel = document.getElementById('quantumCarousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const angle = 360 / totalItems;
    const radius = 600; // Radio del carrusel
    
    // Detener animación CSS original
    carousel.style.animation = 'none';
    
    // Variables de control
    let currentRotation = 0;
    const rotationSpeed = 0.4;
    const hoveredItems = new Set();
    
    // 1. POSICIONAR TODAS LAS IMÁGENES EN EL CÍRCULO
    function positionItems() {
        items.forEach((item, index) => {
            // Calcular ángulo para esta imagen
            const itemAngle = angle * index;
            const translateZ = radius;
            
            // Guardar datos para referencia
            item.dataset.baseAngle = itemAngle;
            item.dataset.translateZ = translateZ;
            item.dataset.index = index;
            
            // Aplicar posición inicial
            updateItemPosition(item);
        });
    }
    
    // 2. ACTUALIZAR POSICIÓN DE UNA IMAGEN ESPECÍFICA
    function updateItemPosition(item, hoverY = 0, hoverX = 0) {
        const baseAngle = parseFloat(item.dataset.baseAngle || 0);
        const translateZ = parseFloat(item.dataset.translateZ || radius);
        
        // Calcular rotación final incluyendo la rotación del carrusel
        const finalRotationY = baseAngle + currentRotation + hoverY;
        
        // Aplicar transformación
        item.style.transform = `
            rotateY(${finalRotationY}deg) 
            translateZ(${translateZ}px) 
            rotateX(${hoverX}deg)
        `;
    }
    
    // 3. CONFIGURAR INTERACCIÓN DE HOVER PARA CADA IMAGEN
    items.forEach((item, index) => {
        // Evento mouseenter
        item.addEventListener('mouseenter', (e) => {
            hoveredItems.add(item);
            item.style.zIndex = '1000';
            item.style.transition = 'transform 0.3s ease, z-index 0.3s ease';
        });
        
        // Evento mouseleave
        item.addEventListener('mouseleave', (e) => {
            hoveredItems.delete(item);
            item.style.zIndex = '';
            item.style.transition = 'transform 0.5s ease, z-index 0.3s ease';
        });
        
        // Evento mousemove
        item.addEventListener('mousemove', (e) => {
            if (!hoveredItems.has(item)) return;
            
            const rect = item.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calcular posición relativa del mouse
            const relX = (e.clientX - centerX) / rect.width;
            const relY = (e.clientY - centerY) / rect.height;
            
            // Aplicar rotación de hover (con dirección consistente)
            const hoverRotationY = -relX * 20; // Movimiento horizontal
            const hoverRotationX = relY * 10;  // Movimiento vertical
            
            updateItemPosition(item, hoverRotationY, hoverRotationX);
        });
    });
    
    // 4. ANIMACIÓN PRINCIPAL DEL CARRUSEL
    function animateCarousel() {
        // Solo rotar si no estamos interactuando con todo el carrusel
        if (!isCarruselHovered) {
            currentRotation += rotationSpeed;
            if (currentRotation >= 360) currentRotation -= 360;
        }
        
        // Actualizar todas las imágenes
        items.forEach(item => {
            // Solo actualizar las que no están en hover
            if (!hoveredItems.has(item)) {
                updateItemPosition(item, 0, 0);
            }
        });
        
        requestAnimationFrame(animateCarousel);
    }
    
    // 5. CONTROL DE HOVER PARA TODO EL CARRUSEL
    let isCarruselHovered = false;
    const carruselContainer = carousel.closest('.quantum-carousel');
    
    carruselContainer.addEventListener('mouseenter', () => {
        isCarruselHovered = true;
    });
    
    carruselContainer.addEventListener('mouseleave', () => {
        isCarruselHovered = false;
    });
    
    // 6. INICIALIZAR
    positionItems(); // Posicionar todas las imágenes
    animateCarousel(); // Iniciar animación
    
    // 7. RESPONSIVE - Recalcular al cambiar tamaño de ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            positionItems();
        }, 250);
    });
}

// ===== SISTEMA DE RED NEURAL INTERACTIVA =====
function initNeuralNetwork() {
    const canvas = document.getElementById('neuralCanvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const nodes = [];
    const connections = [];
    
    // Crear nodos
    for (let i = 0; i < 20; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: 2 + Math.random() * 3
        });
    }
    
    // Crear conexiones
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.7) {
                connections.push({ from: i, to: j });
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Actualizar nodos
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Rebote en los bordes
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Dibujar nodo
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${280 + Math.random() * 40}, 100%, 65%, 0.8)`;
            ctx.fill();
        });
        
        // Dibujar conexiones
        connections.forEach(conn => {
            const from = nodes[conn.from];
            const to = nodes[conn.to];
            
            const dx = from.x - to.x;
            const dy = from.y - to.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.strokeStyle = `hsla(280, 100%, 65%, ${0.3 * (1 - distance / 200)})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===== SISTEMA DE REALIDAD AUMENTADA =====
function initARExperience() {
    const canvas = document.getElementById('arCanvas');
    const ctx = canvas.getContext('2d');
    
    let objects = [];
    let effects = [];
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Generar cámaras realistas
    document.getElementById('arSpawn').addEventListener('click', () => {
        for (let i = 0; i < 3; i++) {
            objects.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 60 + Math.random() * 80,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                hue: 220 + Math.random() * 40,
                type: 'camera'
            });
        }
    });
    
    // Limpiar escena
    document.getElementById('arClear').addEventListener('click', () => {
        objects = [];
        effects = [];
    });
    
    // Generar logos de Photoshop
    document.getElementById('arEffect').addEventListener('click', () => {
        for (let i = 0; i < 5; i++) {
            objects.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 40 + Math.random() * 60,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.03,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                hue: 200 + Math.random() * 80,
                type: 'photoshop'
            });
        }
    });
    
    function drawCamera(ctx, x, y, size, rotation, hue) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        // Cuerpo principal de la cámara (más realista)
        ctx.fillStyle = `hsla(${hue}, 70%, 40%, 0.9)`;
        ctx.fillRect(-size/2, -size/4, size, size/2);
        
        // Lente principal
        ctx.beginPath();
        ctx.arc(size/2 - size/10, 0, size/3, 0, Math.PI * 2);
        const lensGradient = ctx.createRadialGradient(size/2 - size/10, 0, 0, size/2 - size/10, 0, size/3);
        lensGradient.addColorStop(0, `hsla(${hue + 30}, 100%, 90%, 0.9)`);
        lensGradient.addColorStop(1, `hsla(${hue}, 80%, 50%, 0.8)`);
        ctx.fillStyle = lensGradient;
        ctx.fill();
        
        // Anillo de la lente
        ctx.strokeStyle = `hsla(${hue}, 60%, 30%, 1)`;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Visor
        ctx.fillStyle = `hsla(${hue}, 40%, 20%, 0.8)`;
        ctx.fillRect(-size/2 + 10, -size/4 + 10, size/4, size/6);
        
        // Flash
        ctx.fillStyle = `hsla(${hue + 60}, 100%, 70%, 0.8)`;
        ctx.fillRect(-size/2 + size/3, -size/4 + 10, size/8, size/10);
        
        // Botones y controles
        ctx.fillStyle = `hsla(${hue}, 30%, 20%, 0.9)`;
        ctx.fillRect(size/2 - 25, -size/4 + 15, 12, 6);
        ctx.fillRect(size/2 - 25, -size/4 + 25, 12, 6);
        ctx.fillRect(size/2 - 25, -size/4 + 35, 12, 6);
        
        // Rueda de control
        ctx.beginPath();
        ctx.arc(-size/2 + size/3, size/4 - 15, size/12, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${hue}, 50%, 30%, 1)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
    }
    
    function drawPhotoshopLogo(ctx, x, y, size, rotation, hue) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        // Fondo del logo
        ctx.fillStyle = `hsla(${hue}, 80%, 50%, 0.9)`;
        ctx.beginPath();
        ctx.moveTo(0, -size/2);
        ctx.lineTo(size/2, 0);
        ctx.lineTo(0, size/2);
        ctx.lineTo(-size/2, 0);
        ctx.closePath();
        ctx.fill();
        
        // Letra "Ps"
        ctx.fillStyle = 'white';
        ctx.font = `bold ${size/3}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Ps', 0, 0);
        
        // Efecto de brillo
        ctx.strokeStyle = `hsla(${hue}, 100%, 70%, 0.6)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar objetos
        objects.forEach(obj => {
            // Actualizar posición
            obj.x += obj.vx;
            obj.y += obj.vy;
            obj.rotation += obj.rotationSpeed;
            
            // Rebote en bordes
            if (obj.x < 0 || obj.x > canvas.width) obj.vx *= -1;
            if (obj.y < 0 || obj.y > canvas.height) obj.vy *= -1;
            
            // Dibujar objeto según su tipo
            if (obj.type === 'camera') {
                drawCamera(ctx, obj.x, obj.y, obj.size, obj.rotation, obj.hue);
            } else if (obj.type === 'photoshop') {
                drawPhotoshopLogo(ctx, obj.x, obj.y, obj.size, obj.rotation, obj.hue);
            }
        });
        
        // Dibujar efectos
        effects.forEach((effect, index) => {
            if (effect.type === 'pulse') {
                effect.radius += effect.speed;
                
                ctx.beginPath();
                ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `hsla(180, 100%, 65%, ${1 - effect.radius / effect.maxRadius})`;
                ctx.lineWidth = 3;
                ctx.stroke();
                
                if (effect.radius > effect.maxRadius) {
                    effects.splice(index, 1);
                }
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===== SISTEMA DE SONIDO VISUAL INTERACTIVO =====
function initAudioVisualizer() {
    const bars = document.querySelectorAll('.visualizer-bar');
    
    function updateVisualizer() {
        bars.forEach((bar, index) => {
            const height = 10 + Math.random() * 40;
            const delay = index * 0.1;
            
            gsap.to(bar, {
                height: `${height}px`,
                duration: 0.3,
                delay: delay,
                ease: 'power2.out'
            });
        });
        
        setTimeout(updateVisualizer, 300);
    }
    
    updateVisualizer();
}

// ===== SISTEMA DE CONTADORES ANIMADOS =====
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        // Iniciar contador cuando sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// ===== TESTIMONIAL SLIDER =====
function initTestimonialSlider() {
    const track = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    
    function goToSlide(slideIndex) {
        track.style.transform = `translateX(-${slideIndex * 100}%)`;
        currentSlide = slideIndex;
        
        // Actualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Auto slide
    setInterval(() => {
        const nextSlide = (currentSlide + 1) % dots.length;
        goToSlide(nextSlide);
    }, 5000);
}

// ===== EFECTO GLITCH MEJORADO =====
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch-effect');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            element.classList.add('glitch-active');
            setTimeout(() => {
                element.classList.remove('glitch-active');
            }, 200);
        }, 3000 + Math.random() * 4000);
    });
}

// ===== SISTEMA DE FÍSICA PARA IMÁGENES FLOTANTES =====
function initFloatingPhysics() {
    const floatingImages = document.querySelectorAll('.floating-image');
    
    floatingImages.forEach((image, index) => {
        // Añadir interacción de arrastre
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        image.addEventListener('mousedown', startDrag);
        image.addEventListener('touchstart', startDrag);
        
        function startDrag(e) {
            isDragging = true;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            startX = clientX;
            startY = clientY;
            
            const rect = image.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            
            image.style.animationPlayState = 'paused';
            image.style.zIndex = '1000';
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;
            
            image.style.left = `${initialX + deltaX}px`;
            image.style.top = `${initialY + deltaY}px`;
        }
        
        function stopDrag() {
            isDragging = false;
            image.style.animationPlayState = 'running';
            image.style.zIndex = '1';
            
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchend', stopDrag);
        }
    });
}