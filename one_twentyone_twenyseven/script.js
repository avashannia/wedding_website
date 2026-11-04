/* ================= CONFIG (edit me; PLACEHOLDER = not confirmed yet) ================= */
const Q = new URLSearchParams(location.search);
const CFG = {
  names: "Abe & Collyn", // brief says both "Aba" and "Abe"
  dateISO: "2027-01-21T17:30:00+08:00", // PLACEHOLDER time
  cer: "5:30 PM",
  rec: "7:00 PM", // PLACEHOLDER
  rsvpBy: "[RSVP-by date]", // PLACEHOLDER
  rsvpUrl: "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL", // PLACEHOLDER
  guest: (Q.get("to") || "").slice(0, 80),
  seats: 1,
  video: { src: "", poster: "" }, // put the prenup video path here, e.g. 'prenup.mp4'
  venues: {
    // map uses the ADDRESS query. Coordinates intentionally not guessed: verify on Google Maps, then fill in.
    c: {
      name: "Parish of the Immaculate Heart of Mary",
      addr: "Hinulugang Taktak Rd., Brgy. Dela Paz, Antipolo City",
      lat: null,
      lng: null,
      verify: true,
    },
    r: {
      name: "The Chandelier Events Place",
      addr: "267 San Jose Ext. St., Antipolo",
      lat: null,
      lng: null,
      verify: true,
    },
  },
  program: [
    ["4:15 PM", "Photos & Cocktails", "Chandelier", "BOARDING", "r"],
    ["5:30 PM", "Ceremony", "The Parish", "ON TIME", "c"],
    ["7:00 PM", "Reception", "Chandelier", "ON TIME", "r"],
  ], // PLACEHOLDER
  cast: [
    ["Starring", ["Abe & Collyn"]],
    ["Parents of the groom", ["To be added", "To be added"]],
    ["Parents of the bride", ["To be added", "To be added"]],
    [
      "Principal sponsors",
      [...Array(8)].map(() => "Ninong To be added · Ninang To be added"),
    ],
    ["And one more Ninong", ["Ninong To be added"]],
    ["Best man", ["To be added"]],
    ["Maids of honor", ["To be added", "To be added"]],
    ["Groomsmen", [...Array(4)].map(() => "To be added")],
    ["Bridesmaids", [...Array(4)].map(() => "To be added")],
    ["Flower girls", ["To be added", "To be added"]],
    ["Ring bearer", ["To be added"]],
    ["Bible bearer", ["To be added"]],
    ["Coin bearer", ["To be added"]],
    ["Special thanks", ["To be added"]],
    ["And introducing", ["You"]],
  ],
};
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)],
  NS = "http://www.w3.org/2000/svg";
const pages = $$(".pg"),
  names = pages.map((p) => p.dataset.n),
  labels = pages.map((p) => p.dataset.l);
let cur = 0,
  manual = false;
$$("[data-g]").forEach((e) => (e.textContent = CFG.guest));
$$("[data-s]").forEach((e) => (e.textContent = CFG.seats));
{
  const sv = CFG.seats + " SEAT" + (CFG.seats > 1 ? "S" : "") + " RESERVED";
  [$("#seatv"), $("#seatv2")].forEach((e) => e && (e.textContent = sv));
  const bn = $("#bcn");
  if (bn) bn.textContent = "WEDDING PASS · AC 2027";
}
$("#rsvpBy").textContent = $("#eRsvp").textContent = CFG.rsvpBy;
$$(".tm").forEach((e) => (e.textContent = CFG[e.dataset.t]));
const sget = (k) => {
    try {
      return sessionStorage.getItem(k);
    } catch (e) {
      return null;
    }
  },
  sset = (k, v) => {
    try {
      sessionStorage.setItem(k, v);
    } catch (e) {}
  };

/* ================= Hand-drawn icons ================= */
const IC = {
  map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14"/>',
  note: '<path d="M9 18V5l10-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  ar: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  al: '<path d="M20 12H5M11 6l-6 6 6 6"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  check: '<path d="M4 12l5 5L20 6"/>',
  close: '<path d="M5 5l14 14M19 5L5 19"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  play: '<path d="M7 4l13 8-13 8z"/>',
  minus: '<path d="M5 12h14"/>',
  plus: '<path d="M5 12h14M12 5v14"/>',
  redo: '<path d="M20 12a8 8 0 11-3-6.2M20 4v5h-5"/>',
  car: '<path d="M3 15v-3l2-5h14l2 5v3zM5 15v3h3v-3M16 15v3h3v-3"/>',
  bus: '<rect x="4" y="3" width="16" height="15" rx="2"/><path d="M4 11h16M7 21v-3M17 21v-3"/>',
  gm: '<path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" fill="#EA4335" stroke="none"/><circle cx="12" cy="10" r="2.6" fill="#fff" stroke="none"/>',
  wz: '<path d="M12 3a8 7 0 00-7.6 9.6L3 17l4.4-1.4A8 7 0 1012 3z" fill="#33CCFF" stroke="none"/><circle cx="9" cy="10" r="1.2" fill="#123" stroke="none"/><circle cx="15" cy="10" r="1.2" fill="#123" stroke="none"/><path d="M9 13q3 2.5 6 0" stroke="#123"/>',
  gc: '<rect x="3" y="4" width="18" height="17" rx="2" fill="#fff" stroke="#4285F4"/><path d="M3 9h18" stroke="#4285F4"/><text x="12" y="18" font-size="8" text-anchor="middle" fill="#4285F4" stroke="none">21</text>',
};
const icons = (r) =>
  (r || document).querySelectorAll("i[data-i]").forEach((e) => {
    e.innerHTML = `<svg class="ic" viewBox="0 0 24 24">${IC[e.dataset.i]}</svg>`;
    e.removeAttribute("data-i");
  });
const enc = encodeURIComponent,
  VQ = (v) => `${v.name}, ${v.addr}`;
const mapL = (v) =>
  `<div class="mini"><a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${enc(VQ(v))}"><i data-i="gm"></i>Google Maps</a><a target="_blank" rel="noopener" href="https://waze.com/ul?q=${enc(VQ(v))}&navigate=yes"><i data-i="wz"></i>Waze</a></div>`;

/* ================= Navigation ================= */
const DARK = [0, 1, 3, 6];
function go(i) {
  cur = Math.max(0, Math.min(pages.length - 1, i));
  pages.forEach((p, j) => p.classList.toggle("on", j === cur));
  if (!manual) document.body.classList.add("dark");
  $("#modal").classList.add("hid");
  $("#pv").style.visibility = cur ? "visible" : "hidden";
  $("#nx").style.display = cur && cur < pages.length - 1 ? "" : "none";
  $("#rmsv") && markHere();
  if (cur === 3) enterDay();
  if (cur === 4) enterProg();
  if (cur === 6) {
    const c = $("#crIn");
    c.style.animation = "none";
    void c.offsetWidth;
    c.style.animation = "";
  }
  if (cur === 7) enterGift();
  if (cur === 9) petals();
}
$("#nx").onclick = () => go(cur + 1);
$("#pv").onclick = () => go(cur - 1);
addEventListener("keydown", (e) => {
  if (e.target.matches("input,textarea")) return;
  if (e.key === "ArrowRight") go(cur + 1);
  if (e.key === "ArrowLeft") go(cur - 1);
  if (e.key === "Escape") {
    $("#modal").classList.add("hid");
    closeMap();
  }
});
document.addEventListener("click", (e) => {
  const g = e.target.closest("[data-go]");
  if (g) {
    e.preventDefault();
    go(+g.dataset.go);
  }
});

