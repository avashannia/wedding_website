// ---------- background music: loop + autoplay (with browser-policy fallback) ----------
(function initMusic() {
  const bgMusic = document.getElementById('bgMusic');
  const toggleBtn = document.getElementById('musicToggle');
  if (!bgMusic) return;

  bgMusic.loop = true;
  bgMusic.volume = 0.55;

  function setPlayingUI(isPlaying) {
    if (!toggleBtn) return;
    toggleBtn.classList.toggle('playing', isPlaying);
    toggleBtn.setAttribute('aria-label', isPlaying ? 'Pause background music' : 'Play background music');
  }

  function attemptPlay() {
    const p = bgMusic.play();
    if (p && typeof p.then === 'function') {
      p.then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));
    }
  }

  // Try immediately on load. Most mobile/desktop browsers block audible
  // autoplay before any user interaction, so this will often be silently
  // rejected — that's expected and handled by the fallback below.
  attemptPlay();

  // The moment the visitor taps/clicks/presses a key anywhere on the page,
  // try again. Browsers count that as the "user gesture" needed to unlock
  // audio, so the song starts as soon as they begin interacting with the site.
  const unlock = () => {
    if (bgMusic.paused) attemptPlay();
    document.removeEventListener('pointerdown', unlock);
    document.removeEventListener('keydown', unlock);
  };
  document.addEventListener('pointerdown', unlock, { once: true });
  document.addEventListener('keydown', unlock, { once: true });

  // Manual play/pause control.
  toggleBtn?.addEventListener('click', () => {
    if (bgMusic.paused) {
      attemptPlay();
    } else {
      bgMusic.pause();
      setPlayingUI(false);
    }
  });

  bgMusic.addEventListener('play', () => setPlayingUI(true));
  bgMusic.addEventListener('pause', () => setPlayingUI(false));
})();

// ---------- nav actions (home / map / rsvp) ----------
document.querySelectorAll('[data-nav]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.nav;
    if (target === 'home') {
      document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'map') {
      openModal('modal-map');
    } else if (target === 'rsvp') {
      openModal('modal-rsvp');
    }
  });
});

// ---------- stamp cards open their matching modal ----------
// NOTE: every data-open value used in index.html must have a matching key here.
const stampToModal = {
  dress: 'modal-dress',
  map: 'modal-map',
  rsvp: 'modal-rsvp',
  entourage: 'modal-entourage'
};

document.querySelectorAll('.stamp-card').forEach(card => {
  const go = () => {
    const key = card.dataset.open;
    const modalId = stampToModal[key];
    if (!modalId) {
      console.warn('No modal mapped for stamp card data-open="' + key + '"');
      return;
    }
    openModal(modalId);
  };
  card.addEventListener('click', go);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
  });
});

// ---------- modal open / close ----------
let lastFocused = null;
function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) { console.warn('Modal not found:', id); return; }
  lastFocused = document.activeElement;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const closeBtn = overlay.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus();
}
function closeModal(overlay) {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(overlay); });
  overlay.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => closeModal(overlay)));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
  }
});

// ---------- map tabs ----------
document.querySelectorAll('.tab-btn').forEach(tab => {
  tab.addEventListener('click', () => {
    const container = tab.closest('.modal-card');
    container.querySelectorAll('.tab-btn').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    container.querySelectorAll('.map-pane').forEach(p => p.classList.remove('active'));
    tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
    container.querySelector(`.map-pane[data-pane="${tab.dataset.pane}"]`).classList.add('active');
  });
});

// ---------- attendance radios: sync the "selected" look + tick color ----------
document.querySelectorAll('.attend-option').forEach(option => {
  const input = option.querySelector('input[type="radio"]');
  if (!input) return;
  input.addEventListener('change', () => {
    const group = option.closest('.attend-row');
    group.querySelectorAll('.attend-option').forEach(o => o.classList.remove('selected'));
    if (input.checked) option.classList.add('selected');
  });
});

