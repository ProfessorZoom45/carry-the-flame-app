// Carry The Flame - Ember Background
// Lightweight canvas embers for the website/PWA.

(function(){
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;

  function makeCanvas(id, zIndex){
    let canvas = document.getElementById(id);
    if(!canvas){
      canvas = document.createElement('canvas');
      canvas.id = id;
      document.body.prepend(canvas);
    }
    Object.assign(canvas.style, {
      position: 'fixed',
      inset: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: String(zIndex || 0)
    });
    return canvas;
  }

  function boot(){
    const canvas = makeCanvas('ember-canvas', 0);
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = 1;
    let embers = [];

    function resize(){
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(28, Math.min(90, Math.floor(w / 18)));
      embers = Array.from({length: count}, makeEmber);
    }

    function makeEmber(){
      return {
        x: Math.random() * w,
        y: h * (0.65 + Math.random() * 0.35),
        r: 1 + Math.random() * 2.4,
        vy: -0.25 - Math.random() * 0.9,
        vx: -0.25 + Math.random() * 0.5,
        life: 0.35 + Math.random() * 0.65,
        flicker: Math.random() * Math.PI * 2
      };
    }

    function reset(e){
      Object.assign(e, makeEmber());
      e.y = h + Math.random() * 40;
    }

    function draw(){
      ctx.clearRect(0, 0, w, h);
      for(const e of embers){
        e.x += e.vx + Math.sin(Date.now()/800 + e.flicker) * 0.15;
        e.y += e.vy;
        e.life -= 0.0015;
        if(e.y < -20 || e.life <= 0 || e.x < -20 || e.x > w + 20) reset(e);

        const glow = Math.max(0, Math.min(1, e.life));
        const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 5);
        grad.addColorStop(0, `rgba(255, 210, 100, ${0.55 * glow})`);
        grad.addColorStop(0.35, `rgba(255, 106, 0, ${0.32 * glow})`);
        grad.addColorStop(1, 'rgba(255, 50, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize, {passive:true});
    resize();
    draw();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