/* ================= Info modal ================= */
$("#eWhen").innerHTML =
  `Thursday, 21 January 2027<br><span class="sm">Ceremony at ${CFG.cer} (placeholder)</span>`;
$("#eCer").innerHTML =
  `${CFG.venues.c.name}<br><span class="sm">${CFG.venues.c.addr}</span>`;
$("#eRec").innerHTML =
  `${CFG.venues.r.name}, ${CFG.rec}<br><span class="sm">${CFG.venues.r.addr}</span>`;
$("#jg").innerHTML = [
  ["Proposal", 1],
  ["Prenup", 2],
  ["Wedding day", 3],
  ["Programme", 4],
  ["Dress code", 5],
  ["Entourage", 6],
  ["Gifts", 7],
  ["FAQ", 8],
  ["RSVP", 9],
]
  .map((a) => `<button class="p" data-go="${a[1]}">${a[0]}</button>`)
  .join("");
$("#inf").onclick = () => $("#modal").classList.remove("hid");
$("#mX").onclick = () => $("#modal").classList.add("hid");
$("#modal").onclick = (e) => {
  if (e.target.id === "modal") $("#modal").classList.add("hid");
};
$("#justD").onclick = () => $("#modal").classList.remove("hid");
/* ===== Two themes only: Navy and Gold (dark) / Cream and Light Green (light) ===== */
const TH = [
  ["dark", "#14264F", "#E5C583", "Navy and gold"],
  ["light", "#F6F1E7", "#9CB88F", "Cream and light green"],
];
$("#sw").innerHTML = $("#sw2").innerHTML = TH.map(
  (t) =>
    `<button data-th="${t[0]}" style="background:linear-gradient(135deg,${t[1]} 55%,${t[2]} 55%)" aria-label="${t[3]}" title="${t[3]}"></button>`,
).join("");
const setTheme = (t) => {
  manual = true;
  document.body.classList.toggle("dark", t === "dark");
  try {
    localStorage.setItem("theme", t);
  } catch (e) {}
};
{
  let st = null;
  try {
    st = localStorage.getItem("theme");
  } catch (e) {}
  setTheme(st === "light" ? "light" : "dark");
}
document.addEventListener("click", (e) => {
  const t = e.target.dataset && e.target.dataset.th;
  if (t) setTheme(t);
});

/* ================= Ambient layers: fog, glows, outlined clouds, slow plane, particles ================= */
{
  const cloud = (top, w, dur, del, l) =>
    `<svg class="cld" viewBox="0 0 160 80" style="top:${top}%;width:${w}px;animation-duration:${dur}s;animation-delay:-${del}s;opacity:${l ? 0.95 : 0.6}"><path d="M24 64a20 20 0 0 1 2-40 30 30 0 0 1 56-8 26 26 0 0 1 46 10 22 22 0 0 1 2 38z"/><path class="in" d="M44 52h70"/></svg>`;
  /* 2 layers x 3 clouds, each in its own vertical band (>=14% apart), different sizes/speeds/offsets */
  const CLB = [
    [8, 150, 130, 20, 0],
    [38, 120, 160, 100, 0],
    [66, 170, 145, 60, 0],
    [22, 230, 85, 45, 1],
    [52, 260, 100, 12, 1],
    [80, 210, 75, 70, 1],
  ];
  $("#bgL").innerHTML =
    [0, 1, 2]
      .map(
        (i) =>
          `<div class="fog" style="top:${i * 28}%;left:${-20 + i * 25}%;animation-delay:-${i * 13}s;animation-duration:${38 + i * 9}s"></div>`,
      )
      .join("") +
    [...Array(7)]
      .map((_, i) => {
        const s = 130 + ((i * 53) % 160);
        return `<div class="orb" style="width:${s}px;height:${s}px;left:${(i * 17) % 90}%;top:${(i * 29) % 80}%;animation-delay:-${i * 3}s,-${i}s;animation-duration:${18 + i * 3}s,${3 + (i % 3)}s"></div>`;
      })
      .join("") +
    CLB.map((c) => cloud(...c)).join("") +
    `<div class="plane"><i></i><svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg></div>`;
  const cv = $("#fx"),
    cx = cv.getContext("2d");
  let W, H;
  const ds = [...Array(70)].map(() => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 2 + 0.6,
    v: Math.random() * 0.0003 + 0.0001,
    p: Math.random() * 6,
  }));
  const rs = () => {
    W = cv.width = innerWidth;
    H = cv.height = innerHeight;
  };
  rs();
  addEventListener("resize", rs);
  (function f(t) {
    cx.clearRect(0, 0, W, H);
    if (!document.hidden) {
      const d = document.body.classList.contains("dark");
      ds.forEach((o) => {
        o.y -= o.v;
        o.x += Math.sin(t / 3000 + o.p) * 0.0002;
        if (o.y < 0) o.y = 1;
        cx.globalAlpha = 0.3 + 0.5 * Math.sin(t / 800 + o.p) ** 2;
        cx.fillStyle = d ? "#E5C583" : "#6f9a62";
        cx.beginPath();
        cx.arc(o.x * W, o.y * H, o.r * (d ? 1.3 : 1.1), 0, 7);
        cx.fill();
      });
    }
    requestAnimationFrame(f);
  })(0);
}
let ac,
  ag,
  mon = false;
$("#au").onclick = () => {
  if (!ac) {
    ac = new AudioContext();
    ag = ac.createGain();
    ag.gain.value = 0;
    ag.connect(ac.destination);
    [261.6, 329.6, 392].forEach((f) => {
      const o = ac.createOscillator();
      o.frequency.value = f;
      o.connect(ag);
      o.start();
    });
  }
  mon = !mon;
  ag.gain.linearRampToValueAtTime(mon ? 0.04 : 0, ac.currentTime + 2.5);
};

/* ================= Prologue ================= */
$("#bar").innerHTML = [...Array(34)]
  .map(
    (_, i) =>
      `<rect x="${i * 2.6}" y="0" width="${i % 3 ? 1.2 : 2}" height="16"/>`,
  )
  .join("");
function openT() {
  $("#ps").classList.add("f");
  setTimeout(() => {
    $("#boarding").classList.add("hid");
    $("#invite").classList.remove("hid");
  }, 800);
}
$("#ps").onclick = openT;
$("#ps").onkeydown = (e) => e.key === "Enter" && openT();
$("#begin").onclick = () => {
  if (sget("introSeen")) go(1);
  else openMap(true);
};

/* ================= Street-style city-lights map (+ intro) ================= */
const rm = $("#rm"),
  rmw = $("#rmw"),
  cl = $("#cl"),
  cc = cl.getContext("2d");
let ROADS = [],
  lights = [],
  lt0 = 0,
  lraf = 0,
  introMode = false,
  introTimer = 0,
  builtBg = false;
