/* ===== Config: edit these ===== */
const CFG = {
  names: 'Abe & Collyn',                 // flag: prompt says "Aba", logo reads "Abe"
  date: '2027-01-21T17:30:00+08:00',     // ceremony time is a placeholder
  guest: 'Tita Baby'
};

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const pages = $$('.pg'), dr = $('#dr');
let cur = 0, manualTheme = false;

/* ===== Custom-drawn SVG icons (no emoji / no icon fonts) ===== */
const IC = {
  map:'<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14"/>',
  note:'<path d="M9 18V5l10-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  ar:'<path d="M4 12h15M13 6l6 6-6 6"/>', al:'<path d="M20 12H5M11 6l-6 6 6 6"/>',
  plane:'<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
  car:'<path d="M3 15v-3l2-5h14l2 5v3zM5 15v3h3v-3M16 15v3h3v-3"/>',
  bus:'<rect x="4" y="3" width="16" height="15" rx="2"/><path d="M4 11h16M7 21v-3M17 21v-3"/><circle cx="8" cy="14.5" r=".8"/><circle cx="16" cy="14.5" r=".8"/>',
  pin:'<path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  check:'<path d="M4 12l5 5L20 6"/>',
  heart:'<path d="M12 21C4 14 3 9 6 6.5S11 5 12 8c1-3 4.5-3.5 6-1.5S20 14 12 21z"/>',
  close:'<path d="M5 5l14 14M19 5L5 19"/>', pause:'<path d="M8 5v14M16 5v14"/>', play:'<path d="M7 4l13 8-13 8z"/>',
  bed:'<path d="M3 18V6M3 14h18v4M21 14v-3a3 3 0 00-3-3h-8v6"/><circle cx="6.5" cy="11" r="1.5"/>',
  minus:'<path d="M5 12h14"/>', plus:'<path d="M5 12h14M12 5v14"/>'
};
const icons = root => (root || document).querySelectorAll('i[data-i]').forEach(e => {
  e.innerHTML = `<svg class="ic" viewBox="0 0 24 24">${IC[e.dataset.i]}</svg>`; e.removeAttribute('data-i');
});

/* ===== Navigation ===== */
const names = pages.map(p => p.dataset.n);
function go(i) {
  cur = Math.max(0, Math.min(pages.length - 1, i));
  pages.forEach((p, j) => p.classList.toggle('on', j === cur));
  if (!manualTheme) document.body.classList.toggle('dark', pages[cur].dataset.d === '1');
  dr.classList.remove('o');
  $('#pv').style.visibility = cur ? 'visible' : 'hidden';
  $('#nx').style.display = cur === 0 ? 'none' : '';
  $$('#dir li').forEach((li, j) => li.classList.toggle('here', j === cur));
  if (cur === 5) runBoard();
  if (cur === 9) { $('#crIn').style.animation = 'none'; void $('#crIn').offsetWidth; $('#crIn').style.animation = ''; }
}
$('#nx').onclick = () => go(cur + 1); $('#pv').onclick = () => go(cur - 1);
addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(cur + 1); if (e.key === 'ArrowLeft') go(cur - 1); });
$$('[data-go]').forEach(b => b.onclick = () => go(+b.dataset.go));
$('#replay').onclick = $('#replay2').onclick = () => { $('#ps').classList.remove('f'); $('#boarding').classList.remove('hid'); $('#invite').classList.add('hid'); go(0); };

/* ===== Drawer / modal / table finder ===== */
$('#openMap').onclick = () => dr.classList.add('o'); $('#drX').onclick = () => dr.classList.remove('o');
$('#mapB').onclick = () => $('#dir').scrollIntoView({ behavior: 'smooth' });
$('#dir').innerHTML = names.map((n, i) => `<li><button data-i="${i}">${n}<span class="you">you are here</span></button></li>`).join('');
$('#dir').onclick = e => { const b = e.target.closest('button'); if (b) go(+b.dataset.i); };
$('#chartT').onclick = () => $('#chart').classList.toggle('hid');
$('#tf').onclick = () => { const v = $('#tb').value.trim(); $('#tr').textContent = v ? `${v}: Table 5 (sample, real seating to be added)` : ''; };
$('#inf').onclick = () => $('#modal').classList.remove('hid'); $('#mX').onclick = () => $('#modal').classList.add('hid');

