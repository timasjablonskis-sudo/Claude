/* ═══════════════════════════════════════════════════════════
   CONVOY TRUCK REPAIR — MASTER SCRIPTS
   ═══════════════════════════════════════════════════════════ */
(function(){
'use strict';

/* ── CUSTOM CURSOR ─────────────────────────────────────── */
if(window.innerWidth > 768){
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animateRing(){
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .service-card, .city-tag, .accordion-header').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
  });
}

/* ── PAGE TRANSITION ───────────────────────────────────── */
const transBar = document.createElement('div');
transBar.className = 'page-transition';
document.body.appendChild(transBar);

document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if(href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('tel') && !href.startsWith('mailto')){
    a.addEventListener('click', function(e){
      e.preventDefault();
      transBar.classList.add('active');
      setTimeout(() => { window.location.href = href; }, 350);
    });
  }
});

/* ── HEADER SCROLL ─────────────────────────────────────── */
const header = document.getElementById('header');
if(header){
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, {passive:true});
}

/* ── MOBILE DRAWER ─────────────────────────────────────── */
const hamburger = document.getElementById('hamburgerBtn');
const drawer = document.getElementById('mobileDrawer');
const overlay = document.getElementById('drawerOverlay');

if(hamburger && drawer && overlay){
  function openDrawer(){ hamburger.classList.add('open'); drawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow='hidden'; }
  function closeDrawer(){ hamburger.classList.remove('open'); drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow=''; }

  hamburger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  overlay.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
}