let view = { k: 1, x: 0, y: 0 };
const mk = (s) => () => {
  s |= 0;
  s = (s + 0x6d2b79f5) | 0;
  let t = Math.imul(s ^ (s >>> 15), 1 | s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
/* Story stops (percent of map). Order = page order. */
const TAGS = [
  ["Invitation ticket", 10, 18],
  ["Proposal", 33, 16],
  ["Prenup shot", 50, 24],
  ["Wedding day", 72, 12],
  ["Timeline and map", 60, 38],
  ["Dress code", 85, 52],
  ["Entourage", 92, 74],
  ["Gift", 11, 54],
  ["Question", 19, 76],
  ["RSVP", 25, 36],
];
const BENDS = { 6: -230, 7: 0.1, 4: -0.2 };
function lineD(ang, off, ext = 1400) {
  const dx = Math.cos(ang),
    dy = Math.sin(ang),
    nx = -dy,
    ny = dx,
    cx = 500 + nx * off,
    cy = 280 + ny * off;
  return `M${(cx - dx * ext).toFixed(0)} ${(cy - dy * ext).toFixed(0)}L${(cx + dx * ext).toFixed(0)} ${(cy + dy * ext).toFixed(0)}`;
}
function buildBg() {
  if (builtBg) return;
  builtBg = true;
  const R = mk(11),
    A = 0.55,
    B = A + 1.42;
  let side = "";
  for (let i = -9; i <= 9; i++) side += lineD(A, i * 76 + (R() - 0.5) * 26);
  for (let i = -8; i <= 8; i++) side += lineD(B, i * 92 + (R() - 0.5) * 30);
  side +=
    "M-60 400Q300 250 560 330T1060 210M-60 120Q220 170 420 90T800 40M120 600Q240 470 420 480T760 600";
  const mains = [
    lineD(A, -60),
    lineD(A, 160),
    lineD(B, 70),
    "M-60 330Q300 210 540 300T1060 420",
  ];
  ROADS = [];
  (mains.join("") + side).replace(/M(-?\d+) (-?\d+)L(-?\d+) (-?\d+)/g, (m, a, b, c2, d) => ROADS.push([+a, +b, +c2, +d, mains.join("").includes(m) ? 1 : 0]));
  const iso = (x, y, w, h) =>
    `<g class="bd2"><polygon points="${x},${y} ${x + w},${y - w / 2} ${x + 2 * w},${y} ${x + w},${y + w / 2}"/><polygon points="${x},${y} ${x + w},${y + w / 2} ${x + w},${y + w / 2 + h} ${x},${y + h}"/><polygon points="${x + 2 * w},${y} ${x + w},${y + w / 2} ${x + w},${y + w / 2 + h} ${x + 2 * w},${y + h}"/></g>`;
  const comets = mains
    .map(
      (d, i) =>
        `<path id="mv${i}" d="${d}" fill="none"/><circle class="cm" r="3.2"><animateMotion dur="${15 + i * 4}s" begin="-${i * 5}s" repeatCount="indefinite"><mpath href="#mv${i}"/></animateMotion></circle><circle class="cm" r="2.2"><animateMotion dur="${19 + i * 3}s" begin="-${i * 7 + 3}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#mv${i}"/></animateMotion></circle>`,
    )
    .join("");
  $("#rmbg").innerHTML =
    `<defs><filter id="glw" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <rect class="gd" width="1000" height="560"/>
  <g class="sg"><path class="so" d="${side}"/><path class="mo" d="${mains.join("")}"/><path class="sf" d="${side}"/><path class="mf" d="${mains.join("")}"/>
  <g class="bd2" opacity=".0"></g>${iso(40, 470, 46, 52)}${iso(120, 500, 38, 40)}${iso(150, 440, 30, 34)}${iso(800, 480, 44, 50)}${iso(890, 500, 36, 44)}${iso(850, 430, 30, 30)}</g>
  <circle class="blob" cx="900" cy="80" r="120" fill="#1fd1c6"/><circle class="blob" cx="985" cy="190" r="110" fill="#7a4cff" style="animation-delay:-4s"/><circle class="blob" cx="810" cy="30" r="90" fill="#d23fb0" style="animation-delay:-8s"/>
  <path class="rv" d="M690 -20Q810 70 1040 120L1040 280Q840 220 600 60Z" opacity=".92"/><path id="rvc" d="M640 14Q830 130 1040 205" fill="none"/><text class="rt1"><textPath href="#rvc">HINULUGANG TAKTAK</textPath></text>
  ${comets}`;
}
function gen() {
  lights = [];
  const R = mk((Math.random() * 1e6) | 0),
    cap = innerWidth < 760 ? 1200 : 2500,
    lamps = [],
    wins = [],
    riv = (x, y) => x > 600 && Math.abs(y - (-20 + (x - 680) * 0.647)) < 90;
  SEGS.forEach((s) => {
    const L = Math.hypot(s[2] - s[0], s[3] - s[1]),
      n = Math.max(1, Math.round(L / [13, 19, 30][s[4]])),
      nx = -(s[3] - s[1]) / L,
      ny = (s[2] - s[0]) / L;
    for (let k = 0; k < n; k++) {
      const t = (k + 0.5) / n,
        o = (k % 2 ? 1 : -1) * [4.5, 3.5, 2.5][s[4]];
      lamps.push({ x: s[0] + (s[2] - s[0]) * t + nx * o, y: s[1] + (s[3] - s[1]) * t + ny * o, r: s[4] ? 0.9 : 1.2, p: R() * 6 });
    }
    if (R() < 0.5) lamps.push({ x: s[0], y: s[1], r: 1.7, p: R() * 6 });
  });
  ["hw1", "hw2"].forEach((id) => {
    const p = document.getElementById(id);
    if (!p) return;
    const L = p.getTotalLength();
    for (let d = 0, k = 0; d < L; d += 11, k++) {
      const q = p.getPointAtLength(d);
      if (!riv(q.x, q.y)) lamps.push({ x: q.x + (k % 2 ? 9 : -9), y: q.y, r: 1.5, p: R() * 6 });
    }
  });
  BLKS.forEach((b) => {
    for (let k = 0; k < 3; k++)
      if (R() < 0.75) wins.push({ x: b[0] + (R() - 0.5) * 30, y: b[1] + (R() - 0.5) * 26, r: R() * 0.7 + 0.6, p: R() * 6 });
  });
  const kl = Math.min(1, (cap * 0.72) / lamps.length),
    kw = Math.min(1, (cap * 0.28) / Math.max(1, wins.length));
  lamps.forEach((l) => R() < kl && l.x > -5 && l.x < 1005 && l.y > -5 && l.y < 565 && lights.push(l));
  wins.forEach((l) => R() < kw && l.x > 0 && l.x < 1000 && l.y > 0 && l.y < 560 && lights.push(l));
}
function paintLights(t) {
  const el = (t - lt0) / 1000;
  cc.clearRect(0, 0, 2000, 1120);
  const dk = document.body.classList.contains("dark");
  cc.globalCompositeOperation = dk ? "lighter" : "source-over";
  for (const l of lights) {
    const w = introMode ? Math.max(0, Math.min(1, (el * 230 - l.x) / 220)) : 1;
    if (!w) continue;
    cc.globalAlpha = w * (dk ? 0.3 : 0.55) * (1 + (dk ? 2.3 : 0.8) * Math.sin(t / 500 + l.p) ** 2);
    cc.fillStyle = dk ? (l.r > 1.4 ? "#fff3c4" : "#E5C583") : l.r > 1.4 ? "#d98a12" : l.p > 3 ? "#2f5a3a" : "#e0a030";
    cc.beginPath();
    cc.arc(l.x * 2, l.y * 2, l.r * 2.1, 0, 7);
    cc.fill();
  }
  cc.globalAlpha = 1;
  cc.globalCompositeOperation = "source-over";
  if (!rm.classList.contains("hid")) lraf = requestAnimationFrame(paintLights);
}
let SEGS = [],
  BLKS = [];
const _bb = buildBg;
buildBg = function () {
  const was = builtBg;
  _bb();
  if (was) return;
  const R = mk(7),
    bg = $("#rmbg"),
    D = [
      { o: [610, 290], a: 0.5, s: [46, 40], i: [-9, 9], j: [-9, 9], dn: 1 },
      { o: [940, 430], a: -0.22, s: [88, 76], i: [-6, 6], j: [-6, 6] },
      { o: [170, 250], a: 0.95, s: [84, 70], i: [-8, 8], j: [-8, 8] },
      { o: [420, 540], a: 0.12, s: [92, 72], i: [-8, 8], j: [-5, 5] },
      { o: [560, 20], a: -0.1, s: [90, 70], i: [-7, 7], j: [-3, 5] },
    ],
    rvD = "M690 -20Q810 70 1040 120L1040 280Q840 220 600 60Z",
    riv = (x, y) => x > 590 && Math.abs(y - (-20 + (x - 680) * 0.647)) < 98,
    Wd = [11, 7, 4],
    cls = (n) => (n % 6 === 0 ? 0 : n % 3 === 0 ? 1 : 2),
    rd = ["", "", ""],
    seen = new Set();
  let bl = "",
    bd = "";
  SEGS = [];
  BLKS = [];
  const seg = (p, q, k) => {
    const key = [p.map((v) => v.toFixed(1)).join(), q.map((v) => v.toFixed(1)).join()].sort().join("|");
    if (seen.has(key)) return;
    seen.add(key);
    rd[k] += `M${p[0].toFixed(1)} ${p[1].toFixed(1)}L${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
    SEGS.push([p[0], p[1], q[0], q[1], k]);
  };
  D.forEach((d, di) => {
    const ca = Math.cos(d.a),
      sa = Math.sin(d.a),
      T = (u, v) => [d.o[0] + u * ca - v * sa, d.o[1] + u * sa + v * ca];
    for (let i = d.i[0]; i < d.i[1]; i++)
      for (let j = d.j[0]; j < d.j[1]; j++) {
        const c = T((i + 0.5) * d.s[0], (j + 0.5) * d.s[1]);
        if (c[0] < -60 || c[0] > 1060 || c[1] < -60 || c[1] > 620) continue;
        let best = 0,
          bv = 1e9;
        D.forEach((e, k) => {
          const q = Math.hypot(c[0] - e.o[0], c[1] - e.o[1]) / (e.dn ? 1.5 : 1);
          if (q < bv) ((bv = q), (best = k));
        });
        if (best !== di) continue;
        if (riv(c[0], c[1]) || Math.hypot(c[0] - 640, c[1] - 310) < 48 || Math.hypot(c[0] - 500, c[1] - 388) < 44) continue;
        const s0 = d.s[0],
          s1 = d.s[1],
          p00 = T(i * s0, j * s1),
          p10 = T((i + 1) * s0, j * s1),
          p11 = T((i + 1) * s0, (j + 1) * s1),
          p01 = T(i * s0, (j + 1) * s1);
        seg(p00, p10, cls(j));
        seg(p00, p01, cls(i));
        seg(p01, p11, cls(j + 1));
        seg(p10, p11, cls(i + 1));
        const u0 = i * s0 + Wd[cls(i)] / 2 + 1,
          u1 = (i + 1) * s0 - Wd[cls(i + 1)] / 2 - 1,
          v0 = j * s1 + Wd[cls(j)] / 2 + 1,
          v1 = (j + 1) * s1 - Wd[cls(j + 1)] / 2 - 1,
          P = (u, v) => T(u, v).map((x) => x.toFixed(1)).join(" ");
        bl += `M${P(u0, v0)}L${P(u1, v0)}L${P(u1, v1)}L${P(u0, v1)}Z`;
        if (d.dn) {
          BLKS.push(c);
          for (let a2 = 0; a2 < 2; a2++)
            for (let b2 = 0; b2 < 2; b2++) {
              const w = (u1 - u0) / 2,
                h = (v1 - v0) / 2,
                x0 = u0 + a2 * w + 2 + R() * 3,
                y0 = v0 + b2 * h + 2 + R() * 3,
                x1 = u0 + (a2 + 1) * w - 2 - R() * 3,
                y1 = v0 + (b2 + 1) * h - 2 - R() * 3;
              if (x1 > x0 + 2 && y1 > y0 + 2) bd += `M${P(x0, y0)}L${P(x1, y0)}L${P(x1, y1)}L${P(x0, y1)}Z`;
            }
        } else if (R() < 0.5) {
          BLKS.push(c);
        }
      }
  });
  const net = `<g id="net"><path class="n3" d="${rd[2]}"/><path class="n2o" d="${rd[1]}"/><path class="n2" d="${rd[1]}"/><path class="n1o" d="${rd[0]}"/><path class="n1" d="${rd[0]}"/><path class="nb" d="${bl}"/><path class="nbd" d="${bd}"/>
  <ellipse class="plz" cx="500" cy="388" rx="40" ry="32"/><ellipse class="plzi" cx="500" cy="388" rx="26" ry="20"/>
  <circle class="n1o" cx="640" cy="310" r="27" fill="none"/><circle class="n1" cx="640" cy="310" r="27" fill="none"/><circle class="isl" cx="640" cy="310" r="15"/>
  <path class="n2o" d="M590 310H613M667 310H700M640 262V283M640 337V358"/><path class="n2" d="M590 310H613M667 310H700M640 262V283M640 337V358"/></g>
  <defs><radialGradient id="bloom"><stop offset="0" stop-color="var(--mbloom)" stop-opacity=".55"/><stop offset="1" stop-color="var(--mbloom)" stop-opacity="0"/></radialGradient><clipPath id="rvclip"><path d="${rvD}"/></clipPath></defs>
  <circle cx="610" cy="300" r="230" fill="url(#bloom)" opacity=".22"/>`;
  bg.querySelector("rect.gd").insertAdjacentHTML("afterend", net);
  const H1 = "M-60 480C200 440 380 340 560 250S820 70 1060 -30",
    H2 = "M-60 330Q300 210 540 300T1060 420",
    hw = (id, d) => `<path class="hwo" d="${d}"/><path id="${id}" class="hwf" d="${d}"/><path class="hwc" d="${d}"/>`;
  let tf = "";
  [["hw1", 22], ["hw2", 28]].forEach((h) => {
    for (let k = 0; k < 4; k++)
      tf += `<circle class="tf" r="2.3"><animateMotion dur="${h[1] + k * 3}s" begin="-${k * 6.5}s" repeatCount="indefinite"><mpath href="#${h[0]}"/></animateMotion></circle>`;
  });
  bg.insertAdjacentHTML(
    "beforeend",
    `<g id="top">${hw("hw1", H1)}${hw("hw2", H2)}<g clip-path="url(#rvclip)"><path class="brg" d="${H1}"/><path class="brr" d="${H1}"/></g>${tf}
    <g class="cmp" transform="translate(500 522)"><circle r="21"/><path d="M0-17L5 0H-5zM0 17L5 0H-5z" class="cmn"/><text y="-26" text-anchor="middle">N</text></g></g>`,
  );
};
function buildTags(intro) {
  const s = $("#rmsv"),
    H = 32;
  s.innerHTML = "";
  const P = TAGS.map((t) => ({
    x: t[1] * 10,
    y: t[2] * 5.6,
    w: t[0].length * 9.4 + 30,
  }));
  const edge = (p, u) => {
    const ax = Math.abs(u.x) || 1e-6,
      ay = Math.abs(u.y) || 1e-6,
      t = Math.min((p.w / 2 + 5) / ax, (H / 2 + 12) / ay);
    return { x: p.x + u.x * t, y: p.y + u.y * t };
  };
  let arrows = "";
  for (let i = 0; i < P.length - 1; i++) {
    const a = P[i],
      b = P[i + 1],
      dx = b.x - a.x,
      dy = b.y - a.y,
      d = Math.hypot(dx, dy),
      u = { x: dx / d, y: dy / d },
      s0 = edge(a, u),
      e0 = edge(b, { x: -u.x, y: -u.y });
    const bend =
        BENDS[i] !== undefined
          ? Math.abs(BENDS[i]) < 1
            ? BENDS[i] * d
            : BENDS[i]
          : (i % 2 ? -0.16 : 0.16) * d,
      cx = (s0.x + e0.x) / 2 + -u.y * bend,
      cy = (s0.y + e0.y) / 2 + u.x * bend;
    const dd = `M${s0.x.toFixed(1)} ${s0.y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${e0.x.toFixed(1)} ${e0.y.toFixed(1)}`;
    arrows += `<path class="ar" data-d="${i}" d="${dd}"/><path class="af" d="${dd}" style="opacity:${intro ? 0 : 1}" data-f="${i}"/>`;
  }
  const tags = P.map(
    (p, i) =>
      `<g class="tg" data-i="${i}" tabindex="0" role="button" aria-label="${TAGS[i][0]}" transform="translate(${p.x} ${p.y})" style="animation-delay:${intro ? 1.8 + i * 0.45 : 0}s"><g class="tgi" style="animation-delay:-${i * 0.7}s"><polygon points="-7,${H / 2 - 2} 7,${H / 2 - 2} 0,${H / 2 + 10}"/><rect class="hr" x="${-p.w / 2 - 4}" y="${-H / 2 - 4}" width="${p.w + 8}" height="${H + 8}" rx="10"/><rect x="${-p.w / 2}" y="${-H / 2}" width="${p.w}" height="${H}" rx="7"/><text y="5">${TAGS[i][0].toUpperCase()}</text></g></g>`,
  ).join("");
  s.innerHTML = `<g>${arrows}</g>${tags}`;
  $$("#rmsv .ar").forEach((p, i) => {
    const L = p.getTotalLength();
    if (intro) {
      p.style.strokeDasharray = L;
      p.style.strokeDashoffset = L;
      p.style.transition = "stroke-dashoffset .7s ease-out";
      setTimeout(
        () => {
          p.style.strokeDashoffset = 0;
        },
        2000 + i * 450 + 400,
      );
      setTimeout(
        () => {
          const f = $(`#rmsv .af[data-f="${i}"]`);
          if (f) f.style.opacity = 1;
        },
        2000 + i * 450 + 1100,
      );
    }
  });
  markHere();
  return P;
}
function markHere() {
  $$("#rmsv .tg").forEach((g) =>
    g.classList.toggle("here", +g.dataset.i === cur),
  );
}
const apply = (anim) => {
  rmw.classList.toggle("tr", !!anim);
  rmw.style.transform = `translate(${view.x}px,${view.y}px) scale(${view.k})`;
};
function clampV() {
  view.k = Math.max(view.k, innerWidth / 1000, innerHeight / 560);
  const vw = innerWidth,
    vh = innerHeight,
    w = 1000 * view.k,
    h = 560 * view.k;
  view.x = Math.min(0, Math.max(vw - w, view.x));
  view.y = Math.min(0, Math.max(vh - h, view.y));
}
function fit(anim, focus) {
  const vw = innerWidth,
    vh = innerHeight,
    cov = Math.max(vw / 1000, vh / 560);
  view.k = focus != null ? Math.max(cov, vw < 760 ? 1.5 : 1.75) : cov;
  const t = focus != null ? TAGS[focus] : null,
    cx = t ? t[1] * 10 : 500,
    cy = t ? t[2] * 5.6 : 280;
  view.x = vw / 2 - cx * view.k;
  view.y = vh / 2 - cy * view.k;
  clampV();
  apply(anim);
}
function zoomAt(f, px, py, anim) {
  const k2 = Math.max(Math.max(innerWidth / 1000, innerHeight / 560), Math.min(3.5, view.k * f));
  view.x = px - ((px - view.x) * k2) / view.k;
  view.y = py - ((py - view.y) * k2) / view.k;
  view.k = k2;
  clampV();
  apply(anim);
}
function openMap(intro) {
  introMode = !!intro;
  buildBg();
  rm.classList.remove("hid");
  rmw.classList.toggle("intro", introMode);
  gen();
  lt0 = performance.now();
  cancelAnimationFrame(lraf);
  lraf = requestAnimationFrame(paintLights);
  const P = buildTags(introMode);
  $("#skip").classList.toggle("hid", !introMode);
  $("#rmX").classList.toggle("hid", introMode);
  $("#rmFit").classList.toggle("hid", introMode);
  $("#rmIn").classList.toggle("hid", introMode);
  fit(false, introMode ? null : cur);
  if (introMode) {
    clearTimeout(introTimer);
    introTimer = setTimeout(() => {
      view.k = 2.6;
      view.x = innerWidth / 2 - P[0].x * view.k;
      view.y = innerHeight / 2 - P[0].y * view.k;
      apply(true);
      introTimer = setTimeout(endIntro, 1350);
    }, 6600);
  }
}
function endIntro() {
  clearTimeout(introTimer);
  introMode = false;
  sset("introSeen", "1");
  closeMap();
  go(1);
}
function closeMap() {
  rm.classList.add("hid");
  cancelAnimationFrame(lraf);
  introMode = false;
}
{
  const ptrs = new Map();
  let moved = 0,
    pd = 0,
    startTag = null;
  rm.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button") || introMode) return;
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved = 0;
    startTag = e.target.closest(".tg");
    pd =
      ptrs.size === 2
        ? Math.hypot(
            ...[...ptrs.values()]
              .reduce(
                (a, p) => [Math.abs(a[0] - p.x), Math.abs(a[1] - p.y)],
                [0, 0],
              )
              .map((v, i, a) => v),
          )
        : 0;
  });
  addEventListener("pointermove", (e) => {
    const p = ptrs.get(e.pointerId);
    if (!p) return;
    if (ptrs.size === 1) {
      const dx = e.clientX - p.x,
        dy = e.clientY - p.y;
      moved += Math.abs(dx) + Math.abs(dy);
      view.x += dx;
      view.y += dy;
      clampV();
      apply(false);
    } else if (ptrs.size === 2) {
      const o = [...ptrs.entries()].find(([id]) => id !== e.pointerId)[1],
        d0 = Math.hypot(p.x - o.x, p.y - o.y),
        d1 = Math.hypot(e.clientX - o.x, e.clientY - o.y);
      moved += 20;
      if (d0 > 0)
        zoomAt(d1 / d0, (e.clientX + o.x) / 2, (e.clientY + o.y) / 2, false);
    }
    p.x = e.clientX;
    p.y = e.clientY;
  });
  const up = (e) => {
    if (!ptrs.has(e.pointerId)) return;
    const single = ptrs.size === 1;
    ptrs.delete(e.pointerId);
    if (single && moved < 8 && startTag && !introMode) {
      const i = +startTag.dataset.i;
      closeMap();
      go(i);
    }
  };
  addEventListener("pointerup", up);
  addEventListener("pointercancel", (e) => ptrs.delete(e.pointerId));
  rm.addEventListener(
    "wheel",
    (e) => {
      if (introMode) return;
      e.preventDefault();
      zoomAt(e.deltaY < 0 ? 1.15 : 0.87, e.clientX, e.clientY, false);
    },
    { passive: false },
  );
  rm.addEventListener("keydown", (e) => {
    const t = e.target.closest && e.target.closest(".tg");
    if (t && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      closeMap();
      go(+t.dataset.i);
    }
    if (e.key === "+" || e.key === "=")
      zoomAt(1.3, innerWidth / 2, innerHeight / 2, true);
    if (e.key === "-") zoomAt(0.77, innerWidth / 2, innerHeight / 2, true);
  });
}
addEventListener("resize", () => {
  if (!rm.classList.contains("hid") && !introMode) fit(false, cur);
});
$("#openMap").onclick = () => openMap(false);
$("#rmX").onclick = closeMap;
$("#skip").onclick = endIntro;
$("#rmFit").onclick = () => fit(true, null);
$("#rmIn").onclick = () => zoomAt(1.4, innerWidth / 2, innerHeight / 2, true);

