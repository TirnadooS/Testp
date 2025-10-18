// basic interactions: burger, booking modal, hero autoplay fallback, booking form
document.addEventListener('DOMContentLoaded', ()=>{

  // YEAR
  document.getElementById('year').textContent = new Date().getFullYear();

  // BURGER
  const burger = document.getElementById('burger');
  const navList = document.getElementById('navList');
  if(burger){
    burger.addEventListener('click', ()=>{
      const open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      navList.style.display = open ? '' : 'flex';
    });
  }

  // MODAL HANDLING
  const bookingModal = document.getElementById('bookingModal');
  const openBooking = document.querySelectorAll('#openBookingBtn, #openBookingBtn2, #heroBook, #openBookingBtn, #openBookingBtn2, #heroBook');
  const modalCancel = document.getElementById('modalCancel');
  const closeModalBtn = document.getElementById('closeModal');

  function openModal(){
    bookingModal.style.display = 'flex';
    bookingModal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    bookingModal.style.display = 'none';
    bookingModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  openBooking.forEach(btn=>{ if(btn) btn.addEventListener('click', (e)=>{ e.preventDefault(); openModal(); }); });
  if(modalCancel) modalCancel.addEventListener('click', closeModal);
  if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  // Booking form (front-end demo)
  const bookingForm = document.getElementById('bookingForm');
  if(bookingForm){
    bookingForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(bookingForm);
      const name = data.get('name') || 'Клиент';
      const date = data.get('date');
      const time = data.get('time');
      const messageEl = document.getElementById('bookingMsg');
      messageEl.style.display = 'block';
      messageEl.textContent = `Готово — ${name}, запись на ${date} в ${time} принята. Мы свяжемся для подтверждения.`;
      setTimeout(()=>{
        bookingForm.reset();
      },1400);
      // Здесь можно отправлять fetch() на сервер
    });
  }

  // HERO VIDEO: fallback for devices/browsers where autoplay is blocked.
  const heroVideo = document.getElementById('heroVideo');
  function ensureHeroPlayback(){
    if(!heroVideo) return;
    const playPromise = heroVideo.play();
    if(playPromise !== undefined){
      playPromise.catch(()=> {
        // autoplay blocked -> hide video and use poster as background
        heroVideo.style.display = 'none';
        document.querySelector('.hero').style.backgroundImage = `url('${heroVideo.getAttribute('poster') || 'assets/hero-poster.jpg'}')`;
        document.querySelector('.hero').style.backgroundSize = 'cover';
        document.querySelector('.hero').style.backgroundPosition = 'center';
      });
    }
  }
  ensureHeroPlayback();

  // Close modal/lightbox on ESC
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      if(bookingModal.style.display === 'flex') closeModal();
    }
  });

});
