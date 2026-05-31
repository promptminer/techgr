/* =============================================
   LHD TECHNOLOGY — script.js
   Smooth scroll · Parallax · Reveal · Counter · Typing
   ============================================= */

/* ─── CUSTOM CURSOR ─── */
(function initCursor() {
  const cursor     = document.createElement('div');
  const cursorRing = document.createElement('div');
  cursor.className     = 'cursor';
  cursorRing.className = 'cursor-ring';
  document.body.appendChild(cursor);
  document.body.appendChild(cursorRing);

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
  });

  // Ring lags behind
  function animateRing() {
    rx += (mx - rx - 18) * 0.12;
    ry += (my - ry - 18) * 0.12;
    cursorRing.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expand ring on hoverable elements
  document.querySelectorAll('a, button, .project-card, .ai-card, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.style.transform += ' scale(1.8)');
    el.addEventListener('mouseleave', () => cursorRing.style.transform = cursorRing.style.transform.replace(' scale(1.8)', ''));
  });
})();

/* ─── NAV SCROLL STYLE ─── */
(function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* ─── MOBILE MENU ─── */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── HERO PARALLAX ─── */
(function initParallax() {
  const heroBg = document.getElementById('heroBg');
  if (!heroBg) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        heroBg.style.transform = `scale(1.1) translateY(${y * 0.25}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ─── COMPANY BG PARALLAX ─── */
(function initCompanyParallax() {
  const companyBgImg = document.querySelector('.company-bg-img img');
  if (!companyBgImg) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const section = companyBgImg.closest('.company');
        const rect    = section.getBoundingClientRect();
        const offset  = (window.innerHeight - rect.top) * 0.06;
        companyBgImg.style.transform = `scale(1.08) translateY(${-offset}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ─── SCROLL REVEAL ─── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, stop observing
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

/* ─── ANIMATED COUNTER ─── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.dataset.count, 10);
      const dur = 1600; // ms
      const step = 16;
      const increment = end / (dur / step);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          el.textContent = end;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, step);

      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));
})();

/* ─── TYPING TEXT EFFECT (hero sub) ─── */
(function initTypingEffect() {
  const el = document.querySelector('.hero-sub');
  if (!el) return;

  const text     = el.textContent.trim();
  const delay    = 600; // ms before starting
  const speed    = 36;  // ms per char
  el.textContent = '';
  el.style.opacity = 1;

  let i = 0;
  setTimeout(() => {
    const timer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }, delay);
})();

/* ─── FLOATING ORB MOUSE INTERACTION ─── */
(function initOrbInteraction() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  document.addEventListener('mousemove', e => {
    const cx = (e.clientX / window.innerWidth  - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 8;
      orb.style.transform = `translate(${cx * factor}px, ${cy * factor}px)`;
    });
  }, { passive: true });
})();

/* ─── ACTIVE NAV LINK ON SCROLL ─── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const id   = entry.target.id;
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
})();

/* ─── STAGGER CHILDREN ON SCROLL ─── */
(function initStaggerChildren() {
  const parents = document.querySelectorAll(
    '.ai-grid, .services-grid, .portfolio-grid, .problems-list'
  );

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const children = entry.target.querySelectorAll(
        '.ai-card, .service-card, .project-card, .problem-item'
      );
      children.forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.07}s`;
      });
      io.unobserve(entry.target);
    });
  }, { threshold: 0.05 });

  parents.forEach(p => io.observe(p));
})();

/* ─── TICKER PAUSE ON HOVER ─── */
(function initTickerPause() {
  const ticker = document.querySelector('.ticker');
  if (!ticker) return;

  ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
  ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
})();

/* ─── PROBLEM ITEMS HOVER ─── */
(function initProblemHover() {
  document.querySelectorAll('.problem-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      document.querySelectorAll('.problem-item').forEach(i => {
        if (i !== item) i.style.opacity = '0.5';
      });
    });
    item.addEventListener('mouseleave', () => {
      document.querySelectorAll('.problem-item').forEach(i => {
        i.style.opacity = '1';
      });
    });
  });
})();

/* ─── SCROLL PROGRESS BAR ─── */
(function initProgressBar() {
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    position: 'fixed',
    top: '0', left: '0',
    height: '2px',
    background: 'var(--accent)',
    zIndex: '2000',
    transformOrigin: 'left',
    width: '0%',
    transition: 'width 0.1s linear',
    pointerEvents: 'none'
  });
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = `${pct}%`;
  }, { passive: true });
})();