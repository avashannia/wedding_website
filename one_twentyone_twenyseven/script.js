/* ================= CONFIG (edit me; items marked PLACEHOLDER are not real yet) ================= */
const Q = new URLSearchParams(location.search);
const CFG = {
  names: 'Abe & Collyn',                       // brief says both "Aba" and "Abe"
  dateISO: '2027-01-21T17:30:00+08:00',        // PLACEHOLDER time
  cer: '5:30 PM', rec: '7:00 PM',              // PLACEHOLDER times
  rsvpBy: '[RSVP-by date]',                    // PLACEHOLDER
  guest: Q.get('to') || 'Tita Baby',
  seats: Math.max(1, parseInt(Q.get('seats')) || 2),
  program: [['4:15 PM', 'Photos & Cocktails', 'Chandelier'], ['5:30 PM', 'Ceremony', 'The Parish'], ['7:00 PM', 'Reception', 'Chandelier']], // PLACEHOLDER
  hotels: [['Hotel one', '[distance]', '[rate]', '[perk]'], ['Hotel two', '[distance]', '[rate]', '[perk]'], ['Hotel three', '[distance]', '[rate]', '[perk]']], // PLACEHOLDER
  cast: [['The couple', 'Abe & Collyn'], ['Parents of the groom', 'To be added'], ['Parents of the bride', 'To be added'], ['Principal sponsors', 'To be added'], ['Secondary sponsors', 'Candle · Veil · Cord'], ['Best man', 'To be added'], ['Maid of honor', 'To be added'], ['Groomsmen', 'To be added'], ['Bridesmaids', 'To be added'], ['Bearers', 'Bible · Ring · Coin'], ['Flower girls', 'To be added'], ['Special thanks', 'To be added'], ['And introducing', 'You']],
  gifts: { GCash: [['Name', '[name]'], ['Number', '[number]']], 'Bank transfer': [['Bank', '[bank]'], ['Account name', '[name]'], ['Account no.', '[number]']] } // PLACEHOLDER
};
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const pages = $$('.pg'), dr = $('#dr'); let cur = 0, manual = false;
$$('[data-g]').forEach(e => e.textContent = CFG.guest); $$('[data-s]').forEach(e => e.textContent = CFG.seats);
$('#rsvpBy').textContent = $('#eRsvp').textContent = CFG.rsvpBy;
$$('.tm').forEach(e => e.textContent = CFG[e.dataset.t]);

/* ================= Hand-drawn SVG icons (no emoji, no icon fonts) ================= */
const IC = {
  map:'<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14"/>', note:'<path d="M9 18V5l10-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>', ar:'<path d="M4 12h15M13 6l6 6-6 6"/>', al:'<path d="M20 12H5M11 6l-6 6 6 6"/>',
  pin:'<path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>', cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  check:'<path d="M4 12l5 5L20 6"/>', close:'<path d="M5 5l14 14M19 5L5 19"/>', pause:'<path d="M8 5v14M16 5v14"/>', play:'<path d="M7 4l13 8-13 8z"/>',
  minus:'<path d="M5 12h14"/>', plus:'<path d="M5 12h14M12 5v14"/>', redo:'<path d="M20 12a8 8 0 11-3-6.2M20 4v5h-5"/>', car:'<path d="M3 15v-3l2-5h14l2 5v3zM5 15v3h3v-3M16 15v3h3v-3"/>',
  bus:'<rect x="4" y="3" width="16" height="15" rx="2"/><path d="M4 11h16M7 21v-3M17 21v-3"/>',
  /* favicon-style outbound-link logos (the one allowed exception), still drawn by hand */
  gm:'<path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" fill="#EA4335" stroke="none"/><circle cx="12" cy="10" r="2.6" fill="#fff" stroke="none"/>',
  wz:'<path d="M12 3a8 7 0 00-7.6 9.6L3 17l4.4-1.4A8 7 0 1012 3z" fill="#33CCFF" stroke="none"/><circle cx="9" cy="10" r="1.2" fill="#123" stroke="none"/><circle cx="15" cy="10" r="1.2" fill="#123" stroke="none"/><path d="M9 13q3 2.5 6 0" stroke="#123"/>',
  gc:'<rect x="3" y="4" width="18" height="17" rx="2" fill="#fff" stroke="#4285F4"/><path d="M3 9h18" stroke="#4285F4"/><text x="12" y="18" font-size="8" text-anchor="middle" fill="#4285F4" stroke="none">21</text>'
};
const icons = r => (r || document).querySelectorAll('i[data-i]').forEach(e => { e.innerHTML = `<svg class="ic" viewBox="0 0 24 24">${IC[e.dataset.i]}</svg>`; e.removeAttribute('data-i'); });
const mapL = (n, q) => `<div class="mini"><a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${q}"><i data-i="gm"></i>Google Maps</a><a target="_blank" rel="noopener" href="https://waze.com/ul?q=${q}&navigate=yes"><i data-i="wz"></i>Waze</a></div>`;

