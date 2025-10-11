// ========== ANIMACIONES CON ANIMATE.CSS ==========

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el navegador soporta IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        // Si no soporta, mostrar todos los elementos inmediatamente
        const animateElements = document.querySelectorAll('[class*="animate__"]');
        animateElements.forEach(function(element) {
            element.style.opacity = '1';
        });
        return;
    }

    // Crear observer para animaciones de scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Restaurar la opacidad
                element.style.opacity = '1';
                
                // Obtener las clases de animación guardadas
                const animationClasses = element.dataset.animation;
                if (animationClasses) {
                    // Agregar las clases de animación
                    const classes = animationClasses.split(' ');
                    classes.forEach(function(cls) {
                        element.classList.add(cls);
                    });
                }
                
                // Para números, agregar efecto contador
                if (element.classList.contains('number-counter')) {
                    animateNumber(element);
                }
                
                // Dejar de observar el elemento una vez animado
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Preparar elementos para animación en scroll
    const animateElements = document.querySelectorAll('[class*="animate__"]');
    animateElements.forEach(function(element) {
        // Extraer clases de animación
        const classList = Array.from(element.classList);
        const animationClasses = classList.filter(function(cls) {
            return cls.startsWith('animate__');
        });
        
        // Guardar las clases de animación en data attribute
        element.dataset.animation = animationClasses.join(' ');
        
        // Verificar si está en el header/hero
        const isInHero = element.closest('.hero') || element.closest('header');
        
        if (isInHero) {
            // Para elementos del header, mantener las animaciones pero asegurar que sean visibles
            element.style.opacity = '1';
            // No remover las clases de animación para que se ejecuten al cargar
        } else {
            // Para otros elementos, aplicar lógica de scroll
            // Remover las clases de animación temporalmente
            animationClasses.forEach(function(cls) {
                element.classList.remove(cls);
            });
            
            // Ocultar inicialmente (excepto elementos que están ya visibles)
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
            
            if (!isVisible) {
                element.style.opacity = '0';
                element.style.transition = 'opacity 0.3s ease-in-out';
                observer.observe(element);
            } else {
                // Si ya está visible, activar animación inmediatamente
                const classes = element.dataset.animation.split(' ');
                classes.forEach(function(cls) {
                    element.classList.add(cls);
                });
            }
        }
    });
});

// Función para animar números/estadísticas
function animateNumber(element) {
    const text = element.textContent;
    const number = text.match(/\d+/);
    
    if (number) {
        const finalNumber = parseInt(number[0]);
        const prefix = text.substring(0, text.indexOf(number[0]));
        const suffix = text.substring(text.indexOf(number[0]) + number[0].length);
        
        let currentNumber = 0;
        const increment = finalNumber / 50; // Dividir en 50 pasos
        const timer = setInterval(function() {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            element.textContent = prefix + Math.floor(currentNumber) + suffix;
        }, 30);
    }
}

// Agregar smooth scroll para navegación
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para enlaces internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
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
});