/* ===== Theme switcher (bottom-left) ===== */
const THEMES = [['linen', '#F4EFE6'], ['sage', '#9caf88'], ['rose', '#e6bfb6'], ['navy', '#1d3466']];
$('#sw').innerHTML = THEMES.map(t => `<button data-t="${t[0]}" style="background:${t[1]}" aria-label="${t[0]} theme"></button>`).join('');
$('#sw').onclick = e => { const t = e.target.dataset.t; if (t) document.documentElement.dataset.t = t; };

/* ===== Prologue ===== */
function openTicket() {
  const p = $('#ps'); p.classList.add('f');
  setTimeout(() => { $('#boarding').classList.add('hid'); $('#invite').classList.remove('hid'); }, 800);
}
$('#ps').onclick = openTicket; $('#ps').onkeydown = e => e.key === 'Enter' && openTicket();
$('#justD').onclick = () => dr.classList.add('o');

/* ===== Plants (swaying vector grass) ===== */
$('#plants').innerHTML = [...Array(40)].map((_, i) => { const x = i * 30 + 8, h = 30 + (i * 37 % 50); return `<path d="M${x} 120q${i % 2 ? 8 : -8} ${-h / 2} 0 ${-h}" stroke-width="2" style="animation-delay:${-(i % 7)}s"/>`; }).join('');

/* ===== Chapter 1: planes ===== */
{
  const sky = $('#sky'), p1 = $('#p1'), p2 = $('#p2'); let locked = false;
  const place = (el, x, y) => { el.style.left = x + 'px'; el.style.top = y + 'px'; };
  const reset = () => { place(p1, 20, 40); place(p2, sky.clientWidth - 90, 170); };
  const lock = () => { locked = true; const cx = sky.clientWidth / 2 - 28; place(p1, cx - 22, 105); place(p2, cx + 22, 105); $('#lockH').classList.add('on'); };
  $('#bring').onclick = lock; new ResizeObserver(() => !locked && reset()).observe(sky);
  [p1, p2].forEach(el => {
    el.onpointerdown = e => {
      if (locked) return; el.setPointerCapture(e.pointerId); el.style.transition = 'none';
      const r = sky.getBoundingClientRect(), ox = e.clientX - el.offsetLeft - r.left, oy = e.clientY - el.offsetTop - r.top;
      el.onpointermove = m => place(el, m.clientX - r.left - ox, m.clientY - r.top - oy);
      el.onpointerup = () => { el.onpointermove = null; el.style.transition = ''; if (Math.hypot(p1.offsetLeft - p2.offsetLeft, p1.offsetTop - p2.offsetTop) < 90) lock(); };
    };
  });
  reset();
}

/* ===== Chapter 2: proposal ===== */
{
  $('#stars').innerHTML = [...Array(40)].map((_, i) => `<circle cx="${(i * 97) % 400}" cy="${(i * 53) % 90}" r="${i % 3 ? .8 : 1.4}" fill="#F8F5EE" style="animation-delay:${-(i % 5)}s"/>`).join('');
  $('#candles').innerHTML = [...Array(7)].map(() => '<span class="cd1"></span>').join('');
  let n = 0;
  const light = e => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el && el.classList.contains('cd1') && !el.classList.contains('l')) {
      setTimeout(() => el.classList.add('l'), n++ % 3 * 120);
      for (let k = 0; k < 8; k++) { const s = document.createElement('span'); s.className = 'spark'; s.style.left = el.offsetLeft + 6 + Math.random() * 12 + 'px'; s.style.bottom = '70px'; s.style.animationDelay = Math.random() * .6 + 's'; $('#night').append(s); setTimeout(() => s.remove(), 2200); }
    }
  };
  $('#night').onpointermove = light; $('#night').onclick = light;
}