/* ================= Navigation ================= */
function go(i) {
  cur = Math.max(0, Math.min(pages.length - 1, i));
  const sw = $('#sweep'); sw.classList.remove('go'); void sw.getBoundingClientRect(); sw.classList.add('go');
  pages.forEach((p, j) => p.classList.toggle('on', j === cur));
  if (!manual) document.body.classList.toggle('dark', pages[cur].dataset.d === '1');
  closeAll(); $('#pv').style.visibility = cur ? 'visible' : 'hidden'; $('#nx').style.display = cur ? '' : 'none';
  $$('#dir li').forEach((li, j) => li.classList.toggle('here', j === cur));
  if (cur === 5) runBoard(); if (cur === 9) { const c = $('#crIn'); c.style.animation = 'none'; void c.offsetWidth; c.style.animation = ''; }
}
const closeAll = () => { dr.classList.remove('o'); $('#scrim').classList.remove('o'); $('#rm').classList.add('hid'); };
$('#nx').onclick = () => go(cur + 1); $('#pv').onclick = () => go(cur - 1);
addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(cur + 1); if (e.key === 'ArrowLeft') go(cur - 1); if (e.key === 'Escape') { closeAll(); $('#modal').classList.add('hid'); } });
document.addEventListener('click', e => { const g = e.target.closest('[data-go]'); if (g) { e.preventDefault(); go(+g.dataset.go); } });
const restart = () => { $('#ps').classList.remove('f'); $('#boarding').classList.remove('hid'); $('#invite').classList.add('hid'); go(0); };
$('#replay').onclick = $('#replay2').onclick = restart;

/* ================= Essentials sidebar (summary of the whole invitation) ================= */
const CQ = 'Parish+of+the+Immaculate+Heart+of+Mary+Hinulugang+Taktak+Antipolo', RQ = 'The+Chandelier+Events+Place+267+San+Jose+Ext+St+Antipolo';
$('#eWhen').innerHTML = `Thursday, 21 January 2027<br><span class="sm">Ceremony at ${CFG.cer} (placeholder)</span>`;
$('#eCer').innerHTML = `Parish of the Immaculate Heart of Mary<br><span class="sm">Hinulugang Taktak Rd., Brgy. Dela Paz, Antipolo City</span>${mapL(0, CQ)}`;
$('#eRec').innerHTML = `The Chandelier Events Place, ${CFG.rec}<br><span class="sm">267 San Jose Ext. St., Antipolo</span>${mapL(0, RQ)}`;
const names = pages.map(p => p.dataset.n), labels = pages.map(p => p.dataset.l);
$('#jg').innerHTML = [['Programme', 5], ['Getting there', 6], ['Hotels', 7], ['Dress code', 8], ['Entourage', 9], ['RSVP', 10], ['Gifts', 11], ['FAQ', 12]].map(a => `<button class="p" data-go="${a[1]}">${a[0]}</button>`).join('');
$('#dir').innerHTML = names.map((n, i) => `<li><button data-go="${i}"><span class="l">${labels[i]}</span><span class="t2">${n}</span><span class="you">you are here</span></button></li>`).join('');
$('#tb').value = CFG.guest;
$('#tf').onclick = () => { const v = $('#tb').value.trim(); $('#tr').textContent = v ? `${v}: Table 4 (sample, real seating to be added)` : ''; };
$('#chartT').onclick = function () { this.classList.toggle('o'); $('#chart').classList.toggle('hid'); };
const openDr = () => { dr.classList.add('o'); $('#scrim').classList.add('o'); };
$('#openMap').onclick = openDr; $('#drX').onclick = $('#scrim').onclick = closeAll; $('#justD').onclick = openDr;
$('#inf').onclick = () => $('#modal').classList.remove('hid'); $('#mX').onclick = () => $('#modal').classList.add('hid');
$('#mapB').onclick = () => { closeAll(); $('#rm').classList.remove('hid'); };
$('#rmX').onclick = () => $('#rm').classList.add('hid');
/* themes */
const TH = [['linen', '#F4EFE6'], ['sage', '#9caf88'], ['rose', '#e6bfb6'], ['navy', '#1d3466']];
$('#sw').innerHTML = $('#sw2').innerHTML = TH.map(t => `<button data-th="${t[0]}" style="background:${t[1]}" aria-label="${t[0]} theme"></button>`).join('');
document.addEventListener('click', e => { const t = e.target.dataset && e.target.dataset.th; if (t) { document.documentElement.dataset.t = t; manual = false; drawSw(); } });