/* ── PARALLAX HERO ─────────────────────────────────────── */
const heroBg = document.querySelector('.hero-bg');
if(heroBg && window.innerWidth > 768){
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.3}px)`;
  }, {passive:true});
}

/* ── PARTICLES ─────────────────────────────────────────── */
const particlesContainer = document.getElementById('particles');
if(particlesContainer){
  for(let i = 0; i < 30; i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (6 + Math.random() * 10) + 's';
    p.style.animationDelay = Math.random() * -15 + 's';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    particlesContainer.appendChild(p);
  }
}

/* ── HIGHWAY DASHES ────────────────────────────────────── */
const dashesContainer = document.getElementById('highwayDashes');
if(dashesContainer){
  for(let i = 0; i < 10; i++){
    const d = document.createElement('div');
    d.className = 'dash';
    d.style.left = (5 + Math.random() * 90) + '%';
    d.style.height = (25 + Math.random() * 50) + 'px';
    d.style.animationDuration = (3 + Math.random() * 5) + 's';
    d.style.animationDelay = Math.random() * -8 + 's';
    dashesContainer.appendChild(d);
  }
}

/* ── STAGGERED WORD ANIMATION ──────────────────────────── */
document.querySelectorAll('.hero h1 .word').forEach((w, i) => {
  w.style.animationDelay = (0.2 + i * 0.15) + 's';
});

/* ── INTERSECTION OBSERVER (REVEAL) ────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if(e.isIntersecting){
      const delay = e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('visible'), delay);
      revealObserver.unobserve(e.target);
    }
  });
},{threshold:0.08, rootMargin:'0px 0px -30px 0px'});

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .service-card, .stat-item, .why-card, .step-card, .value-card, .city-tag, .timeline-item').forEach((el, i) => {
  const group = el.closest('.services-grid, .stats-grid, .why-grid, .steps-grid, .values-grid, .city-grid, .timeline');
  if(group){
    const siblings = Array.from(group.children);
    const idx = siblings.indexOf(el);
    el.dataset.delay = idx * 60;
  }
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ── COUNTER ANIMATION ─────────────────────────────────── */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const el = e.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = target > 1000 ? 2000 : 1500;
      const start = performance.now();
      function tick(now){
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.floor(eased * target).toLocaleString() + suffix;
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    }
  });
},{threshold:0.5});
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ── OPEN / CLOSED BADGE ───────────────────────────────── */
function checkOpenStatus(){
  const badges = document.querySelectorAll('.open-badge');
  if(!badges.length) return;

  const now = new Date(new Date().toLocaleString('en-US',{timeZone:'America/Chicago'}));
  const day = now.getDay();
  const t = now.getHours() * 60 + now.getMinutes();
  let isOpen = false;

  // Mon-Fri 7:00-17:00, Sat 7:00-12:45
  if(day >= 1 && day <= 5 && t >= 420 && t < 1020) isOpen = true;
  if(day === 6 && t >= 420 && t < 765) isOpen = true;

  badges.forEach(badge => {
    badge.className = 'open-badge ' + (isOpen ? 'is-open' : 'is-closed');
    const txt = badge.querySelector('.open-text');
    if(txt) txt.textContent = isOpen ? 'Open Now' : 'Currently Closed';
  });
}
checkOpenStatus();
setInterval(checkOpenStatus, 60000);

/* Highlight today in hours table */
const chicagoDay = new Date(new Date().toLocaleString('en-US',{timeZone:'America/Chicago'})).getDay();
document.querySelectorAll('.hours-table tr[data-day]').forEach(tr => {
  if(parseInt(tr.dataset.day) === chicagoDay) tr.classList.add('today');
});

/* ── TESTIMONIAL CAROUSEL ──────────────────────────────── */
const track = document.getElementById('carouselTrack');
if(track){
  const slides = track.querySelectorAll('.testimonial-slide');
  const dotsC = document.getElementById('carouselDots');
  let cur = 0, autoTimer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Review ' + (i+1));
    if(i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    dotsC.appendChild(dot);
  });

  function goTo(i){
    cur = ((i % slides.length) + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (cur * 100) + '%)';
    dotsC.querySelectorAll('button').forEach((d,j) => d.classList.toggle('active', j === cur));
  }

  const prev = document.getElementById('prevSlide');
  const next = document.getElementById('nextSlide');
  if(prev) prev.addEventListener('click', () => { goTo(cur - 1); resetAuto(); });
  if(next) next.addEventListener('click', () => { goTo(cur + 1); resetAuto(); });

  function startAuto(){ autoTimer = setInterval(() => goTo(cur + 1), 5000); }
  function resetAuto(){ clearInterval(autoTimer); startAuto(); }
  startAuto();

  const wrapper = track.closest('.carousel-wrapper');
  if(wrapper){
    wrapper.addEventListener('mouseenter', () => clearInterval(autoTimer));
    wrapper.addEventListener('mouseleave', startAuto);
  }

  /* Touch/swipe */
  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; clearInterval(autoTimer); }, {passive:true});
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if(Math.abs(dx) > 50){
      dx > 0 ? goTo(cur - 1) : goTo(cur + 1);
    }
    startAuto();
  }, {passive:true});
}

/* ── MAGNETIC BUTTONS ──────────────────────────────────── */
if(window.innerWidth > 768){
  document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
    const btn = wrap.querySelector('a, button');
    if(!btn) return;
    wrap.addEventListener('mousemove', e => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    wrap.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
      btn.style.transition = 'transform 0.4s ease';
      setTimeout(() => btn.style.transition = '', 400);
    });
  });
}

/* ── FORM VALIDATION & SUBMIT ──────────────────────────── */
document.querySelectorAll('form[data-dispatch]').forEach(form => {
  const body = form.closest('.form-body');
  const success = body ? body.parentElement.querySelector('.form-success') : null;
  const submitBtn = form.querySelector('.btn-submit');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('.form-group[data-validate]').forEach(group => {
      const type = group.dataset.validate;
      const input = group.querySelector('input, select, textarea');
      let ok = true;
      if(type === 'required') ok = input.value.trim() !== '';
      else if(type === 'phone') ok = input.value.replace(/\D/g,'').length >= 7;
      else if(type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
      group.classList.toggle('has-error', !ok);
      if(!ok) valid = false;
    });

    if(!valid) return;

    /* Loading state */
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      if(body) body.style.display = 'none';
      if(success){
        const ref = success.querySelector('.ref-num');
        if(ref) ref.textContent = 'Reference: CTR-' + Date.now().toString(36).toUpperCase().slice(-6);
        success.classList.add('show');
        success.scrollIntoView({behavior:'smooth', block:'center'});
      }
    }, 1500);
  });

  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => el.closest('.form-group').classList.remove('has-error'));
  });
});

/* ── ACCORDION ─────────────────────────────────────────── */
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const wasOpen = item.classList.contains('open');
    // Close all in same group
    item.parentElement.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
    if(!wasOpen) item.classList.add('open');
  });
});

/* ── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(!target) return;
    e.preventDefault();
    const h = document.getElementById('header');
    const offset = h ? h.offsetHeight + 16 : 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({top, behavior:'smooth'});
  });
});

})();