/* ===== Chapter 3: polaroids ===== */
{
  const caps = ['First hello', 'Road trip', 'Coffee run', 'Sunday walk', 'Our song', 'Plane seats', 'Sunset', 'Lazy day', 'Birthday', 'Late night', 'Adventure', 'Yes!'];
  const dk = $('#deck'); let order = [...Array(12).keys()], sp = false;
  caps.forEach((c, n) => {
    const e = document.createElement('div'); e.className = 'po';
    e.innerHTML = `<i style="background:linear-gradient(135deg,hsl(${200 + (n % 4) * 14} 30% 72%),hsl(${35 + (n % 3) * 6} 40% 55%))"></i>${c}`;
    let x0 = 0;
    e.onpointerdown = ev => x0 = ev.clientX;
    e.onpointerup = ev => {
      if (sp) { $('#lb').innerHTML = `<div><i style="background:${e.firstChild.style.background}"></i>${c}</div>`; $('#lb').classList.remove('hid'); return; }
      if (order[0] === n && Math.abs(ev.clientX - x0) > 30 || order[0] === n && Math.abs(ev.clientX - x0) < 6) { order.push(order.shift()); lay(); }
    };
    dk.append(e);
  });
  $('#lb').onclick = () => $('#lb').classList.add('hid');
  function lay() {
    order.forEach((n, k) => {
      const e = dk.children[n]; e.style.zIndex = 12 - k;
      if (sp) { e.style.transform = 'none'; e.style.left = 16 + (n % 4) * 22 + '%'; e.style.top = 18 + Math.floor(n / 4) * 32 + '%'; e.style.width = '96px'; e.style.height = '120px'; e.style.margin = '-60px 0 0 -48px'; }
      else { e.style.left = e.style.top = '50%'; e.style.width = e.style.height = ''; e.style.margin = ''; e.style.transform = `rotate(${(n % 5 - 2) * 5}deg) translate(${(n % 3 - 1) * 6}px,${k ? 0 : -4}px)`; }
    });
  }
  $('#spread').onclick = function () { sp = !sp; this.textContent = sp ? 'Stack them up' : 'Spread them out'; lay(); };
  lay();
}

/* ===== Chapter 4: countdown, calendar, scratch ===== */
{
  const T = new Date(CFG.date);
  const tick = () => { const d = Math.max(0, T - Date.now()) / 1e3 | 0; $('#cd').innerHTML = [['Days', d / 86400], ['Hours', d % 86400 / 3600], ['Minutes', d % 3600 / 60], ['Seconds', d % 60]].map(a => `<div><b>${String(a[1] | 0).padStart(2, '0')}</b><small>${a[0].toUpperCase()}</small></div>`).join(''); };
  tick(); setInterval(tick, 1000); icons();
  $('#ics').href = 'data:text/calendar;charset=utf8,' + encodeURIComponent('BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Abe & Collyn Wedding\nDTSTART:20270121T093000Z\nDTEND:20270121T150000Z\nLOCATION:Antipolo City\nEND:VEVENT\nEND:VCALENDAR');
  const c = $('#scr'), x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 280, 140);
  g.addColorStop(0, '#d9b45f'); g.addColorStop(.5, '#f6dfa0'); g.addColorStop(1, '#b8924a'); x.fillStyle = g; x.fillRect(0, 0, 280, 140);
  let down = false;
  c.onpointerdown = e => { down = true; c.setPointerCapture(e.pointerId); }; c.onpointerup = () => down = false;
  c.onpointermove = e => { if (!down) return; const r = c.getBoundingClientRect(); x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc((e.clientX - r.left) * 280 / r.width, (e.clientY - r.top) * 140 / r.height, 16, 0, 7); x.fill(); };
}

/* ===== Chapter 5: split-flap departure board + sun ===== */
const PROG = [['4:15 PM', 'PHOTOS & COCKTAILS', 'CHANDELIER'], ['5:30 PM', 'CEREMONY', 'THE PARISH'], ['7:00 PM', 'RECEPTION', 'CHANDELIER']]; // times from brief, confirm with couple
const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:&. ', W = [8, 18, 12];
$('#rows').innerHTML = PROG.map(r => `<div class="rw">${r.map((v, c) => `<div class="fg">${[...Array(W[c])].map(() => '<span class="fc"> </span>').join('')}</div>`).join('')}</div>`).join('');
function runBoard() {
  $$('#rows .rw').forEach((row, ri) => row.querySelectorAll('.fg').forEach((fg, ci) => {
    const txt = PROG[ri][ci].padEnd(W[ci]);
    [...fg.children].forEach((cell, k) => {
      let f = 0; const max = 8 + k * 2 + ri * 6; cell.classList.add('sp');
      const t = setInterval(() => { cell.textContent = f++ < max ? CH[Math.random() * CH.length | 0] : (clearInterval(t), cell.classList.remove('sp'), txt[k]); }, 60);
    });
  }));
}
{
  const svg = $('#sunsvg'), arc = $('#arc'), L = arc.getTotalLength();
  const setSun = t => { t = Math.max(0, Math.min(1, t)); const p = arc.getPointAtLength(t * L); $('#sun').setAttribute('transform', `translate(${p.x},${p.y})`); $$('#rows .rw').forEach((r, i) => r.classList.toggle('act', i === Math.min(2, t * 3 | 0))); };
  const mv = e => { const r = svg.getBoundingClientRect(); setSun((e.clientX - r.left) / r.width * 300 / 300 - .03); };
  let d = false; svg.onpointerdown = e => { d = true; svg.setPointerCapture(e.pointerId); mv(e); }; svg.onpointermove = e => d && mv(e); svg.onpointerup = () => d = false; setSun(.1);
}

