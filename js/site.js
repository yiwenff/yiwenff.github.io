/* Yiwen Fang — site behaviour. No dependencies. Progressive: without JS the
   rail is simply always open and figures are plain images. */
(function () {
  'use strict';

  /* ---- left rail collapse, remembered per browser ---------------------- */
  var KEY = 'rail-collapsed';
  var body = document.body;

  function store(v) { try { localStorage.setItem(KEY, v ? '1' : '0'); } catch (e) {} }

  function setRail(collapsed, btn) {
    body.classList.toggle('rail-collapsed', collapsed);
    if (btn) {
      btn.setAttribute('aria-expanded', String(!collapsed));
      btn.querySelector('.lbl').textContent = collapsed ? '' : 'Menu';
      btn.title = collapsed ? 'Show menu' : 'Hide menu';
    }
  }

  var btn = document.querySelector('.railtoggle');
  if (btn) {
    setRail(body.classList.contains('rail-collapsed'), btn);
    btn.addEventListener('click', function () {
      var next = !body.classList.contains('rail-collapsed');
      setRail(next, btn);
      store(next);
    });
    // enable the width transition only after the initial state is painted
    setTimeout(function () { body.classList.add('rail-ready'); }, 0);
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
