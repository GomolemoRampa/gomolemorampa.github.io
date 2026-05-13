'use strict';

//MODULE: Cursor Glow
//Tracks mouse position and moves a radial glow element to follow the cursor.

const CursorGlow = (() => {
  const el = document.getElementById('cursorGlow');
  if (!el) return;

  const move  = e => { el.style.left = `${e.clientX}px`; el.style.top = `${e.clientY}px`; };
  const hide  = ()  => { el.style.opacity = '0'; };
  const show  = ()  => { el.style.opacity = '1'; };

  document.addEventListener('mousemove',  move);
  document.addEventListener('mouseleave', hide);
  document.addEventListener('mouseenter', show);
})();



//MODULE: Scroll Reveal
//Uses IntersectionObserver to fade-in elements with the class `.reveal` as they enter the viewport.

const ScrollReveal = (() => {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
})();


//MODULE: Hero Entrance Animation
//Staggers child elements of .hero-content into view on page load.

const HeroEntrance = (() => {
  const animate = () => {
    const heroEls = document.querySelectorAll('.hero-content > *');
    heroEls.forEach((el, i) => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;

      // Trigger reflow then apply final state
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity   = '1';
          el.style.transform = 'none';
        });
      });
    });
  };

  window.addEventListener('load', animate);
})();


//MODULE: Active Nav Highlight
//Updates nav link colour to mint when the corresponding section is in view.

const ActiveNav = (() => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const OFFSET = 120;

  const update = () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - OFFSET) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${current}`;
      link.style.color = isActive ? 'var(--mint)' : '';
    });
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();