/* ================= Full-screen roadmap ================= */
{
  const s = $('#rmsv'), D = 'M40 320C150 120 250 400 360 230S560 50 700 200 880 370 960 140';
  s.innerHTML = `<path id="rp" class="dl" d="${D}"/><g class="ld"><rect x="20" y="340" width="40" height="26" rx="2"/><path d="M20 340l20 14 20-14"/><circle cx="170" cy="340" r="18"/><path d="M170 324v32M154 340h32"/><path d="M420 120l30-40 24 28 20-18 36 30z"/><path d="M780 330v-30l20-18 20 18v30zM800 282v-14"/><rect x="560" y="320" width="26" height="30"/><rect x="590" y="326" width="26" height="30"/></g>
  <g id="plm"><path d="M0 0L-12 6-9 0-12-6z" fill="#B8924A" transform="scale(1.2)"/><animateMotion dur="14s" repeatCount="indefinite" rotate="auto"><mpath href="#rp"/></animateMotion></g>
  <circle r="5" fill="#B8924A"><animateMotion dur="9s" repeatCount="indefinite"><mpath href="#rp"/></animateMotion></circle>`;
  const p = $('#rp'), L = p.getTotalLength();
  names.forEach((n, i) => { const pt = p.getPointAtLength(L * (i / 13)); const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('class', 'st'); g.setAttribute('transform', `translate(${pt.x} ${pt.y})`); g.innerHTML = `<title>${n}</title><circle class="gl" r="22"/><circle r="13"/><text y="4">${labels[i] === 'Prologue' ? 'P' : labels[i] === 'Epilogue' ? 'E' : labels[i]}</text>`; g.onclick = () => go(i); s.append(g); });
}

/* ================= Prologue ================= */
$('#bar').innerHTML = [...Array(34)].map((_, i) => `<rect x="${i * 2.6}" y="0" width="${i % 3 ? 1.2 : 2}" height="16"/>`).join('');
function openT() { $('#ps').classList.add('f'); setTimeout(() => { $('#boarding').classList.add('hid'); $('#invite').classList.remove('hid'); }, 800); }
$('#ps').onclick = openT; $('#ps').onkeydown = e => e.key === 'Enter' && openT();

/* ================= Ambient: clouds, plants, particles ================= */
$('#clouds').innerHTML = [...Array(6)].map((_, i) => `<svg viewBox="0 0 200 70" style="top:${8 + i * 15}%;width:${160 + i * 40}px;animation-duration:${50 + i * 17}s;animation-delay:-${i * 11}s"><path d="M0 60q20-30 55-20 15-30 55-15 30-5 40 25 25 0 25 25z"/></svg>`).join('');
$('#plants').innerHTML = [...Array(40)].map((_, i) => { const x = i * 30 + 8, h = 30 + (i * 37 % 50); return `<path d="M${x} 120q${i % 2 ? 8 : -8} ${-h / 2} 0 ${-h}" stroke-width="2" style="animation-delay:${-(i % 7)}s"/>`; }).join('');
{
  const cv = $('#fx'), cx = cv.getContext('2d'); let W, H; const ds = [...Array(90)].map(() => ({ x: Math.random(), y: Math.random(), r: Math.random() * 2 + .5, v: Math.random() * .0003 + .0001, p: Math.random() * 6 }));
  const rs = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; }; rs(); addEventListener('resize', rs);
  (function f(t) { cx.clearRect(0, 0, W, H); const d = document.body.classList.contains('dark'); ds.forEach(o => { o.y -= o.v; o.x += Math.sin(t / 3000 + o.p) * .0002; if (o.y < 0) o.y = 1; cx.globalAlpha = .25 + .45 * Math.sin(t / 800 + o.p) ** 2; cx.fillStyle = d ? '#E5C583' : '#b8924a'; cx.beginPath(); cx.arc(o.x * W, o.y * H, o.r * (d ? 1.3 : 1), 0, 7); cx.fill(); }); requestAnimationFrame(f); })(0);
}
let ac, ag, mon = false;
$('#au').onclick = () => { if (!ac) { ac = new AudioContext(); ag = ac.createGain(); ag.gain.value = 0; ag.connect(ac.destination); [261.6, 329.6, 392].forEach(f => { const o = ac.createOscillator(); o.frequency.value = f; o.connect(ag); o.start(); }); } mon = !mon; ag.gain.linearRampToValueAtTime(mon ? .04 : 0, ac.currentTime + 2.5); };

