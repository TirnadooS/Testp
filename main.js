// Main interactions: burger, modal, hero autoplay fallback, booking form (frontend demo)
document.addEventListener('DOMContentLoaded', function () {

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Burger menu (mobile)
  const burger = document.getElementById('burger');
  const navList = document.getElementById('navList');
  if (burger && navList) {
    burger.addEventListener('click', function () {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      navList.style.display = expanded ? '' : 'flex';
    });
  }

  // Modal open/close
  const bookingModal = document.getElementById('bookingModal');
  const openBookingButtons = document.querySelectorAll('#openBooking, #heroBook');
  const cancelBtn = document.getElementById('cancelBtn');

  function openModal() {
    if (!bookingModal) return;
    bookingModal.style.display = 'flex';
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!bookingModal) return;
    bookingModal.style.display = 'none';
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  openBookingButtons.forEach(b => b && b.addEventListener('click', function (e) { e.preventDefault(); openModal(); }));
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // Booking form (frontend demo)
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const fd = new FormData(bookingForm);
      const name = fd.get('name') || 'Клиент';
      const date = fd.get('date') || '';
      const time = fd.get('time') || '';
      const msg = document.getElementById('bookingMsg');
      if (msg) {
        msg.style.display = 'block';
        msg.textContent = `Готово — ${name}, запись на ${date} в ${time} принята. Мы свяжемся для подтверждения.`;
      }
      bookingForm.reset();
      // TODO: отправить на сервер (fetch POST) или интеграцию с Google Calendar
    });
  }

  // HERO autoplay fallback
  const heroVideo = document.getElementById('heroVideo');
  const poster = heroVideo ? heroVideo.getAttribute('poster') : null;
  function ensureHeroPlayback() {
    if (!heroVideo) return;
    const p = heroVideo.play();
    if (p !== undefined) {
      p.then(() => {
        heroVideo.style.display = 'block';
      }).catch(() => {
        // autoplay blocked -> hide video and set poster as background on .hero
        const hero = document.querySelector('.hero');
        if (hero) {
          heroVideo.style.display = 'none';
          hero.style.backgroundImage = `url('${poster || 'assets/hero-poster.jpg'}')`;
          hero.style.backgroundSize = 'cover';
          hero.style.backgroundPosition = 'center';
        }
      });
    }
  }
  ensureHeroPlayback();
});
