// ═══════════════════════════════════════════════
// YMM Africa — Main JavaScript
// Nav | Flip Cards | Testimonials Carousel | Form | Scroll Reveal
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAV ───────────────────────────────────
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ─── FLIP CARDS ────────────────────────────
  document.querySelectorAll('.card-wrap').forEach(wrap => {
    const front    = wrap.querySelector('.card-front');
    const closeBtn = wrap.querySelector('.btn-close');

    front.addEventListener('click', () => {
      wrap.classList.add('flipped');
    });

    closeBtn.addEventListener('click', e => {
      e.stopPropagation();
      wrap.classList.remove('flipped');
    });
  });

  // ─── TESTIMONIALS CAROUSEL ──────────────────
  const track   = document.getElementById('carousel-track');
  const cards   = track ? track.querySelectorAll('.testi-card') : [];
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  let current = 0;
  let autoInterval;

  function getVisible() {
    if (window.innerWidth <= 900) return 1;
    return 2;
  }

  function updateCarousel() {
    if (!track || cards.length === 0) return;
    const visible  = getVisible();
    const maxIndex = cards.length - visible;
    if (current > maxIndex) current = maxIndex;
    if (current < 0)        current = 0;
    const wrapWidth = track.parentElement.offsetWidth;
    const gap       = 24;
    const cardW     = (wrapWidth - gap * (visible - 1)) / visible;
    const offset    = current * (cardW + gap);
    track.style.transform = `translateX(-${offset}px)`;
  }

  function next() {
    const visible  = getVisible();
    const maxIndex = cards.length - visible;
    current = current >= maxIndex ? 0 : current + 1;
    updateCarousel();
  }

  function prev() {
    const visible  = getVisible();
    const maxIndex = cards.length - visible;
    current = current <= 0 ? maxIndex : current - 1;
    updateCarousel();
  }

  function startAuto() {
    autoInterval = setInterval(next, 5000);
  }

  function resetAuto() {
    clearInterval(autoInterval);
    startAuto();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAuto(); });

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
  startAuto();

  // ─── FORM VALIDATION ────────────────────────
  const form       = document.getElementById('apply-form');
  const applyBtn   = document.getElementById('apply-btn');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const name    = document.getElementById('f-name');
      const email   = document.getElementById('f-email');
      const phone   = document.getElementById('f-phone');
      const program = document.getElementById('f-program');

      // Required text/tel/select fields
      [name, phone, program].forEach(field => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          group.classList.add('error');
          valid = false;
        }
      });

      // Email validation
      const emailGroup = email.closest('.form-group');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        emailGroup.classList.add('error');
        valid = false;
      }

      if (valid) {
        applyBtn.textContent = 'APPLICATION SENT ✓';
        applyBtn.classList.add('success');
        successMsg.style.display = 'block';
        setTimeout(() => {
          form.reset();
          applyBtn.textContent = 'APPLY NOW';
          applyBtn.classList.remove('success');
          successMsg.style.display = 'none';
        }, 4500);
      }
    });

    // Remove error state on input
    form.querySelectorAll('input, select').forEach(field => {
      field.addEventListener('input', () => {
        field.closest('.form-group').classList.remove('error');
      });
    });
  }

  // ─── SCROLL REVEAL ──────────────────────────
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  // ─── DISCIPLINES LIST STAGGER ────────────────
  const disciplinesList = document.querySelector('.disciplines-list');

  if (disciplinesList) {
    const listItems = disciplinesList.querySelectorAll('li');

    const listObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          listItems.forEach((item, i) => {
            setTimeout(() => item.classList.add('visible'), i * 130);
          });
          listObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    listObserver.observe(disciplinesList);
  }

  // ─── PROGRAM CARDS STAGGER ──────────────────
  const cardsGrid = document.querySelector('.cards-grid');

  if (cardsGrid) {
    const cardWraps = cardsGrid.querySelectorAll('.card-wrap');

    const cardsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cardWraps.forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 100);
          });
          cardsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cardsObserver.observe(cardsGrid);
  }

});
