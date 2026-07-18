/* ==========================================================================
   Sonaya Beauty Studio — script.js
   Vanilla JS: nav state, mobile menu, WhatsApp deep-links, scroll reveals,
   stat count-up, and the "Studio Pulse" live booking notification ticker.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     0. CONFIG — edit these to update the business details site-wide
  --------------------------------------------------------------------- */
  const WHATSAPP_NUMBER = '2347013608697'; // no plus sign, no leading zero

  function waLink(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  /* ---------------------------------------------------------------------
     1. Fixed navbar state on scroll
  --------------------------------------------------------------------- */
  const nav = document.getElementById('site-nav');
  function handleNavScroll() {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* ---------------------------------------------------------------------
     2. Mobile menu toggle
  --------------------------------------------------------------------- */
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('icon-open');
  const menuIconClose = document.getElementById('icon-close');

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuIconOpen.classList.toggle('hidden', isOpen);
    menuIconClose.classList.toggle('hidden', !isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('#mobile-menu a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    });
  });

  /* ---------------------------------------------------------------------
     3. Build every "Book Now" WhatsApp deep-link from data-service
  --------------------------------------------------------------------- */
  document.querySelectorAll('[data-book-service]').forEach((btn) => {
    const service = btn.getAttribute('data-book-service');
    const message = `Hi Sonaya Beauty Studio! ✨ I'd love to book a "${service}" appointment. Could you share your next available slots?`;
    btn.setAttribute('href', waLink(message));
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // Generic booking buttons (hero, CTA banner, nav, floating button)
  document.querySelectorAll('[data-book-general]').forEach((btn) => {
    const message = `Hi Sonaya Beauty Studio! ✨ I'd like to book an appointment. Please let me know your availability this week.`;
    btn.setAttribute('href', waLink(message));
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  /* ---------------------------------------------------------------------
     4. Scroll reveal animations (IntersectionObserver)
  --------------------------------------------------------------------- */
  const observeEls = document.querySelectorAll('.observe');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  observeEls.forEach((el) => io.observe(el));

  /* ---------------------------------------------------------------------
     5. Stat count-up
  --------------------------------------------------------------------- */
  const statEls = document.querySelectorAll('.stat-num');
  const statIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        statIO.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  statEls.forEach((el) => statIO.observe(el));

  /* ---------------------------------------------------------------------
     6. "Studio Pulse" — live-style booking notifications
     Sample/illustrative data cycling between Lagos & Enugu. Swap this
     array for a real feed (booking webhook, Google Sheet, etc.) later.
  --------------------------------------------------------------------- */
  const pulseFeed = [
    { name: 'Amara', city: 'Lagos', service: 'Volume Lash Set', time: '3 minutes ago' },
    { name: 'Chiamaka', city: 'Enugu', service: 'Ombre Brows', time: '7 minutes ago' },
    { name: 'Blessing', city: 'Lagos', service: 'Mega Volume Set', time: '11 minutes ago' },
    { name: 'Ngozi', city: 'Enugu', service: 'Microblading', time: '14 minutes ago' },
    { name: 'Temitope', city: 'Lagos', service: 'Classic Lash Set', time: '19 minutes ago' },
    { name: 'Adaeze', city: 'Enugu', service: 'Combo Brows', time: '22 minutes ago' },
    { name: 'Fisayo', city: 'Lagos', service: 'Hybrid Lash Set', time: '26 minutes ago' },
    { name: 'Ifeoma', city: 'Enugu', service: 'Nano Brows', time: '31 minutes ago' },
    { name: 'Zainab', city: 'Lagos', service: 'Cluster Lash', time: '35 minutes ago' },
    { name: 'Uchechi', city: 'Enugu', service: 'Microshading', time: '40 minutes ago' },
    { name: 'Damilola', city: 'Lagos', service: 'Bottom Lash', time: '44 minutes ago' },
    { name: 'Ogechi', city: 'Enugu', service: 'Strip Lash', time: '48 minutes ago' },
  ];

  const toast = document.getElementById('pulse-toast');
  const toastName = document.getElementById('pulse-name');
  const toastDetail = document.getElementById('pulse-detail');
  const toastTime = document.getElementById('pulse-time');
  const toastClose = document.getElementById('pulse-close');

  let pulseIndex = 0;
  let pulseTimer = null;
  let pulseDismissedByUser = false;

  function showPulse() {
    if (pulseDismissedByUser) return;
    const item = pulseFeed[pulseIndex % pulseFeed.length];
    pulseIndex++;
    toastName.textContent = `${item.name} in ${item.city}`;
    toastDetail.textContent = `just booked ${item.service}`;
    toastTime.textContent = item.time;
    toast.classList.add('show');

    clearTimeout(pulseTimer);
    pulseTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 5200);
  }

  toastClose.addEventListener('click', () => {
    toast.classList.remove('show');
    pulseDismissedByUser = true;
  });

  // First appearance after a short delay, then repeat on an interval
  setTimeout(() => {
    showPulse();
    setInterval(showPulse, 8500);
  }, 3200);

  /* ---------------------------------------------------------------------
     7. Footer year
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
