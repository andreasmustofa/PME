/* ============================================================
   PME — Product data + card renderer (shared)
   ============================================================ */
(function () {
  // simple inline AC unit illustration (placeholder for real product photo)
  var AC_SVG = '<svg class="acimg" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">\
    <rect x="14" y="30" width="172" height="54" rx="12" fill="#fff" stroke="currentColor" stroke-opacity="0.35" stroke-width="2"/>\
    <rect x="14" y="62" width="172" height="22" rx="10" fill="currentColor" fill-opacity="0.06"/>\
    <path d="M26 74h148" stroke="currentColor" stroke-opacity="0.5" stroke-width="2.4" stroke-linecap="round"/>\
    <circle cx="160" cy="46" r="5" fill="currentColor" fill-opacity="0.45"/>\
    <path d="M40 98c4 6 4 10 0 16M70 98c-4 6-4 10 0 16M100 98c4 6 4 10 0 16M130 98c-4 6-4 10 0 16M160 98c4 6 4 10 0 16" stroke="currentColor" stroke-opacity="0.3" stroke-width="2.4" stroke-linecap="round"/>\
  </svg>';

  function rupiah(n){ return 'Rp ' + n.toLocaleString('id-ID'); }

  var P = [
    { brand:'Samsung', name:'AC Cassette Inverter 1 Way Wind-Free 1½ PK — AC035TN1DKC/EA', pk:'1.5 PK', type:'INVERTER', old:13800000, price:12539000, disc:9, tag:'best' },
    { brand:'Daikin',  name:'AC Split Wall Mounted Super PCB Titanium 1 PK — STKQ25UV', pk:'1 PK', type:'INVERTER', old:5650000, price:4990000, disc:12, tag:'new' },
    { brand:'Gree',    name:'AC Split Inverter Fairy 1 PK R32 — GWC09FB', pk:'1 PK', type:'INVERTER', old:4350000, price:3899000, disc:10, tag:'best' },
    { brand:'Panasonic', name:'AC Split Si-Biru Nanoe X 1½ PK — CS-XU12', pk:'1.5 PK', type:'INVERTER', old:7200000, price:6549000, disc:9, tag:'' },
    { brand:'LG',      name:'AC Floor Standing Gold Fin 2 PK — APUQ18', pk:'2 PK', type:'INVERTER', old:17170000, price:16645000, disc:3, tag:'new' },
    { brand:'Daikin',  name:'AC Cassette 4 Way 2½ PK — FCFC60', pk:'2.5 PK', type:'STANDARD', old:21300000, price:19950000, disc:6, tag:'' },
    { brand:'Mitsubishi', name:'AC Ceiling Suspended 3 PK — PCY-P30', pk:'3 PK', type:'INVERTER', old:24500000, price:22890000, disc:7, tag:'best' },
    { brand:'Midea',   name:'AC Split Portable 1 PK — MPPD-09', pk:'1 PK', type:'STANDARD', old:3950000, price:3450000, disc:13, tag:'new' }
  ];

  window.PME_PRODUCTS = P;
  window.pmeRupiah = rupiah;
  window.pmeProductCard = function(p){
    var badge = p.tag==='best' ? '<span class="badge badge-best">Best Seller</span>'
              : p.tag==='new' ? '<span class="badge badge-new">New Arrivals</span>' : '';
    return '<article class="prod-card reveal">\
      <div class="prod-media">'+badge+'\
        <button class="like" aria-label="Simpan"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5C2 12 5 14.5 12 21c2.5-2.3 4.5-4.2 6-6z"/></svg></button>'
        +AC_SVG+'\
      </div>\
      <div class="prod-body">\
        <span class="prod-brand">'+p.brand+'</span>\
        <div class="prod-name">'+p.name+'</div>\
        <div class="prod-meta"><span class="tag-pk">'+p.pk+'</span><span class="tag-inv">'+p.type+'</span></div>\
        <div class="prod-foot">\
          <div class="prod-price"><div class="old">'+rupiah(p.old)+'</div><div><span class="now">'+rupiah(p.price)+'</span><span class="disc">(-'+p.disc+'%)</span></div></div>\
          <a class="prod-buy" href="produk.html"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M12 5v14"/></svg>Beli</a>\
        </div>\
      </div>\
    </article>';
  };
})();
