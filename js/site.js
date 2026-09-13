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