// =================================================================
// STAMP CAROUSEL — center-focus, drag/swipe (mouse + touch), dots
// =================================================================
(function initCarousel() {
  const viewport = document.getElementById('carouselViewport');
  const track = document.getElementById('stampTrack');
  const dotsWrap = document.getElementById('carouselDots');
  if (!viewport || !track) return;

  const cards = Array.from(track.querySelectorAll('.stamp-card'));
  if (!cards.length) return;

  // Default to the Entourage card being active/centered on every fresh load.
  const entourageIndex = cards.findIndex(c => c.dataset.open === 'entourage');
  let activeIndex = entourageIndex !== -1 ? entourageIndex : Math.min(1, cards.length - 1);
  let currentTranslate = 0;
  let dragging = false;      // true only once real movement has been detected
  let pointerActive = false; // true from pointerdown until pointerup/cancel
  let startX = 0;
  let startTranslate = 0;
  let pointerId = null;
  const DRAG_THRESHOLD = 6; // px of movement before we treat this as a drag, not a click

  // ---- build dot indicators ----
  dotsWrap.innerHTML = '';
  const dots = cards.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Go to card ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  // ---- perforated stamp-edge mask, sized to each card's real pixel box ----
  function buildStampMask(w, h) {
    if (w <= 0 || h <= 0) return '';
    const targetNotches = 13;
    const spacing = Math.max(14, w / targetNotches);
    const r = Math.max(4, spacing * 0.34);
    let circles = '';
    for (let x = spacing / 2; x < w; x += spacing) {
      circles += `<circle cx="${x.toFixed(1)}" cy="0" r="${r.toFixed(1)}" fill="black"/>`;
      circles += `<circle cx="${x.toFixed(1)}" cy="${h}" r="${r.toFixed(1)}" fill="black"/>`;
    }
    const vSpacing = Math.max(14, h / Math.max(4, Math.round(h / spacing)));
    for (let y = vSpacing / 2; y < h; y += vSpacing) {
      circles += `<circle cx="0" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="black"/>`;
      circles += `<circle cx="${w}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="black"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
      `<rect width="${w}" height="${h}" fill="white"/>${circles}</svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  function applyMasks() {
    cards.forEach(card => {
      // measure the card's un-scaled box (offsetWidth/Height ignore CSS transform scale)
      const w = card.offsetWidth;
      const h = card.offsetHeight;
      const mask = buildStampMask(w, h);
      if (!mask) return;
      card.style.webkitMaskImage = mask;
      card.style.maskImage = mask;
    });
  }

  // ---- center the active card within the viewport ----
  function centerOffsetFor(index) {
    const card = cards[index];
    if (!card) return 0;
    const viewportCenter = viewport.clientWidth / 2;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    return viewportCenter - cardCenter;
  }

  function render(offset) {
    track.style.transform = `translateX(${offset}px)`;
  }

  function update(animate = true) {
    activeIndex = Math.max(0, Math.min(cards.length - 1, activeIndex));
    currentTranslate = centerOffsetFor(activeIndex);
    if (!animate) viewport.classList.add('dragging'); // temporarily kill transition
    render(currentTranslate);
    if (!animate) {
      // force reflow then remove the no-transition flag on next frame
      requestAnimationFrame(() => viewport.classList.remove('dragging'));
    }
    cards.forEach((c, i) => {
      const isActive = i === activeIndex;
      c.classList.toggle('is-active', isActive);
      c.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
  }

  function goTo(index) {
    activeIndex = index;
    update(true);
  }

  // ---- pointer-based drag (works for mouse, touch, and pen alike) ----
  // Drag mode only engages once movement exceeds DRAG_THRESHOLD. A plain
  // click (press + release with little/no movement) is left completely
  // alone here, so it bubbles normally and the card's own click handler
  // opens its modal — this is what was silently broken on desktop before,
  // where pointer capture was being grabbed on every mousedown and could
  // retarget the resulting click event away from the card.
  function onPointerDown(e) {
    pointerActive = true;
    dragging = false;
    pointerId = e.pointerId;
    startX = e.clientX;
    startTranslate = currentTranslate;
  }

  function onPointerMove(e) {
    if (!pointerActive) return;
    const deltaX = e.clientX - startX;

    if (!dragging) {
      if (Math.abs(deltaX) < DRAG_THRESHOLD) return; // still just a click/tap so far
      dragging = true;
      viewport.classList.add('dragging');
      viewport.setPointerCapture && viewport.setPointerCapture(pointerId);
    }

    render(startTranslate + deltaX);
  }

  function endDrag(e) {
    if (!pointerActive) return;
    pointerActive = false;

    if (!dragging) return; // it was a plain click/tap — let the click event do its thing

    dragging = false;
    viewport.classList.remove('dragging');
    if (viewport.releasePointerCapture && pointerId != null) {
      try { viewport.releasePointerCapture(pointerId); } catch (err) { /* already released */ }
    }
    const deltaX = (e.clientX != null ? e.clientX : startX) - startX;
    const threshold = 40;
    if (deltaX > threshold && activeIndex > 0) {
      activeIndex -= 1;
    } else if (deltaX < -threshold && activeIndex < cards.length - 1) {
      activeIndex += 1;
    }
    update(true);
  }

  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('pointermove', onPointerMove);
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('pointerleave', (e) => { if (dragging) endDrag(e); });

  // clicking a card that isn't active centers it instead of opening the modal immediately
  cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      if (i !== activeIndex) {
        e.stopImmediatePropagation();
        goTo(i);
      }
    }, true); // capture phase: runs before the open-modal listener registered earlier
  });

  // ---- keep everything correct across resizes / orientation changes ----
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      applyMasks();
      update(false);
    }, 120);
  });

  // ---- initial layout ----
  // run after images/fonts settle so offsetWidth/offsetLeft are accurate
  window.addEventListener('load', () => {
    applyMasks();
    update(false);
  });
  // also run immediately in case 'load' already fired
  applyMasks();
  update(false);
})();

// ---------- RSVP submit ----------
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwunxxs2GKQuYdLvInU4lWLX8Sf56htbdQY1BfxvvTfsfAMq8h87l5IMEqY9XwTzEaPQw/exec';
const rsvpForm = document.getElementById('rsvpForm');

rsvpForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('rsvpStatus');

  const data = {
    fullName: form.fullName.value,
    attending: form.attending.value, // RadioNodeList.value returns the checked radio's value
    songSuggest: form.songSuggest ? form.songSuggest.value : '',
    notes: form.dietaryRestriction.value,
    submittedAt: new Date().toISOString()
  };

  if (status) {
    status.textContent = 'Sending…';
    status.classList.add('show');
  }

  try {
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (status) status.textContent = 'Thank you — your RSVP has been received.';
    form.reset();
    document.querySelectorAll('.attend-option').forEach(o => o.classList.remove('selected'));
  } catch (err) {
    if (status) status.textContent = 'Something went wrong. Please try again.';
  }
});