/* ================= Ch2 prenup: polaroids + video ================= */
{
  const caps = [
      "First hello",
      "Road trip",
      "Coffee run",
      "Sunday walk",
      "Our song",
      "Plane seats",
      "Sunset",
      "Lazy day",
      "Birthday",
      "Late night",
      "Adventure",
      "Yes!",
    ],
    dk = $("#deck");
  let order = [...Array(12).keys()],
    sp = false;
  caps.forEach((c, n) => {
    const e = document.createElement("div");
    e.className = "po";
    e.innerHTML = `<i style="background:linear-gradient(135deg,hsl(${205 + (n % 4) * 12} 30% 72%),hsl(${36 + (n % 3) * 6} 42% 56%))"></i>${c}`;
    let x0 = 0,
      y0 = 0;
    e.onpointerdown = (ev) => {
      x0 = ev.clientX;
      y0 = ev.clientY;
    };
    e.onpointerup = (ev) => {
      if (sp) {
        $("#lb").innerHTML =
          `<div><i style="background:${e.firstChild.style.background}"></i>${c}</div>`;
        $("#lb").classList.remove("hid");
        return;
      }
      if (
        order[0] === n &&
        (Math.abs(ev.clientX - x0) > 25 || Math.abs(ev.clientY - y0) < 6)
      ) {
        e.style.transform = `translateX(${ev.clientX > x0 ? 300 : -300}px) rotate(20deg)`;
        setTimeout(() => {
          order.push(order.shift());
          lay();
        }, 280);
      }
    };
    dk.append(e);
  });
  $("#lb").onclick = () => $("#lb").classList.add("hid");
  function lay() {
    $("#cnt").textContent = order[0] + 1 + " / 12";
    dk.classList.toggle("sp2", sp);
    order.forEach((n, k) => {
      const e = dk.children[n];
      e.style.zIndex = 12 - k;
      if (sp) {
        e.style.transform = "none";
        e.style.left = 14 + (n % 4) * 24 + "%";
        e.style.top = 18 + Math.floor(n / 4) * 32 + "%";
      } else {
        e.style.left = e.style.top = "50%";
        e.style.transform = `rotate(${((n % 5) - 2) * 5}deg)`;
      }
    });
  }
  $("#spread").onclick = function () {
    sp = !sp;
    this.textContent = sp ? "Stack them up" : "Spread them out";
    lay();
  };
  lay();
  const vd = $("#vd"),
    has = !!CFG.video.src;
  if (has) {
    vd.src = CFG.video.src;
    if (CFG.video.poster) vd.poster = CFG.video.poster;
    vd.classList.remove("hid");
    $("#vph").classList.add("hid");
  }
  const acts = {
    set() {
      if (has) vd.paused ? vd.play() : vd.pause();
    },
    l() {
      if (has) vd.currentTime = Math.max(0, vd.currentTime - 5);
    },
    r() {
      if (has) vd.currentTime = Math.min(vd.duration || 0, vd.currentTime + 5);
    },
    del() {
      vd.muted = !vd.muted;
    },
    fs() {
      const w = $("#cam");
      (w.requestFullscreen || w.webkitRequestFullscreen || (() => {})).call(w);
    },
  };
  $$("#cam .cb").forEach((b) => {
    const f = () => acts[b.dataset.a] && acts[b.dataset.a]();
    b.onclick = f;
    b.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        f();
      }
    };
  });
}

