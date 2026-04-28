// Phase 1: app shell behaviors (menu, PWA install, service worker)
(function(){
  const menuBtn = document.querySelector('.menu-button');
  const nav = document.getElementById('siteNav');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // PWA install prompt
  let deferredPrompt = null;
  const installBtn = document.getElementById('installAppButton');

  window.addEventListener('beforeinstallprompt', (e)=>{
    e.preventDefault();
    deferredPrompt = e;
    if(installBtn){
      installBtn.classList.remove('hidden');
      installBtn.addEventListener('click', async ()=>{
        installBtn.disabled = true;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        installBtn.classList.add('hidden');
        installBtn.disabled = false;
        console.log('Install outcome:', outcome);
      }, { once:true });
    }
  });

  // Service worker
  if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
      navigator.serviceWorker.register('service-worker.js')
        .then(()=>console.log('SW registered'))
        .catch(err=>console.warn('SW failed', err));
    });
  }
})();
