const icons = () => window.lucide?.createIcons({ attrs: { 'stroke-width': 1.5 } });
icons();
const menuButton = document.querySelector('#menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'メニューを開く');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  mobileNav.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
});
mobileNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); } });
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
const dialog = document.querySelector('#film-dialog');
const player = document.querySelector('#film-player');
let filmTrigger;
document.addEventListener('click', event => {
  const link = event.target.closest('[data-film]');
  if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  filmTrigger = link;
  document.querySelector('#film-title').textContent = link.dataset.title;
  document.querySelector('#youtube-fallback').href = link.href;
  const iframe = document.createElement('iframe');
  iframe.title = link.dataset.title;
  iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(link.dataset.film)}?autoplay=1&rel=0&playsinline=1`;
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;
  player.replaceChildren(iframe);
  dialog.showModal();
  document.body.classList.add('modal-open');
  document.querySelector('#film-close').focus();
});
document.querySelector('#film-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => { player.replaceChildren(); document.body.classList.remove('modal-open'); filmTrigger?.focus({ preventScroll: true }); });
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('#motion-toggle');
let motionPaused = reducedMotion.matches;
function updateMotion() {
  document.querySelector('.hero').classList.toggle('is-paused', motionPaused);
  motionButton.setAttribute('aria-pressed', String(motionPaused));
  const label = motionPaused ? '背景の動きを再開' : '背景の動きを一時停止';
  motionButton.setAttribute('aria-label', label);
  motionButton.title = label;
  motionButton.innerHTML = `<i data-lucide="${motionPaused ? 'play' : 'pause'}" aria-hidden="true"></i>`;
  icons();
}
motionButton.addEventListener('click', () => { motionPaused = !motionPaused; updateMotion(); });
reducedMotion.addEventListener('change', event => { motionPaused = event.matches; updateMotion(); });
updateMotion();