/* ================= Ch3 wedding day ================= */
const sec3 = pages[3],
  fw = $("#fw"),
  fx = fw.getContext("2d");
let parts = [],
  level = 0.3,
  lastB = 0,
  hoverT = 0,
  rafD = 0;
$("#crys").innerHTML = [
  [40, 100],
  [70, 84],
  [100, 74],
  [150, 144],
  [200, 74],
  [230, 84],
  [260, 100],
  [112, 58],
  [188, 58],
  [150, 90],
  [95, 114],
  [205, 114],
]
  .map(
    (p, i) =>
      `<path class="cr" style="transform-box:fill-box;transform-origin:center;animation-delay:-${i * 0.25}s" d="M${p[0]} ${p[1]}l4 7-4 7-4-7z"/>`,
  )
  .join("");
function enterDay() {
  const d = $("#date");
  d.classList.remove("sh");
  d.innerHTML = [
    ["21", "ln1"],
    ["JANUARY", "ln2"],
    ["2027", "ln3"],
  ]
    .map(
      (l) =>
        `<span class="${l[1]}">${[...l[0]].map((ch) => `<span>${ch}</span>`).join("")}</span>`,
    )
    .join("");
  let n = 0;
  $$("#date span span").forEach(
    (s) => (s.style.animationDelay = n++ * 0.08 + "s"),
  );
  setTimeout(() => d.classList.add("sh"), 2400);
  sec3.style.setProperty("--lit", level);
  cancelAnimationFrame(rafD);
  rafD = requestAnimationFrame(fwLoop);
}
function fwLoop(t) {
  if (cur !== 3) return;
  if (!document.hidden) {
    const w = (fw.width = fw.clientWidth),
      h = (fw.height = fw.clientHeight);
    fx.clearRect(0, 0, w, h);
    if (t - lastB > 2300 - level * 1500 && parts.length < 300) {
      lastB = t;
      const cx0 = w * (0.15 + Math.random() * 0.7),
        cy0 = h * (0.12 + Math.random() * 0.35),
        n = (20 + level * 30) | 0,
        col = ["#E5C583", "#F8F5EE", "#ffd98a", "#9fb9e8"][
          (Math.random() * 4) | 0
        ];
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n,
          v = 1 + Math.random() * 2.2;
        parts.push({
          x: cx0,
          y: cy0,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          l: 1,
          c: col,
        });
      }
    }
    parts = parts.filter((p) => p.l > 0);
    parts.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.vx *= 0.985;
      p.l -= 0.014;
      fx.globalAlpha = Math.max(0, p.l);
      fx.fillStyle = p.c;
      fx.beginPath();
      fx.arc(p.x, p.y, 2, 0, 7);
      fx.fill();
    });
    fx.globalAlpha = 1;
  }
  rafD = requestAnimationFrame(fwLoop);
}
{
  const hb = $("#hold"),
    rp = $("#rp");
  let iv = 0,
    fired = false;
  const set = () => {
    sec3.style.setProperty("--lit", level);
    rp.style.strokeDashoffset = 214 * (1 - level);
  };
  const start = (e) => {
    e.preventDefault();
    clearInterval(iv);
    fired = false;
    iv = setInterval(() => {
      level = Math.min(1, level + 0.02);
      set();
      if (level >= 1 && !fired) {
        fired = true;
        fxConfetti();
        sec3.classList.add("ringing");
        setTimeout(() => sec3.classList.remove("ringing"), 2000);
      }
    }, 40);
  };
  const stop = () => {
    clearInterval(iv);
    iv = setInterval(() => {
      level = Math.max(0.35, level - 0.015);
      set();
      if (level <= 0.35) clearInterval(iv);
    }, 40);
  };
  hb.onpointerdown = start;
  ["pointerup", "pointerleave", "pointercancel"].forEach((ev) =>
    hb.addEventListener(ev, stop),
  );
  set();
  const T = new Date(CFG.dateISO);
  let prev = [];
  const tick = () => {
    const d = (Math.max(0, T - Date.now()) / 1e3) | 0,
      v = [
        (d / 86400) | 0,
        ((d % 86400) / 3600) | 0,
        ((d % 3600) / 60) | 0,
        d % 60,
      ];
    if (!$("#cd").children.length)
      $("#cd").innerHTML = ["Days", "Hours", "Minutes", "Seconds"]
        .map((a) => `<div><b></b><small>${a.toUpperCase()}</small></div>`)
        .join("");
    v.forEach((x, i) => {
      if (prev[i] !== x) {
        const b = $("#cd").children[i].firstChild;
        b.textContent = String(x).padStart(2, "0");
        b.classList.remove("fl");
        void b.offsetWidth;
        b.classList.add("fl");
      }
    });
    prev = v;
  };
  tick();
  setInterval(tick, 1000);
  $("#ics").href =
    "data:text/calendar;charset=utf8," +
    enc(
      "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Abe & Collyn Wedding\nDTSTART:20270121T093000Z\nDTEND:20270121T150000Z\nLOCATION:Antipolo City\nEND:VEVENT\nEND:VCALENDAR",
    );
  $("#gcal").href =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Abe+%26+Collyn+Wedding&dates=20270121T093000Z/20270121T150000Z&location=Antipolo+City";
}
function fxConfetti() {
  for (let i = 0; i < 44; i++) {
    const s = document.createElement("span");
    s.className = "cf";
    s.style.cssText = `left:${Math.random() * 100}vw;background:${["#E5C583", "#1d3466", "#bcd6b0", "#F4EFE6"][i % 4]};animation-delay:${Math.random() * 0.8}s`;
    document.body.append(s);
    setTimeout(() => s.remove(), 3500);
  }
}

