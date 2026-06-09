/* ============================================================
   PME — Vanilla Tweaks panel (works across all pages)
   Applies CSS vars + data-attrs on <html>, persists to localStorage,
   and follows the host edit-mode protocol so the toolbar toggle works.
   ============================================================ */
(function () {
  var LS = 'pme_tweaks_v1';

  var ACCENTS = {
    blue:  { label:'Biru',  a:'#1457B5', a6:'#0F4FA8', a7:'#0B3F8C', soft:'#E8F1FC', tint:'#F2F7FD' },
    teal:  { label:'Teal',  a:'#0E9E78', a6:'#0B8A68', a7:'#097256', soft:'#E2F6EF', tint:'#F1FBF7' },
    cyan:  { label:'Cyan',  a:'#0E9BB8', a6:'#0C879F', a7:'#0A7184', soft:'#E1F5FA', tint:'#F0FAFC' },
    navy:  { label:'Navy',  a:'#1B3A8A', a6:'#162F73', a7:'#11265E', soft:'#E7ECF8', tint:'#F2F5FB' }
  };
  var FONTS = {
    sora:    { label:'Sora',    head:"'Sora', system-ui, sans-serif",    body:"'Plus Jakarta Sans', system-ui, sans-serif" },
    manrope: { label:'Manrope', head:"'Manrope', system-ui, sans-serif", body:"'Manrope', system-ui, sans-serif" },
    archivo: { label:'Archivo', head:"'Archivo', system-ui, sans-serif", body:"'Plus Jakarta Sans', system-ui, sans-serif" }
  };
  var RADII = { soft:{label:'Soft',r:16,sm:10,lg:22}, sharp:{label:'Tajam',r:6,sm:5,lg:10}, round:{label:'Bulat',r:24,sm:16,lg:30} };

  var DEFAULTS = { accent:'blue', font:'sora', hero:'split', radius:'soft', shadow:1 };

  function load(){ try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(LS)||'{}')); } catch(e){ return Object.assign({},DEFAULTS); } }
  function save(v){ try { localStorage.setItem(LS, JSON.stringify(v)); } catch(e){} }

  var state = load();

  function apply(){
    var root = document.documentElement, s = state;
    var ac = ACCENTS[s.accent]||ACCENTS.blue;
    root.style.setProperty('--accent', ac.a);
    root.style.setProperty('--accent-600', ac.a6);
    root.style.setProperty('--accent-700', ac.a7);
    root.style.setProperty('--accent-soft', ac.soft);
    root.style.setProperty('--accent-tint', ac.tint);
    var f = FONTS[s.font]||FONTS.sora;
    root.style.setProperty('--font-head', f.head);
    root.style.setProperty('--font-body', f.body);
    var r = RADII[s.radius]||RADII.soft;
    root.style.setProperty('--radius', r.r+'px');
    root.style.setProperty('--radius-sm', r.sm+'px');
    root.style.setProperty('--radius-lg', r.lg+'px');
    root.style.setProperty('--shadow-strength', s.shadow);
    root.setAttribute('data-hero', s.hero);
    window.dispatchEvent(new CustomEvent('pme:tweak', { detail: Object.assign({}, s) }));
  }
  apply();

  // ---- panel UI ----
  var STYLE = '\
  .pmtw{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:272px;max-height:calc(100vh - 32px);\
    display:none;flex-direction:column;background:rgba(252,253,255,.82);color:#14202E;\
    -webkit-backdrop-filter:blur(22px) saturate(150%);backdrop-filter:blur(22px) saturate(150%);\
    border:.5px solid rgba(255,255,255,.7);border-radius:16px;\
    box-shadow:0 1px 0 rgba(255,255,255,.6) inset,0 14px 44px rgba(12,26,43,.22);\
    font:12px/1.45 "Plus Jakarta Sans",system-ui,sans-serif;overflow:hidden}\
  .pmtw.open{display:flex}\
  .pmtw-hd{display:flex;align-items:center;justify-content:space-between;padding:12px 10px 12px 16px;cursor:move;user-select:none}\
  .pmtw-hd b{font-size:13px;font-weight:700;font-family:"Sora",sans-serif}\
  .pmtw-hd .dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--accent,#1457B5);margin-right:8px}\
  .pmtw-x{border:0;background:transparent;color:rgba(20,32,46,.5);width:24px;height:24px;border-radius:7px;cursor:pointer;font-size:14px}\
  .pmtw-x:hover{background:rgba(0,0,0,.06);color:#14202E}\
  .pmtw-body{padding:2px 16px 16px;display:flex;flex-direction:column;gap:14px;overflow-y:auto}\
  .pmtw-sect{font-size:10.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(20,32,46,.45);font-family:"Sora",sans-serif}\
  .pmtw-row{display:flex;flex-direction:column;gap:7px}\
  .pmtw-seg{display:flex;padding:3px;border-radius:9px;background:rgba(12,26,43,.06);gap:3px}\
  .pmtw-seg button{flex:1;border:0;background:transparent;color:rgba(20,32,46,.62);font:inherit;font-weight:600;\
    padding:6px 4px;border-radius:6px;cursor:pointer;transition:.15s;font-size:11.5px}\
  .pmtw-seg button.on{background:#fff;color:#14202E;box-shadow:0 1px 3px rgba(0,0,0,.12)}\
  .pmtw-sw{display:flex;gap:8px}\
  .pmtw-sw button{flex:1;height:40px;border-radius:9px;border:0;cursor:pointer;position:relative;\
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.08);transition:transform .12s}\
  .pmtw-sw button:hover{transform:translateY(-1px)}\
  .pmtw-sw button.on{box-shadow:0 0 0 2px #14202E,0 2px 6px rgba(0,0,0,.18)}\
  .pmtw-sw button.on::after{content:"✓";position:absolute;inset:0;display:grid;place-items:center;color:#fff;font-size:13px;text-shadow:0 1px 2px rgba(0,0,0,.4)}\
  .pmtw-range{display:flex;align-items:center;gap:10px}\
  .pmtw-range input{flex:1;accent-color:var(--accent,#1457B5)}\
  .pmtw-range .v{font-variant-numeric:tabular-nums;color:rgba(20,32,46,.5);width:28px;text-align:right;font-size:11px}\
  .pmtw-lbl{font-weight:600;color:rgba(20,32,46,.7);font-size:11.5px}';

  function el(tag, cls, html){ var e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }

  var panel, isOpen=false;
  function build(){
    var st=el('style'); st.textContent=STYLE; document.head.appendChild(st);
    panel = el('div','pmtw');
    var hd = el('div','pmtw-hd','<b><span class="dot"></span>Tweaks</b>');
    var x = el('button','pmtw-x','✕'); x.onclick=dismiss; hd.appendChild(x);
    panel.appendChild(hd);
    var body = el('div','pmtw-body'); panel.appendChild(body);

    // accent swatches
    body.appendChild(seg('Warna aksen', null));
    var swWrap = el('div','pmtw-sw');
    Object.keys(ACCENTS).forEach(function(k){
      var b=el('button'); b.style.background=ACCENTS[k].a; b.title=ACCENTS[k].label;
      if(state.accent===k)b.classList.add('on');
      b.onclick=function(){ set('accent',k); swWrap.querySelectorAll('button').forEach(function(n){n.classList.remove('on')}); b.classList.add('on'); };
      swWrap.appendChild(b);
    });
    body.appendChild(swWrap);

    body.appendChild(segControl('Tipografi','font',FONTS));
    body.appendChild(segControl('Layout hero','hero',{ split:{label:'Split'}, slider:{label:'Banner'}, centered:{label:'Center'} }));
    body.appendChild(segControl('Sudut','radius',RADII));

    // shadow range
    var row=el('div','pmtw-row');
    row.appendChild(seg('Bayangan',null));
    var rg=el('div','pmtw-range');
    var inp=el('input'); inp.type='range'; inp.min='0'; inp.max='2'; inp.step='.1'; inp.value=state.shadow;
    var vv=el('span','v',(+state.shadow).toFixed(1));
    inp.oninput=function(){ vv.textContent=(+inp.value).toFixed(1); set('shadow',+inp.value); };
    rg.appendChild(inp); rg.appendChild(vv); row.appendChild(rg);
    body.appendChild(row);

    document.body.appendChild(panel);
    enableDrag(panel,hd);
  }
  function seg(label){ var s=el('div','pmtw-sect',label); return s; }
  function segControl(label,key,map){
    var row=el('div','pmtw-row');
    row.appendChild(seg(label));
    var sg=el('div','pmtw-seg');
    Object.keys(map).forEach(function(k){
      var b=el('button',state[key]===k?'on':'',map[k].label);
      b.onclick=function(){ set(key,k); sg.querySelectorAll('button').forEach(function(n){n.classList.remove('on')}); b.classList.add('on'); };
      sg.appendChild(b);
    });
    row.appendChild(sg);
    return row;
  }
  function set(k,v){ state[k]=v; save(state); apply();
    window.parent.postMessage({type:'__edit_mode_set_keys',edits:{}},'*'); }

  function enableDrag(p,handle){
    handle.addEventListener('mousedown',function(e){
      if(e.target.classList.contains('pmtw-x'))return;
      var r=p.getBoundingClientRect(); var sx=e.clientX, sy=e.clientY;
      var sr=window.innerWidth-r.right, sb=window.innerHeight-r.bottom;
      function mv(ev){ p.style.right=Math.max(8,sr-(ev.clientX-sx))+'px'; p.style.bottom=Math.max(8,sb-(ev.clientY-sy))+'px'; }
      function up(){ window.removeEventListener('mousemove',mv); window.removeEventListener('mouseup',up); }
      window.addEventListener('mousemove',mv); window.addEventListener('mouseup',up);
    });
  }

  function open(){ if(!panel)build(); isOpen=true; panel.classList.add('open'); }
  function close(){ if(panel){isOpen=false;panel.classList.remove('open');} }
  function dismiss(){ close(); window.parent.postMessage({type:'__edit_mode_dismissed'},'*'); }

  window.addEventListener('message',function(e){
    var t=e&&e.data&&e.data.type;
    if(t==='__activate_edit_mode')open();
    else if(t==='__deactivate_edit_mode')close();
  });
  window.parent.postMessage({type:'__edit_mode_available'},'*');
})();