/* ================= Ch1 planes ================= */
{
  const sky = $('#sky'), p1 = $('#p1'), p2 = $('#p2'); let locked = false;
  const place = (e, x, y) => { e.style.left = x + 'px'; e.style.top = y + 'px'; };
  const reset = () => { place(p1, 20, 40); place(p2, sky.clientWidth - 90, 190); };
  const lock = () => { if (locked) return; locked = true; const c = sky.clientWidth / 2 - 22; place(p1, c - 26, 120); place(p2, c + 26, 120); $('#lockH').classList.add('on'); burst(sky, sky.clientWidth / 2, 140); };
  $('#bring').onclick = lock; new ResizeObserver(() => !locked && reset()).observe(sky);
  [p1, p2].forEach(el => el.onpointerdown = e => { if (locked) return; el.setPointerCapture(e.pointerId); el.style.transition = 'none'; const r = sky.getBoundingClientRect(), ox = e.clientX - el.offsetLeft - r.left, oy = e.clientY - el.offsetTop - r.top; el.onpointermove = m => place(el, m.clientX - r.left - ox, m.clientY - r.top - oy); el.onpointerup = () => { el.onpointermove = null; el.style.transition = ''; if (Math.hypot(p1.offsetLeft - p2.offsetLeft, p1.offsetTop - p2.offsetTop) < 100) lock(); }; });
  reset();
}
function burst(host, x, y) { for (let k = 0; k < 16; k++) { const s = document.createElement('span'); s.className = 'spark'; s.style.cssText = `left:${x}px;top:${y}px;animation-delay:${Math.random() * .4}s`; s.style.setProperty('--d', k); host.append(s); setTimeout(() => s.remove(), 2200); } }

/* ================= Ch2 proposal ================= */
{
  $('#stars').innerHTML = [...Array(45)].map((_, i) => `<circle cx="${(i * 97) % 400}" cy="${(i * 53) % 110}" r="${i % 3 ? .8 : 1.4}" style="animation-delay:${-(i % 5)}s"/>`).join('');
  $('#ff').innerHTML = [...Array(8)].map((_, i) => `<span class="ffl" style="left:${10 + i * 11}%;top:${30 + i * 6}%;animation-delay:${-i}s"></span>`).join('');
  $('#candles').innerHTML = [...Array(7)].map((_, i) => `<span class="cd1" style="height:${40 + (i % 3) * 8}px"></span>`).join('');
  let n = 0; const light = e => { const el = document.elementFromPoint(e.clientX, e.clientY); if (el && el.classList.contains('cd1') && !el.classList.contains('l')) { setTimeout(() => el.classList.add('l'), n++ % 3 * 140); for (let k = 0; k < 8; k++) { const s = document.createElement('span'); s.className = 'spark'; s.style.cssText = `left:${el.offsetLeft + 4 + Math.random() * 12}px;bottom:70px;animation-delay:${Math.random() * .6}s`; $('#night').append(s); setTimeout(() => s.remove(), 2200); } } };
  $('#night').onpointermove = light; $('#night').onclick = light;
}

