/* ============================================================
   PME — Shared site behaviours
   ============================================================ */
(function () {
  function ready(fn){ if(document.readyState!=='loading')fn(); else document.addEventListener('DOMContentLoaded',fn); }

  ready(function () {
    /* ---- mobile drawer ---- */
    var ham = document.querySelector('.hamburger');
    var drawer = document.querySelector('.drawer');
    if (ham && drawer) {
      var scrim = drawer.querySelector('.drawer-scrim');
      function toggle(open){ drawer.classList.toggle('open', open); document.body.style.overflow = open ? 'hidden' : ''; }
      ham.addEventListener('click', function(){ toggle(!drawer.classList.contains('open')); });
      if (scrim) scrim.addEventListener('click', function(){ toggle(false); });
      drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ toggle(false); }); });
    }

    /* ---- scroll reveal + counters (scroll-based: reliable in preview iframes) ---- */
    function inView(n, margin){
      var r = n.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * (margin || 0.92) && r.bottom > 0;
    }
    function runCount(n){
      var target = parseFloat(n.dataset.count), dur = 1500, start = performance.now();
      function step(now){
        var p = Math.min(1,(now-start)/dur), ease = 1-Math.pow(1-p,3);
        n.textContent = Math.round(target*ease).toLocaleString('id-ID');
        if(p<1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    function check(){
      document.querySelectorAll('.reveal:not(.in)').forEach(function(n){ if(inView(n)) n.classList.add('in'); });
      document.querySelectorAll('[data-count]:not([data-done])').forEach(function(n){ if(inView(n,0.85)){ n.setAttribute('data-done','1'); runCount(n); } });
    }
    var ticking = false;
    function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(function(){ check(); ticking = false; }); } }
    check();
    window.addEventListener('scroll', onScroll, { passive:true });
    window.addEventListener('resize', onScroll, { passive:true });
    /* frozen-timeline detection: if transitions aren't advancing (offscreen/background
       iframe), CSS transitions stay at frame 0 and content would be invisible.
       Detect it and snap everything visible. */
    function finalizeCounts(){
      document.querySelectorAll('[data-count]').forEach(function(n){
        n.setAttribute('data-done','1');
        n.textContent = Math.round(parseFloat(n.dataset.count)).toLocaleString('id-ID');
      });
    }
    setTimeout(function(){
      var probe = document.querySelector('.reveal.in');
      if(probe && parseFloat(getComputedStyle(probe).opacity) < 0.05){
        document.documentElement.classList.add('reveal-noanim');
        finalizeCounts();
      }
    }, 500);
    /* safety net: ensure nothing stays hidden */
    setTimeout(check, 400);
    setTimeout(function(){
      document.querySelectorAll('.reveal:not(.in)').forEach(function(n){ n.classList.add('in'); });
      var probe = document.querySelector('.reveal.in');
      if(probe && parseFloat(getComputedStyle(probe).opacity) < 0.05){
        document.documentElement.classList.add('reveal-noanim');
      }
      document.querySelectorAll('[data-count]:not([data-done])').forEach(function(n){
        n.textContent = Math.round(parseFloat(n.dataset.count)).toLocaleString('id-ID');
      });
    }, 2500);

    /* ---- hero slider (banner variant) ---- */
    document.querySelectorAll('[data-slider]').forEach(function(slider){
      var slides = slider.querySelectorAll('.hb-slide');
      var dots = slider.querySelectorAll('.hb-dot');
      var i = 0, timer;
      function go(n){
        i = (n + slides.length) % slides.length;
        slides.forEach(function(s,k){ s.classList.toggle('on', k===i); });
        dots.forEach(function(d,k){ d.classList.toggle('on', k===i); });
      }
      function next(){ go(i+1); }
      function reset(){ clearInterval(timer); timer = setInterval(next, 5000); }
      dots.forEach(function(d,k){ d.addEventListener('click', function(){ go(k); reset(); }); });
      var prev = slider.querySelector('.hb-prev'), nxt = slider.querySelector('.hb-next');
      if(prev) prev.addEventListener('click', function(){ go(i-1); reset(); });
      if(nxt) nxt.addEventListener('click', function(){ go(i+1); reset(); });
      go(0); reset();
    });

    /* ---- testimonial / simple carousels could hook here ---- */
  });
})();
