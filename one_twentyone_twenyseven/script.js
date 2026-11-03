/* ================= CONFIG (edit me; PLACEHOLDER = not confirmed yet) ================= */
const Q = new URLSearchParams(location.search);
const CFG = {
  names: "Abe & Collyn", // brief says both "Aba" and "Abe"
  dateISO: "2027-01-21T17:30:00+08:00", // PLACEHOLDER time
  cer: "5:30 PM",
  rec: "7:00 PM", // PLACEHOLDER
  rsvpBy: "[RSVP-by date]", // PLACEHOLDER
  rsvpUrl: "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL", // PLACEHOLDER
  guest: Q.get("to") || "Tita Baby",
  seats: Math.max(1, parseInt(Q.get("seats")) || 2),
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
  $("#nx").style.display = cur ? "" : "none";
  $("#rmsv") && markHere();
  if (cur === 3) enterDay();
  if (cur === 4) enterProg();
  if (cur === 6) {
    const c = $("#crIn");
    c.style.animation = "none";
    void c.offsetWidth;
    c.style.animation = "";
  }
  if (cur === 8) enterGift();
  if (cur === 7) petals();
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
  `${CFG.venues.c.name}<br><span class="sm">${CFG.venues.c.addr}</span>${mapL(CFG.venues.c)}`;
$("#eRec").innerHTML =
  `${CFG.venues.r.name}, ${CFG.rec}<br><span class="sm">${CFG.venues.r.addr}</span>${mapL(CFG.venues.r)}`;
$("#jg").innerHTML = [
  ["Wedding day", 3],
  ["Programme", 4],
  ["Getting there", 4],
  ["Dress code", 5],
  ["Entourage", 6],
  ["RSVP", 7],
  ["Gifts", 8],
  ["FAQ", 9],
]
  .map((a) => `<button class="p" data-go="${a[1]}">${a[0]}</button>`)
  .join("");
$("#tb").value = CFG.guest;
$("#tf").onclick = () => {
  const v = $("#tb").value.trim();
  $("#tr").textContent = v
    ? `${v}: Table 4 (sample, real seating to be added)`
    : "";
};
$("#chartT").onclick = function () {
  this.classList.toggle("o");
  $("#chart").classList.toggle("hid");
};
$("#inf").onclick = () => $("#modal").classList.remove("hid");
$("#mX").onclick = () => $("#modal").classList.add("hid");
$("#modal").onclick = (e) => {
  if (e.target.id === "modal") $("#modal").classList.add("hid");
};
$("#justD").onclick = () => $("#modal").classList.remove("hid");
const TH = [
  ["dark", "#1E293B"],
  ["light", "#F9F6F0"],
];
$("#sw").innerHTML = $("#sw2").innerHTML = TH.map(
  (t) =>
    `<button data-th="${t[0]}" style="background:${t[1]}" aria-label="${t[0]} mode"></button>`,
).join("");
document.addEventListener("click", (e) => {
  const t = e.target.dataset && e.target.dataset.th;
  if (!t) return;
  manual = true;
  document.body.classList.toggle("dark", t === "dark");
});

/* ================= Ambient layers: fog, glows, outlined clouds, slow plane, particles ================= */
{
  const cloud = (i, l) =>
    `<svg class="cld" viewBox="0 0 160 80" style="top:${4 + i * 24}%;width:${(l ? 200 : 130) + i * 30}px;animation-duration:${(l ? 70 : 110) + i * 14}s;animation-delay:-${i * 19}s;opacity:${l ? 0.95 : 0.6}"><path d="M24 64a20 20 0 0 1 2-40 30 30 0 0 1 56-8 26 26 0 0 1 46 10 22 22 0 0 1 2 38z"/><path class="in" d="M44 52h70"/></svg>`;
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
    [0, 1, 2, 3].map((i) => cloud(i, 0)).join("") +
    [0, 1, 2, 3].map((i) => cloud(i, 1)).join("") +
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
        cx.fillStyle = d ? "#E5C583" : "#b8924a";
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

/* ================= City-lights connection map (+ intro) ================= */
const rm = $("#rm"),
  cl = $("#cl"),
  cc = cl.getContext("2d");
let lights = [],
  lt0 = 0,
  lraf = 0,
  introMode = false,
  introTimer = 0;
const MD = "M110 340C240 190 330 430 470 300S700 150 830 260 920 330 940 240";
const lake = { x: 560, y: 450, rx: 190, ry: 80 };
function gen() {
  lights = [];
  const cl2 = [
    [240, 300, 95, 900],
    [850, 250, 60, 380],
    [560, 160, 80, 150],
    [420, 380, 70, 160],
  ];
  cl2.forEach((c) => {
    for (let i = 0; i < c[3]; i++) {
      const a = Math.random() * 6.28,
        r =
          Math.abs((Math.random() + Math.random() + Math.random()) / 3 - 0.5) *
          2 *
          c[2] *
          1.6,
        x = c[0] + Math.cos(a) * r,
        y = c[1] + Math.sin(a) * r * 0.8;
      if (((x - lake.x) / lake.rx) ** 2 + ((y - lake.y) / lake.ry) ** 2 < 1)
        continue;
      lights.push({ x, y, r: Math.random() * 1.6 + 0.5, p: Math.random() * 6 });
    }
  });
  for (let i = 0; i < 160; i++) {
    const t = Math.random();
    lights.push({
      x: 110 + t * 830,
      y: 330 - Math.sin(t * 6) * 70 + (Math.random() - 0.5) * 20,
      r: 0.8,
      p: Math.random() * 6,
    });
  }
}
function paintLights(t) {
  const w = (cl.width = innerWidth),
    h = (cl.height = innerHeight),
    s = Math.min(w / 1000, h / 560),
    ox = (w - 1000 * s) / 2,
    oy = (h - 560 * s) / 2,
    el = (t - lt0) / 1000;
  cc.fillStyle = "#050b1c";
  cc.fillRect(0, 0, w, h);
  cc.fillStyle = "#08142e";
  cc.beginPath();
  cc.ellipse(
    ox + lake.x * s,
    oy + lake.y * s,
    lake.rx * s,
    lake.ry * s,
    0,
    0,
    7,
  );
  cc.fill();
  lights.forEach((l) => {
    const wave = introMode
      ? Math.max(0, Math.min(1, (el * 160 - (l.x - 80)) / 200))
      : 1;
    if (!wave) return;
    cc.globalAlpha = wave * (0.35 + 0.65 * Math.sin(t / 500 + l.p) ** 2);
    cc.fillStyle = l.r > 1.5 ? "#fff3c4" : "#E5C583";
    cc.beginPath();
    cc.arc(ox + l.x * s, oy + l.y * s, l.r * s * 1.2, 0, 7);
    cc.fill();
  });
  cc.globalAlpha = 1;
  if (!rm.classList.contains("hid")) lraf = requestAnimationFrame(paintLights);
}
function buildMap(intro) {
  const s = $("#rmsv");
  s.innerHTML = `<ellipse class="lake" cx="${lake.x}" cy="${lake.y}" rx="${lake.rx}" ry="${lake.ry}" opacity=".0"/><text class="lb" x="${lake.x}" y="${lake.y + 6}">Laguna de Bay</text><text class="lb" x="240" y="440">Metro Manila</text><text class="lb" x="860" y="350">Antipolo</text>
  <path class="rt" d="${MD}" opacity=".3"/><path id="rg" class="rt g" d="${MD}"/>
  <g id="pm"><path d="M0 0L-14 7-10 0-14-7z" fill="#E5C583" transform="scale(1.3)"/></g>`;
  const p = $("#rg"),
    L = p.getTotalLength();
  p.style.setProperty("--L", L);
  p.style.strokeDasharray = L;
  p.style.strokeDashoffset = intro ? L : 0;
  p.style.transition = intro ? "stroke-dashoffset 5s ease-in-out" : "none";
  const pts = [];
  for (let i = 1; i <= 9; i++) {
    const f = (i - 1) / 8,
      pt = p.getPointAtLength(L * f);
    pts.push(pt);
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "st");
    g.dataset.i = i;
    g.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
    g.style.animationDelay = intro ? f * 5 + 0.4 + "s" : "0s";
    g.innerHTML = `<title>${names[i]}</title><circle class="gl" r="24"/><circle class="nd" r="14"/><text y="4">${i}</text><text class="tt" y="-26">${names[i].toUpperCase().slice(0, 14)}</text>`;
    g.onclick = () => {
      if (!introMode) {
        closeMap();
        go(i);
      }
    };
    s.append(g);
  }
  const pl = $("#pm");
  const an = document.createElementNS(NS, "animateMotion");
  an.setAttribute("dur", intro ? "5s" : "14s");
  an.setAttribute("rotate", "auto");
  an.setAttribute("repeatCount", intro ? "1" : "indefinite");
  an.setAttribute("fill", "freeze");
  an.innerHTML = `<mpath href="#rg"/>`;
  pl.append(an);
  if (intro) an.beginElement && setTimeout(() => an.beginElement(), 0);
  if (intro)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => (p.style.strokeDashoffset = 0)),
    );
  markHere();
  return pts;
}
function markHere() {
  $$("#rmsv .st").forEach((g) =>
    g.classList.toggle("here", +g.dataset.i === cur),
  );
}
function openMap(intro) {
  introMode = !!intro;
  rm.classList.remove("hid", "zoom");
  gen();
  lt0 = performance.now();
  cancelAnimationFrame(lraf);
  lraf = requestAnimationFrame(paintLights);
  $("#rmk").textContent = `Abe & Collyn · nine stops`;
  const pts = buildMap(introMode);
  $("#skip").classList.toggle("hid", !introMode);
  $("#rmX").classList.toggle("hid", introMode);
  if (introMode) {
    clearTimeout(introTimer);
    introTimer = setTimeout(() => {
      const f = pts[0];
      rm.style.setProperty("--zo", `${f.x / 10}% ${f.y / 5.6}%`);
      rm.classList.add("zoom");
      introTimer = setTimeout(endIntro, 1300);
    }, 6200);
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
$("#openMap").onclick = () => openMap(false);
$("#rmX").onclick = closeMap;
$("#skip").onclick = endIntro;

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
  const v = $("#vd"),
    has = !!CFG.video.src;
  if (has) {
    v.src = CFG.video.src;
    v.poster = CFG.video.poster;
    $("#vph").classList.add("hid");
  }
  const pi = $("#vpi");
  const setI = (p) =>
    pi.setAttribute("d", p ? "M8 5v14M16 5v14" : "M7 4l13 8-13 8z");
  $("#vpl").onclick = () => {
    if (!has) return;
    v.paused ? v.play() : v.pause();
  };
  v.onplay = () => setI(1);
  v.onpause = () => setI(0);
  v.ontimeupdate = () =>
    ($("#vpr").value = (v.currentTime / (v.duration || 1)) * 100);
  $("#vpr").oninput = (e) => {
    if (has) v.currentTime = (e.target.value / 100) * v.duration;
  };
  $("#vmu").onclick = () => (v.muted = !v.muted);
  $("#vfs").onclick = () =>
    $("#vid").requestFullscreen && $("#vid").requestFullscreen();
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
    f.src = `https://www.google.com/maps?q=${enc(VQ(CFG.venues[v]))}&output=embed`;
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
  const fs = $("#fs");
  $$("#rv [data-a]").forEach(
    (b) =>
      (b.onclick = () => {
        const no = b.dataset.a === "n";
        $$("#rv [data-a]").forEach((x) => x.classList.toggle("o", x !== b));
        fs.classList.toggle("off", no);
        fs.setAttribute("aria-disabled", no);
        $$("#fs input,#fs textarea,#fs button").forEach(
          (el) => (el.disabled = no),
        );
        $("#resp").textContent = no
          ? "We'll miss you, and we're grateful you told us. Just send your reply below."
          : "Yay! Save some energy for the dance floor.";
      }),
  );
  let att = "y";
  $$("#rv [data-a]").forEach((b) =>
    b.addEventListener("click", () => (att = b.dataset.a)),
  );
  $("#snd").onclick = async () => {
    const btn = $("#snd");
    btn.disabled = true;
    $("#rerr").classList.add("hid");
    const body = new URLSearchParams({
      guest: CFG.guest,
      attending: att === "y" ? "Yes" : "No",
      seats: att === "y" ? 1 : 0,
      diet: $("#diet").value,
      song: $("#song").value,
      advice: $("#adv").value,
    });
    try {
      await fetch(CFG.rsvpUrl, { method: "POST", mode: "no-cors", body });
      btn.classList.add("hid");
      $("#ok").classList.remove("hid");
      if (window.confetti)
        window.confetti({ particleCount: 220, spread: 90, origin: { y: 0.6 } });
    } catch (err) {
      btn.disabled = false;
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