/* ================= Ch4 split-flap board + embedded map ================= */
const CH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:&. ",
  WD = [7, 18, 12, 8],
  P = CFG.program;
let act = 0,
  venue = "c",
  mapInit = false;
function flap(fg, txt, delay = 0) {
  txt = String(txt).toUpperCase().padEnd(fg.children.length);
  [...fg.children].forEach((c, k) => {
    let f = 0;
    const max = 7 + (k % 6) + ((Math.random() * 6) | 0);
    setTimeout(
      () => {
        c.classList.add("sp");
        const t = setInterval(() => {
          if (f++ < max) c.textContent = CH[(Math.random() * CH.length) | 0];
          else {
            clearInterval(t);
            c.classList.remove("sp");
            c.textContent = txt[k];
          }
        }, 55);
      },
      delay + k * 26,
    );
  });
}
$("#rows").innerHTML = P.map(
  (_, i) =>
    `<div class="rw" data-r="${i}" tabindex="0" role="button" aria-label="Show venue on the map">${WD.map((w) => `<div class="fg">${'<span class="fc"> </span>'.repeat(w)}</div>`).join("")}</div>`,
).join("");
function sizeBoard() {
  const r = $("#rows");
  if (!r || !r.clientWidth) return;
  const tw = Math.max(6, Math.min(34, Math.floor((r.clientWidth - 17 - 6) / (Math.max(...WD) + 0.6))));
  r.style.setProperty("--tw", tw + "px");
}
new ResizeObserver(sizeBoard).observe($("#rows"));
window.addEventListener("resize", sizeBoard);
document.fonts && document.fonts.ready.then(sizeBoard);
sizeBoard();
function runBoard() {
  const shuf = [...P.keys()].reverse();
  $$("#rows .rw").forEach((r, ri) =>
    [...r.children].forEach((fg, ci) => flap(fg, P[shuf[ri]][ci], ri * 250)),
  );
  setTimeout(
    () =>
      $$("#rows .rw").forEach((r, ri) =>
        [...r.children].forEach((fg, ci) => flap(fg, P[ri][ci], ri * 250)),
      ),
    2600,
  );
}
setInterval(() => {
  if (cur === 4) runBoard();
}, 28000);
function setVenue(v, row) {
  venue = v;
  $("#vc2").classList.toggle("o", v !== "c");
  $("#vr2").classList.toggle("o", v !== "r");
  if (row != null) {
    act = row;
    $$("#rows .rw").forEach((r, i) => r.classList.toggle("act", i === row));
  }
  const f = $("#mif");
  if (mapInit && navigator.onLine) {
    f.style.display = "";
    f.src = `https://www.google.com/maps?q=${enc(VQ(CFG.venues[v]))}&z=17&output=embed`;
  }
}
$("#rows").onclick = (e) => {
  const r = e.target.closest(".rw");
  if (r) setVenue(P[+r.dataset.r][4], +r.dataset.r);
};
$("#vc2").onclick = () => setVenue("c");
$("#vr2").onclick = () => setVenue("r");
function enterProg() {
  runBoard();
  if (!mapInit) {
    mapInit = true;
    const f = $("#mif");
    let ok = false;
    f.onload = () => (ok = true);
    setVenue("c", 1);
    setTimeout(() => {
      if (!ok || !navigator.onLine) f.style.display = "none";
    }, 8000);
  }
}
$("#fbl").innerHTML = [...Array(120)]
  .map(
    (_, i) =>
      `<circle cx="${20 + ((i * 47) % 290)}" cy="${30 + ((i * 83) % 170)}" r="${i % 4 ? 0.9 : 1.5}" style="animation-delay:-${i % 6}s"/>`,
  )
  .join("");
