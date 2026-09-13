/* Yiwen Fang — site behavior. No dependencies.
   Only one job: drag the sidebar's right edge to resize it. Without JS the
   sidebar simply keeps its default width. */
(function () {
  'use strict';

  var KEY = 'rail-width';
  var MIN = 120, MAX = 380;              // px
  var body = document.body;
  var root = document.documentElement;

  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function load()  { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

  // restore a saved width before anything is interactive
  var saved = parseInt(load(), 10);
  if (saved >= MIN && saved <= MAX) root.style.setProperty('--rail', saved + 'px');

  var grip = document.querySelector('.railgrip');
  if (!grip) return;

  var aside = grip.parentNode;
  var dragging = false;

  grip.addEventListener('pointerdown', function (e) {
    if (window.matchMedia('(max-width:860px)').matches) return;
    dragging = true;
    try { grip.setPointerCapture(e.pointerId); } catch (err) {}
    body.classList.add('rail-dragging');
    e.preventDefault();
  });

  grip.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var w = e.clientX - aside.getBoundingClientRect().left;
    root.style.setProperty('--rail', Math.max(MIN, Math.min(MAX, Math.round(w))) + 'px');
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    body.classList.remove('rail-dragging');
    try { grip.releasePointerCapture(e.pointerId); } catch (err) {}
    save(parseInt(root.style.getPropertyValue('--rail'), 10) || '');
  }
  grip.addEventListener('pointerup', endDrag);
  grip.addEventListener('pointercancel', endDrag);

  // double-click the handle to restore the default width
  grip.addEventListener('dblclick', function () {
    root.style.removeProperty('--rail');
    save('');
  });
})();

/* A link to a collapsed section must open it, or the jump lands on nothing. */
(function () {
  'use strict';
  function reveal(hash) {
    if (!hash || hash.length < 2) return;
    var el;
    try { el = document.querySelector(hash); } catch (e) { return; }
    if (!el) return;
    var d = el.closest ? el.closest('details') : null;
    while (d) { d.open = true; d = d.parentNode.closest ? d.parentNode.closest('details') : null; }
    el.scrollIntoView();
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a) reveal(a.getAttribute('href'));
  });
  window.addEventListener('hashchange', function () { reveal(location.hash); });
  if (location.hash) reveal(location.hash);
})();


/* Click a figure to see it full size. Hover already grows it slightly; this is
   for the dense multi-panel figures that a thumbnail cannot carry. */
(function () {
  'use strict';
  var figures = document.querySelectorAll('.row figure.shot, .finding figure.shot');
  if (!figures.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<button class="close" aria-label="Close">\u00d7</button><img alt=""><p class="cap"></p>';
  document.body.appendChild(box);

  var boxImg = box.querySelector('img');
  var boxCap = box.querySelector('.cap');
  var lastFocus = null;

  function open(img) {
    lastFocus = document.activeElement;
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt || '';
    boxCap.textContent = img.alt || '';
    box.setAttribute('open', '');
    box.querySelector('.close').focus();
  }
  function close() {
    box.removeAttribute('open');
    boxImg.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  }

  Array.prototype.forEach.call(figures, function (fig) {
    var img = fig.querySelector('img');
    if (!img) return;
    function arm() {
      if (!img.naturalWidth) return;           // never open an empty overlay
      fig.classList.add('zoomable');
      fig.setAttribute('tabindex', '0');
      fig.setAttribute('role', 'button');
      fig.setAttribute('aria-label', 'Enlarge figure');
      fig.addEventListener('click', function () { open(img); });
      fig.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
      });
    }
    if (img.complete) arm(); else img.addEventListener('load', arm);
  });

  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && box.hasAttribute('open')) close();
  });
})();
