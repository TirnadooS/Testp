document.addEventListener('DOMContentLoaded', ()=>{

  // Year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Burger menu toggle
  const burger = document.getElementById('burger');
  const navList = document.getElementById('navList');
  if(burger){
    burger.addEventListener('click', ()=> {
      navList.style.display = navList.style.display === 'flex' ? '' : 'flex';
    });
  }

  // Booking modal open/close
  const modal = document.getElementById('bookingModal');
  const openBtns = document.querySelectorAll('#openBooking, #heroBook');
  const cancel = document.getElementById('cancelBtn');
  const closeBtn = document.getElementById('closeModal');

  function openModal(){ if(modal){ modal.style.display='flex'; modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; } }
  function closeModal(){ if(modal){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; } }

  openBtns.forEach(b => b && b.addEventListener('click', e => { e.preventDefault(); openModal(); }));
  if(cancel) cancel.addEventListener('click', closeModal);
  if(closeBtn) closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

  // Hero: try autoplay; if blocked, hide video and show poster (robust)
  const heroVideo = document.getElementById('heroVideo');
  const heroPoster = document.getElementById('heroPoster');
  if(heroVideo){
    const playPromise = heroVideo.play();
    if(playPromise !== undefined){
      playPromise.then(()=> {
        // autoplay worked: ensure poster hidden
        if(heroPoster) heroPoster.style.display = 'none';
        heroVideo.style.display = 'block';
      }).catch(()=> {
        // blocked: hide video & show poster bg
        heroVideo.style.display = 'none';
        if(heroPoster){ heroPoster.style.display = 'block'; }
      });
    } else {
      // no promise support — keep poster hidden
      if(heroPoster) heroPoster.style.display = 'none';
    }

    heroVideo.addEventListener('error', ()=> {
      heroVideo.style.display = 'none';
      if(heroPoster) heroPoster.style.display = 'block';
    });
  }

  // Simple gallery lightbox (small, vanilla)
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', ()=> {
      const overlay = document.createElement('div');
      overlay.style.position='fixed'; overlay.style.inset=0; overlay.style.background='rgba(0,0,0,0.85)'; overlay.style.display='grid'; overlay.style.placeItems='center'; overlay.style.zIndex=2000;
      const clone = img.cloneNode(true);
      clone.style.maxWidth='92%'; clone.style.maxHeight='92%'; clone.style.boxShadow='0 30px 90px rgba(0,0,0,0.8)';
      overlay.appendChild(clone);
      overlay.addEventListener('click', ()=> document.body.removeChild(overlay));
      document.body.appendChild(overlay);
    });
  });

});