/* ================= Ch3 polaroids ================= */
{
  const caps = ['First hello', 'Road trip', 'Coffee run', 'Sunday walk', 'Our song', 'Plane seats', 'Sunset', 'Lazy day', 'Birthday', 'Late night', 'Adventure', 'Yes!'], dk = $('#deck'); let order = [...Array(12).keys()], sp = false;
  caps.forEach((c, n) => { const e = document.createElement('div'); e.className = 'po'; e.innerHTML = `<i style="background:linear-gradient(135deg,hsl(${205 + (n % 4) * 12} 30% 72%),hsl(${36 + (n % 3) * 6} 42% 56%))"></i>${c}`; let x0 = 0, y0 = 0;
    e.onpointerdown = ev => { x0 = ev.clientX; y0 = ev.clientY; };
    e.onpointerup = ev => { if (sp) { $('#lb').innerHTML = `<div><i style="background:${e.firstChild.style.background}"></i>${c}</div>`; $('#lb').classList.remove('hid'); return; } if (order[0] === n && (Math.abs(ev.clientX - x0) > 25 || Math.abs(ev.clientY - y0) < 6)) { e.style.transform = `translateX(${ev.clientX > x0 ? 260 : -260}px) rotate(20deg)`; setTimeout(() => { order.push(order.shift()); lay(); }, 280); } };
    dk.append(e); });
  $('#lb').onclick = () => $('#lb').classList.add('hid');
  function lay() { $('#cnt').textContent = (order[0] + 1) + ' / 12'; dk.classList.toggle('sp2', sp); order.forEach((n, k) => { const e = dk.children[n]; e.style.zIndex = 12 - k; if (sp) { e.style.transform = 'none'; e.style.left = 14 + (n % 4) * 24 + '%'; e.style.top = 18 + Math.floor(n / 4) * 32 + '%'; e.style.width = '92px'; e.style.height = '116px'; e.style.margin = '-58px 0 0 -46px'; } else { e.style.left = e.style.top = '50%'; e.style.width = e.style.height = e.style.margin = ''; e.style.transform = `rotate(${(n % 5 - 2) * 5}deg) translate(${(n % 3 - 1) * 6}px,0)`; } }); }
  $('#spread').onclick = function () { sp = !sp; this.textContent = sp ? 'Stack them up' : 'Spread them out'; lay(); }; lay();
}

/* ================= Ch4 countdown / calendar / scratch ================= */
{
  const T = new Date(CFG.dateISO); let prev = [];
  const tick = () => { const d = Math.max(0, T - Date.now()) / 1e3 | 0, v = [d / 86400 | 0, d % 86400 / 3600 | 0, d % 3600 / 60 | 0, d % 60]; if (!$('#cd').children.length) $('#cd').innerHTML = ['Days', 'Hours', 'Minutes', 'Seconds'].map(a => `<div><b></b><small>${a.toUpperCase()}</small></div>`).join('');
    v.forEach((x, i) => { if (prev[i] !== x) { const b = $('#cd').children[i].firstChild; b.textContent = String(x).padStart(2, '0'); b.classList.remove('fl'); void b.offsetWidth; b.classList.add('fl'); } }); prev = v; };
  tick(); setInterval(tick, 1000);
  $('#ics').href = 'data:text/calendar;charset=utf8,' + encodeURIComponent('BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Abe & Collyn Wedding\nDTSTART:20270121T093000Z\nDTEND:20270121T150000Z\nLOCATION:Antipolo City\nEND:VEVENT\nEND:VCALENDAR');
  $('#gcal').href = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Abe+%26+Collyn+Wedding&dates=20270121T093000Z/20270121T150000Z&location=Antipolo+City';
  const c = $('#scr'), x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 300, 150); g.addColorStop(0, '#d9b45f'); g.addColorStop(.5, '#f6dfa0'); g.addColorStop(1, '#b8924a'); x.fillStyle = g; x.fillRect(0, 0, 300, 150);
  let dn = false, m = 0;
  c.onpointerdown = e => { dn = true; c.setPointerCapture(e.pointerId); }; c.onpointerup = () => dn = false;
  c.onpointermove = e => { if (!dn) return; const r = c.getBoundingClientRect(); x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc((e.clientX - r.left) * 300 / r.width, (e.clientY - r.top) * 150 / r.height, 18, 0, 7); x.fill();
    if (++m % 8 === 0) { const d = x.getImageData(0, 0, 300, 150).data; let t = 0; for (let i = 3; i < d.length; i += 160) if (!d[i]) t++; if (t / (d.length / 160) > .45) { c.classList.add('done'); $('#scw').classList.add('dn'); confetti(); } } };
}
function confetti() { for (let i = 0; i < 40; i++) { const s = document.createElement('span'); s.className = 'cf'; s.style.cssText = `left:${Math.random() * 100}vw;background:${['#E5C583', '#1d3466', '#bcd6b0', '#F4EFE6'][i % 4]};animation-delay:${Math.random() * .8}s`; document.body.append(s); setTimeout(() => s.remove(), 3500); } }