/* ===== Chapter 6: journey ===== */
{
  const J = { 'By car': ['car', 'Use Waze or Google Maps to the Parish on Hinulugang Taktak Rd., Brgy. Dela Paz, then to The Chandelier Events Place on San Jose Ext. St. Allow extra time for Antipolo traffic. Parking details to be confirmed.'], 'By bus': ['bus', 'Take a bus or UV Express toward Antipolo, then a tricycle or jeep to Brgy. Dela Paz. (Please confirm routes before the day.)'], 'By Grab': ['car', 'Set your drop-off to the Parish of the Immaculate Heart of Mary and ask your driver to wait for the reception transfer.'] };
  $('#tabs').innerHTML = Object.keys(J).map(k => `<button class="b o" data-k="${k}"><i data-i="${J[k][0]}"></i>${k}</button>`).join('');
  const show = k => { $('#tp').textContent = J[k][1]; $$('#tabs .b').forEach(b => b.classList.toggle('o', b.dataset.k !== k)); };
  $('#tabs').onclick = e => { const b = e.target.closest('button'); if (b) show(b.dataset.k); }; show('By car');
  const rd = $('#rd'), L = rd.getTotalLength(), svg = $('#road');
  const put = t => { t = Math.max(0, Math.min(1, t)); const p = rd.getPointAtLength(t * L); $('#carG').setAttribute('transform', `translate(${p.x},${p.y})`); };
  let d = false, t = 0; const mv = e => { const r = svg.getBoundingClientRect(); put((e.clientX - r.left) / r.width * 320 / 320); };
  svg.onpointerdown = e => { d = true; svg.setPointerCapture(e.pointerId); mv(e); }; svg.onpointermove = e => d && mv(e); svg.onpointerup = () => d = false;
  (function idle() { if (!d) { t = (t + .0015) % 1; put(t); } requestAnimationFrame(idle); })();
}

/* ===== Chapter 7: hotels (placeholders) ===== */
$('#hotels').innerHTML = [1, 2, 3].map(n => `<div class="card hotel"><i data-i="bed"></i><h3>Hotel ${n}</h3><p class="sm">Name, rate and booking link to be added.</p></div>`).join('');

/* ===== Chapter 8: wardrobe ===== */
{
  const S = [['Sage', '#9caf88'], ['Cream', '#efe3c8'], ['Gold', '#c9a24b'], ['Dusty rose', '#d4a5a5'], ['Navy', '#1d3466'], ['Light green', '#bcd6b0']];
  $('#swatches').innerHTML = S.map(s => `<span title="${s[0]}" style="background:${s[1]}" data-c="${s[1]}"></span>`).join('');
  $('#swatches').onclick = e => { const c = e.target.dataset.c; if (c) $$('.gar').forEach(g => g.style.fill = c); };
}

/* ===== Chapter 9: credits ===== */
{
  const C = [['The couple', CFG.names], ['Parents of the groom', 'To be added'], ['Parents of the bride', 'To be added'], ['Principal sponsors', 'To be added'], ['Best man and maid of honor', 'To be added'], ['Bridesmaids and groomsmen', 'To be added']];
  $('#crIn').innerHTML = C.map(c => `<em>${c[0]}</em><strong>${c[1].replace('&', '&amp;')}</strong>`).join('');
  $('#pc').onclick = function () { const p = $('#cr').classList.toggle('p'); this.innerHTML = `<i data-i="${p ? 'play' : 'pause'}"></i><span>${p ? 'Resume' : 'Pause'} the credits</span>`; icons(this); };
}