/* ================= Ch5 what to wear ================= */
{
  const SET = {
    g: [
      ["Navy 1", "#2D456E"],
      ["Navy 2", "#3C5B91"],
      ["Blue 1", "#7590BF"],
      ["Blue 2", "#ADC6ED"],
      ["Pale 1", "#D3DFF5"],
      ["Pale 2", "#EBF1FA"],
    ],
    e: [
      ["Ninang", "#D2B89A", "f"],
      ["Ninong", "#1C1C1C", "m"],
      ["Bridesmaid", "#E0C8AC", "f"],
      ["Groomsmen", "#F2E8D5", "m"],
    ],
  };
  let tab = "e";
  const view = (g) => {
    $("#suitG").style.opacity = !g || g === "m" ? 1 : 0.15;
    $("#gownG").style.opacity = !g || g === "f" ? 1 : 0.15;
  };
  const paint = (c, g) => {
    $("#jk").style.fill = c;
    $("#dr").style.fill = c;
    $("#pt").style.fill = c;
    view(g);
    $("#cnote").textContent = "";
  };
  const draw = () => {
    $("#chips").innerHTML = SET[tab]
      .map(
        (s) =>
          `<button class="chip" data-c="${s[1]}" data-g="${s[2] || ""}"><i style="background:${s[1]}"></i>${s[0]}</button>`,
      )
      .join("");
    $("#chips .chip").click();
  };
  $("#chips").onclick = (e) => {
    const c = e.target.closest(".chip");
    if (!c) return;
    $$(".chip").forEach((x) => x.classList.remove("on"));
    c.classList.add("on");
    paint(c.dataset.c, c.dataset.g);
  };
  $("#wt").onclick = (e) => {
    const w = e.target.dataset.w;
    if (!w) return;
    tab = w;
    $$("#wt .b").forEach((b) => b.classList.toggle("o", b.dataset.w !== w));
    draw();
  };
  $$("#wt .b").forEach((b) => b.classList.toggle("o", b.dataset.w !== tab));
  draw();
}

/* ================= Ch6 cast (centered credits) ================= */
$("#crIn").innerHTML = CFG.cast
  .map(
    (c) =>
      `<em>${c[0]}</em>` +
      c[1].map((n) => `<strong>${n.replace("&", "&amp;")}</strong>`).join(""),
  )
  .join("");