/* ================= Ch5 split-flap departure board ================= */
const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:&. ', WD = [8, 18, 12, 9];
function flap(fg, txt, delay = 0) { txt = String(txt).toUpperCase().padEnd(fg.children.length); [...fg.children].forEach((c, k) => { let f = 0; const max = 7 + k % 6 + (Math.random() * 6 | 0); setTimeout(() => { c.classList.add('sp'); const t = setInterval(() => { if (f++ < max) c.textContent = CH[Math.random() * CH.length | 0]; else { clearInterval(t); c.classList.remove('sp'); c.textContent = txt[k]; } }, 55); }, delay + k * 28); }); }
const P = CFG.program; let act = 0;
$('#rows').innerHTML = P.map(() => `<div class="rw">${WD.map(w => `<div class="fg">${'<span class="fc"> </span>'.repeat(w)}</div>`).join('')}</div>`).join('');
const stat = i => i < act ? 'DONE' : i === act ? 'NOW' : 'ON TIME';
function runBoard() {
  const shuf = [...P.keys()].reverse(); /* ramble first in the wrong order, then sort */
  $$('#rows .rw').forEach((r, ri) => { [...r.children].forEach((fg, ci) => { const s = P[shuf[ri]]; flap(fg, ci < 3 ? s[ci] : 'BOARDING', ri * 250); }); });
  setTimeout(() => $$('#rows .rw').forEach((r, ri) => { [...r.children].forEach((fg, ci) => flap(fg, ci < 3 ? P[ri][ci] : stat(ri), ri * 250)); }), 2600);
}
setInterval(() => { if (cur === 5) runBoard(); }, 28000);
{
  const svg = $('#sunsvg'), arc = $('#arc'), L = arc.getTotalLength();
  const set = t => { t = Math.max(0, Math.min(1, t)); const p = arc.getPointAtLength(t * L); $('#sun').setAttribute('transform', `translate(${p.x},${p.y})`); const a = Math.min(P.length - 1, t * P.length | 0); $$('#rows .rw').forEach((r, i) => r.classList.toggle('act', i === a)); if (a !== act) { act = a; $$('#rows .rw').forEach((r, i) => flap(r.children[3], stat(i), i * 120)); } };
  const mv = e => { const r = svg.getBoundingClientRect(); set((e.clientX - r.left) / r.width); }; let d = false;
  svg.onpointerdown = e => { d = true; svg.setPointerCapture(e.pointerId); mv(e); }; svg.onpointermove = e => d && mv(e); svg.onpointerup = () => d = false; set(.1);
}

/* ================= Ch6 journey ================= */
{
  const J = { 'By car': ['car', 'Use Waze or Google Maps to the Parish on Hinulugang Taktak Rd., Brgy. Dela Paz, then to The Chandelier Events Place on San Jose Ext. St. Allow extra time for Antipolo traffic. Parking details: to be confirmed.'], 'By bus': ['bus', 'Take a bus or UV Express toward Antipolo, then a tricycle or jeep to Brgy. Dela Paz. Please confirm routes before the day.'], 'By Grab': ['car', 'Set your drop-off to the Parish of the Immaculate Heart of Mary and ask your driver to wait for the reception transfer.'] };
  $('#tabs').innerHTML = Object.keys(J).map(k => `<button class="b o" data-k="${k}"><i data-i="${J[k][0]}"></i>${k}</button>`).join('');
  const show = k => { $('#tp').textContent = J[k][1]; $$('#tabs .b').forEach(b => b.classList.toggle('o', b.dataset.k !== k)); };
  $('#tabs').onclick = e => { const b = e.target.closest('button'); if (b) show(b.dataset.k); }; show('By car');
  const rd = $('#rd'), L = rd.getTotalLength(), svg = $('#map'); let t = 0, d = false, sp = .0016;
  const put = v => { const p = rd.getPointAtLength(Math.max(0, Math.min(1, v)) * L), q = rd.getPointAtLength(Math.min(L, v * L + 2)); $('#carG').setAttribute('transform', `translate(${p.x},${p.y}) rotate(${Math.atan2(q.y - p.y, q.x - p.x) * 57.3})`); };
  const near = e => { const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; const l = pt.matrixTransform(svg.getScreenCTM().inverse()); let b = 0, bd = 1e9; for (let i = 0; i <= 80; i++) { const p = rd.getPointAtLength(i / 80 * L), dd = (p.x - l.x) ** 2 + (p.y - l.y) ** 2; if (dd < bd) { bd = dd; b = i / 80; } } return b; };
  svg.onpointerdown = e => { d = true; svg.setPointerCapture(e.pointerId); t = near(e); put(t); }; svg.onpointermove = e => { if (d) { t = near(e); put(t); } }; svg.onpointerup = () => d = false;
  (function idle() { if (!d) { t += sp; if (t >= 1) { t = 0; sp = .0016; } put(t); } requestAnimationFrame(idle); })();
  $('#drive').onclick = () => { t = 0; sp = .006; };
  let vb = [0, 0, 320, 200], tg = vb; const vbs = a => svg.setAttribute('viewBox', a.map(n => n.toFixed(1)).join(' '));
  (function anim() { vb = vb.map((v, i) => v + (tg[i] - v) * .08); vbs(vb); requestAnimationFrame(anim); })();
  $('#zoom').onclick = () => tg = [190, 20, 130, 81]; $('#whole').onclick = () => tg = [0, 0, 320, 200];
}

