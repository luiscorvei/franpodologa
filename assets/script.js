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

// Função para verificar se um elemento está visível na viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    // Ajustamos o threshold para que elementos sejam ativados mais cedo
    const threshold = window.innerWidth <= 768 ? 0.9 : 0.8;
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * threshold && 
      rect.bottom >= 0
    );
  }
  
  // Função para detectar se o dispositivo é móvel
  function isMobileDevice() {
    return window.innerWidth <= 768;
  }
  
  // Função para animar os cards de serviço
  function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesSection = document.querySelector('.services');
    const isMobile = isMobileDevice();
    
    // Tempos de animação ajustados para serem mais lentos
    const delay = isMobile ? 0.3 : 0.4; // Delay maior para animação mais lenta
    const duration = isMobile ? 0.8 : 1.0; // Duração mais longa para animação mais lenta
    
    // Se a seção de serviços estiver visível na tela
    if (servicesSection && isElementInViewport(servicesSection)) {
      // Adicione estilos iniciais aos cards se ainda não foram adicionados
      serviceCards.forEach((card, index) => {
        if (!card.classList.contains('animated')) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(40px)'; // Valor maior para movimento mais visível
          card.style.transition = `opacity ${duration}s ease-out ${index * delay}s, transform ${duration}s ease-out ${index * delay}s`;
          card.classList.add('animated');
        }
      });
      
      // Pequeno atraso para garantir que os estilos foram aplicados antes da animação
      setTimeout(() => {
        serviceCards.forEach(card => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      }, 100);
    }
  }
  
  // Função amplamente aprimorada para animar a seção "Why Choose Us"
  function animateWhyChooseUs() {
    const whyChooseUsSection = document.querySelector('.why-choose-us');
    if (!whyChooseUsSection) return;
    
    // Animar o título da seção primeiro
    const sectionTitle = whyChooseUsSection.querySelector('h2') || whyChooseUsSection.querySelector('h1');
    if (sectionTitle && isElementInViewport(sectionTitle) && !sectionTitle.classList.contains('animated')) {
      sectionTitle.style.opacity = '0';
      sectionTitle.style.transform = 'translateY(30px)';
      sectionTitle.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';
      sectionTitle.classList.add('animated');
      
      setTimeout(() => {
        sectionTitle.style.opacity = '1';
        sectionTitle.style.transform = 'translateY(0)';
      }, 100);
    }
    
    // Animar cada card na grade left com um efeito sequencial mais lento
    const whyChooseUsCards = whyChooseUsSection.querySelectorAll('.left .card');
    const isMobile = isMobileDevice();
    
    if (isElementInViewport(whyChooseUsSection)) {
      const cardDelay = isMobile ? 0.4 : 0.5; // Delay aumentado entre cards
      const cardDuration = isMobile ? 0.9 : 1.2; // Duração mais longa
      
      whyChooseUsCards.forEach((card, index) => {
        if (!card.classList.contains('animated')) {
          // Definir estado inicial
          card.style.opacity = '0';
          card.style.transform = 'translateY(50px)'; // Movimento vertical maior
          card.style.transition = `opacity ${cardDuration}s ease-out ${index * cardDelay}s, transform ${cardDuration}s ease-out ${index * cardDelay}s`;
          card.classList.add('animated');
        }
      });
      
      // Iniciar animação após pequeno delay
      setTimeout(() => {
        whyChooseUsCards.forEach(card => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      }, 200);
      
      // Animar a imagem do lado direito com um efeito especial após os cards
      const rightImage = whyChooseUsSection.querySelector('.right img');
      if (rightImage && !rightImage.classList.contains('animated')) {
        const totalCardsDelay = whyChooseUsCards.length * cardDelay;
        
        rightImage.style.opacity = '0';
        rightImage.style.transform = 'scale(0.9)';
        rightImage.style.transition = `opacity 1.2s ease-out ${totalCardsDelay}s, transform 1.2s ease-out ${totalCardsDelay}s`;
        rightImage.classList.add('animated');
        
        setTimeout(() => {
          rightImage.style.opacity = '1';
          rightImage.style.transform = 'scale(1)';
        }, 200);
      }
    }
  }
  
  // Função para animar outras seções com efeitos mais lentos
  function animateOtherSections() {
    // Animar a seção de "Antes/Depois" com efeito mais lento
    const beforeAfterCards = document.querySelectorAll('.before-after-card');
    const beforeAfterSection = document.querySelector('.before-after-section');
    
    if (beforeAfterSection && isElementInViewport(beforeAfterSection)) {
      const isMobile = isMobileDevice();
      const staggerDelay = isMobile ? 0.35 : 0.45; // Delay aumentado
      const animDuration = isMobile ? 0.8 : 1.0; // Duração aumentada
      
      // Animar título da seção primeiro
      const sectionTitle = beforeAfterSection.querySelector('h2');
      if (sectionTitle && !sectionTitle.classList.contains('animated')) {
        sectionTitle.style.opacity = '0';
        sectionTitle.style.transform = 'translateY(30px)';
        sectionTitle.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';
        sectionTitle.classList.add('animated');
        
        setTimeout(() => {
          sectionTitle.style.opacity = '1';
          sectionTitle.style.transform = 'translateY(0)';
        }, 100);
      }
      
      beforeAfterCards.forEach((card, index) => {
        if (!card.classList.contains('animated')) {
          // Para mobile, usamos um efeito de fade simples mas mais lento
          if (isMobile) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity ${animDuration}s ease-out ${index * staggerDelay}s, transform ${animDuration}s ease-out ${index * staggerDelay}s`;
          } else {
            // Para desktop, usamos efeitos mais elaborados e mais lentos
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = `opacity ${animDuration}s ease-out ${index * staggerDelay}s, transform ${animDuration}s ease-out ${index * staggerDelay}s`;
          }
          card.classList.add('animated');
        }
      });
      
      setTimeout(() => {
        beforeAfterCards.forEach(card => {
          card.style.opacity = '1';
          card.style.transform = isMobile ? 'translateY(0)' : 'translateY(0)';
        });
      }, 150);
    }
  }
  
  // Adicione CSS para os cards com comportamento responsivo e para seção "Why Choose Us"
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      /* Estilos iniciais para os elementos animados */
      .service-card, .before-after-card, .why-choose-us .card, .why-choose-us .right img {
        will-change: opacity, transform;
      }
      
      /* Transições mais lentas para hover effects */
      .service-card, .before-after-card, .why-choose-us .card {
        transition: transform 0.6s ease-out, box-shadow 0.6s ease-out !important;
      }
      
      /* Efeito especial para o card ativo na seção Why Choose Us */
      .why-choose-us .card.active {
        transition: all 0.8s ease-out !important;
      }
      
      /* Animações para títulos das seções */
      .services-header h1, .why-choose-us h2, .why-choose-us h1, .before-after-section h2 {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1.2s ease-out, transform 1.2s ease-out;
      }
      
      .services-header h1.animated, .why-choose-us h2.animated, .why-choose-us h1.animated, .before-after-section h2.animated {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Otimizações para dispositivos móveis */
      @media (max-width: 768px) {
        .service-card:hover, .before-after-card:hover, .why-choose-us .card:hover {
          transform: translateY(-5px) !important;
        }
        
        /* Reduz a intensidade das sombras em dispositivos móveis para melhor desempenho */
        .service-card:hover, .before-after-card:hover, .why-choose-us .card:hover,
        .learn-more-btn:hover, .appointment-btn:hover {
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
        }
      }
      
      /* Adiciona suporte a navegadores que não suportam JS ou têm JS desabilitado */
      @media (prefers-reduced-motion: reduce) {
        .service-card, .before-after-card, .why-choose-us .card, .why-choose-us .right img,
        .services-header h1, .why-choose-us h2, .why-choose-us h1, .before-after-section h2 {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
      }
    </style>
  `);
  
  // Adiciona animação para o título da seção de serviços
  function animateServiceHeader() {
    const header = document.querySelector('.services-header h1');
    if (header && isElementInViewport(header) && !header.classList.contains('animated')) {
      // Adicionamos a classe para animar
      setTimeout(() => {
        header.classList.add('animated');
      }, 200);
    }
  }
  
  // Função para melhorar o desempenho do scroll throttling (limitação)
  function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return func(...args);
    };
  }
  
  // Função para verificar quando a página é rolada (otimizada)
  const handleScroll = throttle(function() {
    requestAnimationFrame(function() {
      animateServiceHeader();
      animateServiceCards();
      animateWhyChooseUs(); // Função específica para Why Choose Us
      animateOtherSections();
    });
  }, 150); // Aumentamos um pouco o tempo entre verificações
  
  // Adicionar listener de scroll otimizado
  window.addEventListener('scroll', handleScroll);
  
  // Verificar também quando a orientação do dispositivo muda
  window.addEventListener('orientationchange', function() {
    setTimeout(handleScroll, 400); // Pequeno atraso após mudança de orientação
  });
  
  // Verificar no carregamento inicial da página
  document.addEventListener('DOMContentLoaded', function() {
    // Executar a verificação após um pequeno atraso para garantir que a página está totalmente carregada
    setTimeout(handleScroll, 500);
    
    // Adicionar classe especial ao body em dispositivos móveis para outras otimizações de CSS
    if (isMobileDevice()) {
      document.body.classList.add('mobile-device');
    }
  });
  
  // Recalcular quando o tamanho da janela muda (resize)
  window.addEventListener('resize', throttle(function() {
    const wasMobile = document.body.classList.contains('mobile-device');
    const isMobile = isMobileDevice();
    
    // Atualizar classe mobile apenas se o estado mudou
    if (wasMobile !== isMobile) {
      if (isMobile) {
        document.body.classList.add('mobile-device');
      } else {
        document.body.classList.remove('mobile-device');
      }
      // Forçar recálculo das animações
      handleScroll();
    }
  }, 250));