$("#pc").onclick = function () {
  const p = $("#cr").classList.toggle("p");
  this.innerHTML = `<i data-i="${p ? "play" : "pause"}"></i><span>${p ? "Play" : "Pause"} the credits</span>`;
  icons(this);
};

/* ================= Ch7 RSVP ================= */
function petals() {
  const h = $("#petals");
  if (h.children.length) return;
  h.innerHTML = [...Array(14)]
    .map(
      (_, i) =>
        `<span style="left:${i * 7.5}%;animation-duration:${9 + (i % 5) * 2}s;animation-delay:-${i * 1.3}s"></span>`,
    )
    .join("");
}
{
  const fs = $("#fs"),
    btn = $("#snd"),
    F = ["nm", "att", "diet", "song", "adv"];
  let att = "",
    touched = false,
    sending = false;
  const cl = (v, m) => String(v).replace(/\s+/g, " ").trim().slice(0, m);
  if (CFG.guest) $("#nm").value = CFG.guest;
  const check = () => {
    const o = {};
    if (cl($("#nm").value, 80).length < 2) o.nm = "Please enter your name";
    if (!att) o.att = "Please choose one";
    if (att === "y") {
      if (!cl($("#diet").value, 300)) o.diet = "Please share dietary needs, or tap None";
      if (!cl($("#song").value, 300)) o.song = "Please share one song";
      if (!cl($("#adv").value, 300)) o.adv = "Please share some advice, or tap No suggestion";
    }
    return o;
  };
  const show = (o) =>
    F.forEach((f) => {
      const m = $("#e-" + f),
        el = f === "att" ? $("#rv .row") : $("#" + f);
      m.textContent = o[f] || "";
      m.classList.toggle("hid", !o[f]);
      el.classList.toggle("bad", !!o[f]);
    });
  const upd = () => {
    const o = check(),
      ok = !Object.keys(o).length;
    btn.classList.toggle("dis", !ok);
    btn.setAttribute("aria-disabled", !ok);
    if (touched) show(o);
    return o;
  };
  $$("#rv [data-a]").forEach(
    (b) =>
      (b.onclick = () => {
        att = b.dataset.a;
        const no = att === "n";
        $$("#rv [data-a]").forEach((x) => x.classList.toggle("o", x !== b));
        fs.classList.toggle("off", no);
        fs.setAttribute("aria-disabled", no);
        $$("#fs input,#fs textarea,#fs .chipq").forEach((el) => (el.disabled = no));
        $("#resp").textContent = no
          ? "We'll miss you, and we're grateful you told us. Just send your reply below."
          : "Yay! Save some energy for the dance floor.";
        upd();
      }),
  );
  $$("#rv .chipq").forEach(
    (b) =>
      (b.onclick = () => {
        $("#" + b.dataset.fill).value = b.dataset.v;
        upd();
      }),
  );
  $$("#rv input,#rv textarea").forEach((el) => el.addEventListener("input", upd));
  $("#rv").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") {
      e.preventDefault();
      btn.click();
    }
  });
  btn.onclick = async () => {
    if (sending) return;
    touched = true;
    const o = upd();
    const first = F.find((f) => o[f]);
    if (first) {
      const rv = $("#rv");
      rv.classList.remove("shake");
      void rv.offsetWidth;
      rv.classList.add("shake");
      const t = first === "att" ? $("#rv [data-a]") : $("#" + first);
      t.scrollIntoView({ block: "center", behavior: "smooth" });
      t.focus({ preventScroll: true });
      return;
    }
    sending = true;
    btn.classList.add("ld");
    $("#rerr").classList.add("hid");
    const yes = att === "y";
    const body = new URLSearchParams({
      name: cl($("#nm").value, 80),
      attending: yes ? "Yes" : "No",
      diet: yes ? cl($("#diet").value, 300) : "",
      song: yes ? cl($("#song").value, 300) : "",
      advice: yes ? cl($("#adv").value, 300) : "",
    });
    try {
      await fetch(CFG.rsvpUrl, { method: "POST", mode: "no-cors", body });
      btn.classList.add("hid");
      $("#ok").classList.remove("hid");
      if (window.confetti) {
        const colors = document.body.classList.contains("dark")
          ? ["#E5C583", "#F8F5EE", "#B8924A", "#7590BF"]
          : ["#9CB88F", "#3F5F45", "#F6F1E7", "#D2B89A"];
        window.confetti({
          particleCount: 140,
          spread: 100,
          origin: { y: 0.6 },
          colors,
        });
        setTimeout(
          () =>
            window.confetti({
              particleCount: 90,
              angle: 60,
              spread: 70,
              origin: { x: 0, y: 0.7 },
              colors,
            }),
          350,
        );
        setTimeout(
          () =>
            window.confetti({
              particleCount: 90,
              angle: 120,
              spread: 70,
              origin: { x: 1, y: 0.7 },
              colors,
            }),
          650,
        );
      }
    } catch (err) {
      sending = false;
      btn.classList.remove("ld");
      $("#rerr").classList.remove("hid");
    }
  };
}

/* ================= Ch8 gifts (no payment details) ================= */
function enterGift() {
  $("#big").innerHTML = "Your presence is the gift."
    .split(" ")
    .map(
      (w, wi) =>
        `<span class="w">${[...w].map((c, ci) => `<span class="ch1" style="animation-delay:${(wi * 5 + ci) * 0.06}s">${c}</span>`).join("")}</span>`,
    )
    .join("");
  const h = $("#hearts");
  if (!h.children.length)
    h.innerHTML = [...Array(14)]
      .map(
        (_, i) =>
          `<span style="left:${i * 7}%;animation-duration:${9 + (i % 5) * 2}s;animation-delay:-${i * 1.7}s"><svg viewBox="0 0 24 24"><path d="${i % 3 ? "M12 21C4 14 3 9 6 6.5S11 5 12 8c1-3 4.5-3.5 6-1.5S20 14 12 21z" : "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"}"/></svg></span>`,
      )
      .join("");
}
$("#gbox").onclick = () => {
  const g = $("#gbox");
  g.classList.add("re");
  fxConfetti();
  setTimeout(() => g.classList.remove("re"), 3200);
};

/* ================= Ch9 chat ================= */
{
  const F = [
    [
      "Can I bring my kids?",
      "We love your little ones. Please check your invitation for the seats reserved for you.",
    ],
    [
      "Can I bring a plus-one?",
      "Your invitation shows how many seats we saved for you.",
    ],
    [
      "Can I take photos during the ceremony?",
      "We have a photographer, so please stay unplugged during the ceremony. At the reception, go wild.",
    ],
    ["Where do I park?", "Parking details will be shared closer to the date."],
    [
      "What's the weather like?",
      "January in Antipolo is typically dry and mild. We will update this closer to the date.",
    ],
    [
      "What time should I arrive?",
      "Please be seated at least 30 minutes before the ceremony.",
    ],
  ];
  $("#bubs").innerHTML = F.map(
    (f, i) => `<button class="bub" data-i="${i}">${f[0]}</button>`,
  ).join("");
  $("#bubs").onclick = (e) => {
    const i = e.target.dataset.i;
    if (i == null) return;
    e.target.remove();
    const l = $("#log");
    l.insertAdjacentHTML(
      "beforeend",
      `<div class="q">${F[i][0]}</div><div class="a dots"><span></span><span></span><span></span></div>`,
    );
    const t = l.lastChild;
    l.scrollTop = 1e5;
    setTimeout(() => {
      t.classList.remove("dots");
      t.textContent = F[i][1];
      l.scrollTop = 1e5;
    }, 1200);
  };
}

icons();
go(0);