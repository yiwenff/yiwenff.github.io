/* Yiwen Fang — site behaviour. No dependencies. Progressive: without JS the
   rail is simply always open and figures are plain images. */
(function () {
  'use strict';

  /* ---- left rail: collapse, and drag its edge to resize ---------------- */
  var KEY_OPEN = 'rail-collapsed';
  var KEY_W    = 'rail-width';
  var MIN = 120, MAX = 380;          // px
  var body = document.body;
  var root = document.documentElement;

  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k)    { try { return localStorage.getItem(k); } catch (e) { return null; } }

  var btn  = document.querySelector('.railtoggle');
  var grip = document.querySelector('.railgrip');

  function setRail(collapsed) {
    body.classList.toggle('rail-collapsed', collapsed);
    if (!btn) return;
    btn.setAttribute('aria-expanded', String(!collapsed));
    var label = collapsed ? 'Show menu' : 'Hide menu';
    btn.title = label;
    btn.setAttribute('aria-label', label);
  }

  // restore a saved width before anything is interactive
  var savedW = parseInt(load(KEY_W), 10);
  if (savedW >= MIN && savedW <= MAX) root.style.setProperty('--rail', savedW + 'px');

  if (btn) {
    setRail(body.classList.contains('rail-collapsed'));
    btn.addEventListener('click', function () {
      var next = !body.classList.contains('rail-collapsed');
      setRail(next);
      save(KEY_OPEN, next ? '1' : '0');
    });
    // arm the width transition only after the restored state has painted
    setTimeout(function () { body.classList.add('rail-ready'); }, 0);
  }

  if (grip) {
    var aside = grip.parentNode;
    var dragging = false;

    grip.addEventListener('pointerdown', function (e) {
      if (window.matchMedia('(max-width:860px)').matches) return;
      dragging = true;
      grip.setPointerCapture(e.pointerId);
      body.classList.add('rail-dragging');
      e.preventDefault();
    });

    grip.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var w = e.clientX - aside.getBoundingClientRect().left;
      w = Math.max(MIN, Math.min(MAX, Math.round(w)));
      root.style.setProperty('--rail', w + 'px');
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      body.classList.remove('rail-dragging');
      try { grip.releasePointerCapture(e.pointerId); } catch (err) {}
      save(KEY_W, parseInt(root.style.getPropertyValue('--rail'), 10) || '');
    }
    grip.addEventListener('pointerup', endDrag);
    grip.addEventListener('pointercancel', endDrag);

    // double-click the handle to restore the default width
    grip.addEventListener('dblclick', function () {
      root.style.removeProperty('--rail');
      save(KEY_W, '');
    });
  }

  /* ---- click a work thumbnail to see the figure full size -------------- */
  var figures = document.querySelectorAll('.row figure.shot');
  if (!figures.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<button class="close" aria-label="Close">×</button>' +
                  '<img alt=""><figcaption></figcaption>';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  document.body.appendChild(box);

  var boxImg = box.querySelector('img');
  var boxCap = box.querySelector('figcaption');
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

  figures.forEach(function (fig) {
    var img = fig.querySelector('img');
    if (!img) return;

    // Only figures whose image actually loaded are zoomable — a missing file
    // renders as the hatch placeholder and must not open an empty overlay.
    function arm() {
      if (!img.naturalWidth) return;
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