/* ================= Ch7 hotel doors ================= */
$('#doors').innerHTML = CFG.hotels.map((h, i) => `<div class="door" id="dd${i}"><div class="info"><h3>${h[0]}</h3><p>${h[1]}<br>${h[2]}<br>${h[3]}</p><a class="ln" href="#" onclick="return false">Book a room (placeholder)</a><br><a class="ln" href="#" data-go="6">See it on the map</a></div>
<button class="dp" aria-label="Knock on door ${i + 1}"><svg viewBox="0 0 60 100"><path class="pn" d="M3 97V30a27 27 0 0154 0v67z"/><rect x="12" y="14" width="36" height="30" rx="14" fill="none" stroke="#E5C583"/><rect x="12" y="52" width="36" height="38" fill="none" stroke="#E5C583"/><circle cx="46" cy="55" r="2.5" fill="#E5C583"/><circle class="ld" cx="30" cy="8" r="3"/></svg></button></div>`).join('');
$('#doors').onclick = e => { const d = e.target.closest('.dp'); if (!d) return; const w = d.parentNode, o = w.classList.contains('open'); $$('.door').forEach(x => x.classList.remove('open')); if (!o) w.classList.add('open'); };

/* ================= Ch8 wardrobe ================= */
const SW = { linen: [['Sage', '#9caf88'], ['Cream', '#efe3c8'], ['Gold', '#c9a24b'], ['Dusty rose', '#d4a5a5'], ['Navy', '#1d3466'], ['Light green', '#bcd6b0']], sage: [['Sage', '#9caf88'], ['Moss', '#6b8a5e'], ['Cream', '#efe3c8'], ['Gold', '#c9a24b']], rose: [['Dusty rose', '#d4a5a5'], ['Blush', '#f0d4cf'], ['Cream', '#efe3c8'], ['Gold', '#c9a24b']], navy: [['Navy', '#1d3466'], ['Dusk blue', '#6f86b5'], ['Pale blue', '#c9d6ee'], ['Gold', '#c9a24b']] };
const ROLE = [['Navy 1', '#14264f'], ['Navy 2', '#2a4478'], ['Blue', '#5c78b0'], ['Powder', '#a9bbdf'], ['Pale', '#dbe4f4']]; /* approximate swatch-sheet shades */
function drawSw() { const t = document.documentElement.dataset.t; $('#swatches').innerHTML = '<em>Motif</em>' + SW[t].map(s => `<span title="${s[0]}" style="background:${s[1]}" data-c="${s[1]}"></span>`).join('') + '<em>Entourage roles (approx.)</em>' + ROLE.map(s => `<span title="${s[0]}" style="background:${s[1]}" data-c="${s[1]}"></span>`).join(''); }
$('#swatches').onclick = e => { const c = e.target.dataset.c; if (c) $$('.gar').forEach(g => g.style.fill = c); }; drawSw();

/* ================= Ch9 credits ================= */
$('#crIn').innerHTML = CFG.cast.map(c => `<em>${c[0]}</em><strong>${c[1].replace('&', '&amp;')}</strong>`).join('');
$('#pc').onclick = function () { const p = $('#cr').classList.toggle('p'); this.innerHTML = `<i data-i="${p ? 'play' : 'pause'}"></i><span>${p ? 'Play' : 'Pause'} the credits</span>`; icons(this); };

