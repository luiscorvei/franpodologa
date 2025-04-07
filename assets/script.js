function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
// Adicionar loader na página
const loader = document.createElement('div');
loader.className = 'page-loader';
loader.innerHTML = '<div class="loader"></div>';
document.body.appendChild(loader);

// Remover loader após a página carregar
window.addEventListener('load', function() {
    setTimeout(function() {
        loader.classList.add('loaded');
        // Remover o loader do DOM após a animação
        setTimeout(function() {
            loader.remove();
        }, 500);
    }, 800); // Tempo mínimo para mostrar o loader
});

// Aplicar classe active aos elementos quando eles entram na viewport
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Para elementos que contêm múltiplos itens animados
            if (entry.target.classList.contains('stats-section')) {
                const stats = entry.target.querySelectorAll('.stat h3');
                stats.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.classList.add('active');
                    }, index * 200);
                });
            }
            
            // Para cards em uma seção
            if (entry.target.classList.contains('services') || 
                entry.target.classList.contains('before-after-container')) {
                const cards = entry.target.querySelectorAll('.service-card, .before-after-card');
                cards.forEach(card => {
                    card.classList.add('active');
                });
            }
            
            // Para não observar mais este elemento após animado
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elementos para observar
const sections = document.querySelectorAll('.stats-section, .content, .why-choose-us, .before-after-section, .services, .before-after-container');
sections.forEach(section => {
    // Adicionar classe inicial para setup da animação
    if (!section.classList.contains('stats-section')) {
        section.classList.add('fade-in');
    }
    
    // Observar o elemento
    observer.observe(section);
});

// Observar cards individualmente
const cards = document.querySelectorAll('.service-card, .before-after-card');
cards.forEach(card => {
    observer.observe(card);
});

// Animar números nas estatísticas
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animação de rolagem suave para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Toggle do menu mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}
});

document.addEventListener('DOMContentLoaded', function() {
// Função para verificar se elementos estão visíveis
function checkVisibility() {
    // Seleciona todas as seções importantes que podem estar ocultas
    const sections = document.querySelectorAll('.content, .before-after-section, .why-choose-us, .services-header, .services');
    
    sections.forEach(section => {
        // Verifica se o elemento tem opacidade zero (possivelmente devido às animações)
        const style = window.getComputedStyle(section);
        if (parseFloat(style.opacity) === 0 || section.classList.contains('fade-in')) {
            // Força a visibilidade do elemento
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            section.classList.remove('fade-in');
            section.classList.add('active');
        }
    });
    
    // Verifica todos os cards de serviço e before-after
    const cards = document.querySelectorAll('.service-card, .before-after-card');
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
}

// Executar verificação após um timeout para permitir que a página carregue completamente
setTimeout(checkVisibility, 1000);

// Também verificar após o evento de rolagem
window.addEventListener('scroll', function() {
    setTimeout(checkVisibility, 100);
});

// Corrigir possíveis problemas com o Intersection Observer
const fixedObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.05 // Threshold menor para detectar elementos mais facilmente
};

const fixedObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        // Force visibility for any element that comes into view
        if (entry.target) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.remove('fade-in');
            entry.target.classList.add('active');
            
            // For container elements, make sure all children are visible
            const fadeElements = entry.target.querySelectorAll('.fade-in, [style*="opacity: 0"]');
            fadeElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.classList.remove('fade-in');
                el.classList.add('active');
            });
        }
    });
}, fixedObserverOptions);

// Observar todas as seções e cartões
document.querySelectorAll('.content, .before-after-section, .why-choose-us, .services-header, .services, .service-card, .before-after-card').forEach(section => {
    fixedObserver.observe(section);
});

// Função de último recurso para garantir visibilidade
window.addEventListener('load', function() {
    setTimeout(function() {
        // Força todos os elementos a serem visíveis após 2 segundos do carregamento completo
        document.querySelectorAll('.fade-in, [style*="opacity: 0"]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.classList.remove('fade-in');
            el.classList.add('active');
        });
    }, 2000);
});
});
