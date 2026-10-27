/* ==========================================================================
   JVS Dedetizadora — JavaScript Corporativo Completo (ES6+)
   Novos Módulos:
   1. Canvas Interativo de Fundo (Partículas e Biossegurança)
   2. Efeito 3D Tilt com Parallax e Iluminação Spotlight nos Cards da Galeria
   3. Central de Atendimento Multicanal & Mini Chat Guiado
   4. Calculadora de Risco, ScrollSpy, FAQ e Animações
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const WHATSAPP_NUMBER = '5544991236675';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. Canvas Tecnológico de Fundo (Partículas Sanitárias em Dispersão)
     ------------------------------------------------------------------------ */
  function initAmbientCanvas() {
    const canvas = $('#ambientCanvas');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Criação de partículas com tons de biossegurança (laranja e ciano)
    const count = Math.min(Math.floor(width / 35), 32);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2,
        color: Math.random() > 0.4 ? 'rgba(255, 107, 53, 0.25)' : 'rgba(16, 185, 129, 0.2)'
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      requestAnimationFrame(render);
    }
    render();
  }

  /* ------------------------------------------------------------------------
     2. Efeito 3D Tilt com Iluminação Spotlight nos Cards da Galeria
     ------------------------------------------------------------------------ */
  function initGallery3DTilt() {
    if (prefersReducedMotion) return;
    const cards = $$('.tilt-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // Inclinação vertical suave
        const rotateY = ((x - centerX) / centerX) * 6;  // Inclinação horizontal suave

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. Central de Suporte Multicanal & Mini Chat Guiado
     ------------------------------------------------------------------------ */
  function initSupportHub() {
    const hubWidget = $('#supportHub');
    const fabTrigger = $('#hubFabTrigger');
    const closeBtn = $('#hubCloseBtn');
    const openTriggers = $$('.open-hub-trigger');
    const chatFeed = $('#chatFeed');
    const questionBtns = $$('.chat-q-btn');

    if (!hubWidget || !fabTrigger) return;

    const toggleHub = (open) => {
      const isOpen = open !== undefined ? open : !hubWidget.classList.contains('is-open');
      hubWidget.classList.toggle('is-open', isOpen);
      fabTrigger.setAttribute('aria-expanded', String(isOpen));
    };

    fabTrigger.addEventListener('click', () => toggleHub());
    if (closeBtn) closeBtn.addEventListener('click', () => toggleHub(false));

    openTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleHub(true);
      });
    });

    // Lógica do Mini Chat com Respostas Imediatas
    questionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const questionText = btn.textContent.trim();
        const answerText = btn.dataset.answer;

        // Adiciona pergunta do usuário
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-msg user-msg';
        userMsg.innerHTML = `<p>${questionText}</p>`;
        chatFeed.appendChild(userMsg);

        // Rola até o fim
        chatFeed.scrollTop = chatFeed.scrollHeight;

        // Resposta do Robô/Marcelo
        setTimeout(() => {
          const botMsg = document.createElement('div');
          botMsg.className = 'chat-msg bot-msg';
          botMsg.innerHTML = `<p>${answerText}</p>`;
          chatFeed.appendChild(botMsg);
          chatFeed.scrollTop = chatFeed.scrollHeight;
        }, 350);
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. Barra de Progresso de Leitura & Cabeçalho Inteligente
     ------------------------------------------------------------------------ */
  function initHeaderAndProgress() {
    const header = $('#site-header');
    const progressBar = $('#scrollProgress');
    const navLinks = $$('.nav-link');
    const sections = $$('section[id], footer[id]');

    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (progressBar && docHeight > 0) {
        progressBar.style.width = `${Math.min((scrollY / docHeight) * 100, 100)}%`;
      }

      if (header) {
        header.classList.toggle('is-scrolled', scrollY > 40);
      }

      let currentId = '';
      sections.forEach(sec => {
        if (scrollY >= sec.offsetTop - 130) {
          currentId = sec.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     5. Menu Mobile (Drawer)
     ------------------------------------------------------------------------ */
  function initMobileMenu() {
    const toggleBtn = $('#menu-toggle');
    const menu = $('#mobile-menu');
    const backdrop = $('#mobile-backdrop');
    const links = $$('.mob-link', menu);

    if (!toggleBtn || !menu) return;

    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', isOpen);
      toggleBtn.classList.toggle('is-open', isOpen);
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      if (backdrop) backdrop.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    toggleBtn.addEventListener('click', () => toggleMenu());
    if (backdrop) backdrop.addEventListener('click', () => toggleMenu(false));
    links.forEach(l => l.addEventListener('click', () => toggleMenu(false)));
  }

  /* ------------------------------------------------------------------------
     6. Texto Digitado no Hero
     ------------------------------------------------------------------------ */
  function initHeroTyping() {
    const target = $('#typed');
    if (!target) return;

    const words = [
      'baratas e formigas',
      'escorpiões e aranhas',
      'cupins e brocas',
      'ratos e roedores',
      'pragas urbanas'
    ];

    if (prefersReducedMotion) {
      target.textContent = 'pragas urbanas';
      return;
    }

    let wordIdx = 0, charIdx = 0, isDeleting = false;

    function tick() {
      const word = words[wordIdx];
      target.textContent = word.substring(0, charIdx);

      if (!isDeleting && charIdx === word.length) {
        isDeleting = true;
        setTimeout(tick, 1800);
        return;
      }
      if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }

      charIdx += isDeleting ? -1 : 1;
      setTimeout(tick, isDeleting ? 40 : 85);
    }
    tick();
  }

  /* ------------------------------------------------------------------------
     7. Partículas do Hero
     ------------------------------------------------------------------------ */
  function initHeroParticles() {
    const box = $('#hero-particles');
    if (!box || prefersReducedMotion) return;

    for (let i = 0; i < 16; i++) {
      const span = document.createElement('span');
      const size = 20 + Math.random() * 50;
      span.style.cssText = `
        left:${Math.random() * 100}%;
        width:${size}px;
        height:${size}px;
        animation-duration:${10 + Math.random() * 10}s;
        animation-delay:${-Math.random() * 12}s;
      `;
      box.appendChild(span);
    }
  }

  /* ------------------------------------------------------------------------
     8. Marquee Fluida
     ------------------------------------------------------------------------ */
  function initMarquee() {
    const track = $('#marquee-track');
    if (!track) return;

    const items = [
      ['Baratas', 'pest-roach'], ['Formigas', 'pest-ant'], ['Escorpiões', 'pest-scorpion'],
      ['Cupins', 'pest-termite'], ['Ratos', 'pest-rat'], ['Aranhas', 'pest-spider'],
      ['Caixa d\'Água', 'drop'], ['Laudo ANVISA', 'doc'], ['Mosquitos', 'pest-mosquito']
    ];

    const html = [...items, ...items].map(([name, icon]) => `
      <div class="marquee-item">
        <svg class="ic"><use href="#${icon}"/></svg>
        <span>${name}</span>
      </div>
    `).join('');

    track.innerHTML = html;
  }

  /* ------------------------------------------------------------------------
     9. Calculadora de Risco de Infestação
     ------------------------------------------------------------------------ */
  function initRiskCalculator() {
    const section = $('#calculadora');
    const groups = ['#q-type', '#q-env', '#q-last'].map(id => $$(`${id} .calc-option`));
    const label = $('#risk-label');
    const bar = $('#risk-bar');
    const title = $('#risk-title');
    const text = $('#risk-text');
    const waBtn = $('#risk-whatsapp');
    const icon = $('#risk-icon use');

    if (!section || !label) return;

    const LEVELS = {
      baixo: {
        name: 'BAIXO',
        icon: 'risk-ok',
        roaches: 2,
        title: 'Baixo Risco Detectado',
        text: 'Seu imóvel tem boa proteção recente. Mantenha a inspeção semestral para evitar infestações surpresa.'
      },
      medio: {
        name: 'MÉDIO',
        icon: 'alert',
        roaches: 5,
        title: 'Atenção Preventiva Necessária',
        text: 'Há condições favoráveis para proliferação de pragas. Uma manutenção preventiva neste momento é recomendada.'
      },
      alto: {
        name: 'ALTO / CRÍTICO',
        icon: 'risk-high',
        roaches: 10,
        title: 'Vulnerabilidade Crítica',
        text: 'O histórico e o entorno formam condições ideais para roedores e insetos. Agende atendimento o quanto antes.'
      }
    };

    const spawnRoaches = (box, count, isBg = false) => {
      if (!box || prefersReducedMotion) return [];
      return Array.from({ length: count }, (_, i) => {
        const svg = document.createElementNS(SVG_NS, 'svg');
        const size = isBg ? 26 : 18 + (i % 3) * 6;
        svg.innerHTML = '<use href="#roach"/>';
        svg.style.cssText = `
          left:${(i * 35 + 8) % 92}%;
          width:${size}px;
          height:${size}px;
          animation-duration:${8 + (i % 4) * 2.5}s;
          animation-delay:${-i * 1.5}s;
        `;
        box.appendChild(svg);
        return svg;
      });
    };

    const panelRoaches = spawnRoaches($('#risk-roaches'), 10);
    spawnRoaches($('#bg-roaches'), 8, true);

    const getSelected = g => g.find(b => b.classList.contains('is-selected')) || g[0];

    function calculate() {
      const score = groups.reduce((acc, g) => acc + Number(getSelected(g).dataset.points || 0), 0);
      const total = Math.min(Math.max(score, 10), 100);

      const key = total <= 35 ? 'baixo' : (total <= 65 ? 'medio' : 'alto');
      const data = LEVELS[key];

      const [type, env, last] = groups.map(g => getSelected(g).textContent.trim());

      section.dataset.risk = key;
      if (icon) icon.setAttribute('href', `#${data.icon}`);
      label.textContent = `RISCO ${data.name} (${total}%)`;
      if (bar) bar.style.width = `${total}%`;
      if (title) title.textContent = data.title;
      if (text) text.textContent = data.text;

      panelRoaches.forEach((r, idx) => r.toggleAttribute('hidden', idx >= data.roaches));

      const message = `Olá, JVS Dedetizadora! Fiz o teste no site com resultado de Risco ${data.name} (${total}%).\n` +
        `• Imóvel: ${type}\n• Entorno: ${env}\n• Última dedetização: ${last}\n` +
        `Gostaria de agendar uma inspeção técnica.`;

      if (waBtn) {
        waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      }
    }

    groups.forEach(g => {
      g.forEach(btn => {
        btn.addEventListener('click', () => {
          g.forEach(b => {
            b.classList.remove('is-selected');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('is-selected');
          btn.setAttribute('aria-pressed', 'true');
          calculate();
        });
      });
    });
    calculate();
  }

  /* ------------------------------------------------------------------------
     10. FAQ Acordeão
     ------------------------------------------------------------------------ */
  function initFaq() {
    const items = $$('.faq-accordion-item');
    items.forEach(item => {
      const btn = $('.faq-question', item);
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        items.forEach(other => {
          other.classList.remove('is-open');
          const otherBtn = $('.faq-question', other);
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     11. Scroll Reveal com Observador de Interseção
     ------------------------------------------------------------------------ */
  function initScrollReveal() {
    const targets = $$('.reveal');
    const timeline = $('#processTimeline');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-visible'));
      if (timeline) timeline.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    const parentMap = new Map();
    targets.forEach(el => {
      const p = el.parentElement;
      const count = parentMap.get(p) || 0;
      parentMap.set(p, count + 1);
      el.style.setProperty('--delay', `${Math.min(count, 4) * 80}ms`);
      observer.observe(el);
    });

    if (timeline) observer.observe(timeline);
  }

  // Inicialização de Todos os Recursos
  initAmbientCanvas();
  initGallery3DTilt();
  initSupportHub();
  initHeaderAndProgress();
  initMobileMenu();
  initHeroTyping();
  initHeroParticles();
  initMarquee();
  initRiskCalculator();
  initFaq();
  initScrollReveal();
});