/* ================= Ch10 RSVP ================= */
{
  let n = Math.min(2, CFG.seats); $('#gc').textContent = n;
  $('#mn').onclick = () => $('#gc').textContent = n = Math.max(1, n - 1); $('#pl').onclick = () => $('#gc').textContent = n = Math.min(CFG.seats, n + 1);
  $$('#rv [data-a]').forEach(b => b.onclick = () => { $$('#rv [data-a]').forEach(x => x.classList.toggle('o', x !== b)); $('#resp').textContent = b.dataset.a === 'y' ? 'Yay! Save some energy for the dance floor.' : "We'll miss you! Thank you for telling us."; });
  $('#snd').onclick = () => { /* BACKEND: POST the form values here (fetch to your form service) */ $('#snd').classList.add('hid'); $('#ok').classList.remove('hid'); burst($('#rv'), 120, 300); };
}

/* ================= Ch11 gifts ================= */
{
  const ks = Object.keys(CFG.gifts); $('#gtabs').innerHTML = ks.map(k => `<button class="b o" data-k="${k}">${k}</button>`).join('');
  const qr = () => { let s = ''; for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) { const f = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13); if (f ? (x % 6 === 0 || y % 6 === 0 || (x % 6 > 1 && x % 6 < 5 && y % 6 > 1 && y % 6 < 5)) : (x * 7 + y * 13) % 5 < 2) s += `<rect x="${x}" y="${y}" width="1" height="1"/>`; } return `<svg viewBox="0 0 21 21" width="110" aria-label="Sample QR"><g fill="currentColor">${s}</g></svg><p class="k">Sample QR</p>`; };
  const show = k => { $$('#gtabs .b').forEach(b => b.classList.toggle('o', b.dataset.k !== k)); $('#gp').innerHTML = qr() + CFG.gifts[k].map(f => `<div class="fld"><span><small>${f[0]}</small><br>${f[1]}</span><button class="t cp">Copy</button></div>`).join(''); };
  $('#gtabs').onclick = e => e.target.dataset.k && show(e.target.dataset.k); show(ks[0]);
  $('#gp').onclick = e => { if (e.target.classList.contains('cp')) { navigator.clipboard && navigator.clipboard.writeText(e.target.parentNode.firstChild.textContent); e.target.textContent = 'Copied'; } };
  const open = () => { $('#gift').classList.add('open'); setTimeout(() => $('#gd').classList.remove('hid'), 800); }; $('#pull').onclick = $('#gift').onclick = open;
}

/* ================= Ch12 chat ================= */
{
  const F = [['Can I bring my kids?', 'We love your little ones. Please check your invitation for the seats reserved for you.'], ['Can I bring a plus-one?', 'Your invitation shows how many seats we saved for you.'], ['Can I take photos during the ceremony?', 'We have a photographer, so please stay unplugged during the ceremony. At the reception, go wild.'], ['Where do I park?', 'Parking details will be shared closer to the date.'], ["What's the weather like?", 'January in Antipolo is typically dry and mild. We will update this closer to the date.'], ['What time should I arrive?', 'Please be seated at least 30 minutes before the ceremony.']];
  $('#bubs').innerHTML = F.map((f, i) => `<button class="bub" data-i="${i}">${f[0]}</button>`).join('');
  $('#bubs').onclick = e => { const i = e.target.dataset.i; if (i == null) return; e.target.remove(); const l = $('#log'); l.insertAdjacentHTML('beforeend', `<div class="q">${F[i][0]}</div><div class="a dots"><span></span><span></span><span></span></div>`); const t = l.lastChild; l.scrollTop = 1e5; setTimeout(() => { t.classList.remove('dots'); t.textContent = F[i][1]; l.scrollTop = 1e5; }, 1200); };
}

/* ================= Epilogue lanterns ================= */
{
  const sk = $('#sky2'); const lan = (x, txt) => { const e = document.createElement('div'); e.className = 'lan'; e.style.cssText = `left:${x}px;animation-duration:${14 + Math.random() * 8}s`; e.innerHTML = `<svg viewBox="0 0 40 56"><path d="M8 10h24l4 36H4zM14 10q6-8 12 0M10 46h20"/></svg>${txt || ''}`; sk.append(e); setTimeout(() => e.remove(), 24000); };
  setInterval(() => lan(Math.random() * innerWidth), 2200); for (let i = 0; i < 4; i++) setTimeout(() => lan(Math.random() * innerWidth), i * 400);
  sk.onclick = e => lan(e.clientX - 22); $('#rel').onclick = () => { lan(innerWidth / 2 - 22, $('#wish').value); $('#wish').value = ''; };
}

icons(); go(0);