/* ===== Chapter 10: RSVP ===== */
{
  let n = 2; $('#mn').onclick = () => $('#gc').textContent = n = Math.max(1, n - 1); $('#pl').onclick = () => $('#gc').textContent = ++n;
  $$('#rv [data-a]').forEach(b => b.onclick = () => $$('#rv [data-a]').forEach(x => x.classList.toggle('o', x !== b)));
  $('#snd').onclick = () => { $('#ok').classList.remove('hid'); $('#snd').firstChild.textContent = 'Sent'; /* demo only: connect a form backend to receive replies */ };
}

/* ===== Chapter 11: gift ribbon ===== */
{
  const qr = $('#qr'); let s = ''; for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) { const f = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13); if (f ? (x % 6 === 0 || y % 6 === 0 || (x % 6 > 1 && x % 6 < 5 && y % 6 > 1 && y % 6 < 5 && x < 7 + 14 * 0)) || ((x + y) % 5 === 0 && false) : (x * 7 + y * 13) % 5 < 2) s += `<rect x="${x}" y="${y}" width="1" height="1"/>`; }
  qr.innerHTML = `<g fill="currentColor">${s}</g>`;
  const open = () => { $('#gift').classList.add('open'); setTimeout(() => $('#gd').classList.remove('hid'), 700); };
  $('#pull').onclick = open; $('#gift').onclick = open;
}

/* ===== Chapter 12: chat FAQ ===== */
{
  const F = [['Can I bring my kids?', 'We love your little ones, but please check your invitation for the seats reserved for you.'], ['Can I bring a plus-one?', 'Seats are reserved per invitation. Please see your RSVP.'], ['Where do I park?', 'Parking details will be shared closer to the date.'], ["What's the weather like?", 'January in Antipolo is usually dry and mild. Bring a light layer for the evening.']];
  $('#bubs').innerHTML = F.map((f, i) => `<button class="bub" data-i="${i}">${f[0]}</button>`).join('');
  $('#bubs').onclick = e => {
    const i = e.target.dataset.i; if (i == null) return; e.target.remove();
    const log = $('#log'); log.insertAdjacentHTML('beforeend', `<div class="q">${F[i][0]}</div><div class="a dots"><span></span><span></span><span></span></div>`);
    const t = log.lastChild; log.scrollTop = 1e5;
    setTimeout(() => { t.classList.remove('dots'); t.textContent = F[i][1]; log.scrollTop = 1e5; }, 1100);
  };
}

/* ===== Audio: soft synthesized pad with fade ===== */
{
  let ac, g, on = false;
  $('#au').onclick = () => {
    if (!ac) { ac = new AudioContext(); g = ac.createGain(); g.gain.value = 0; g.connect(ac.destination); [261.6, 329.6, 392].forEach(f => { const o = ac.createOscillator(); o.frequency.value = f; o.connect(g); o.start(); }); }
    on = !on; g.gain.linearRampToValueAtTime(on ? .04 : 0, ac.currentTime + 2); $('#au').style.opacity = on ? 1 : .6;
  };
}

/* ===== Ambient particles (gold stars on dark, soft dust on light) ===== */
{
  const cv = $('#fx'), cx = cv.getContext('2d'); let W, H;
  const ds = [...Array(80)].map(() => ({ x: Math.random(), y: Math.random(), r: Math.random() * 2 + .5, v: Math.random() * .0003 + .0001, p: Math.random() * 6 }));
  const rs = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; }; rs(); addEventListener('resize', rs);
  (function f(t) {
    cx.clearRect(0, 0, W, H); const d = document.body.classList.contains('dark');
    ds.forEach(o => { o.y -= o.v; o.x += Math.sin(t / 3000 + o.p) * .0002; if (o.y < 0) o.y = 1; cx.globalAlpha = .25 + .45 * Math.sin(t / 800 + o.p) ** 2; cx.fillStyle = d ? '#E5C583' : '#b8924a'; cx.beginPath(); cx.arc(o.x * W, o.y * H, o.r * (d ? 1.3 : 1), 0, 7); cx.fill(); });
    requestAnimationFrame(f);
  })(0);
}

icons(); go(0);