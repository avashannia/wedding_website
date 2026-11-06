/* ================= EDIT YOUR DETAILS HERE ================= */
const CONFIG = {
  names: "Nancy & John", // replace with your names
  date: new Date(2027, 0, 21, 16, 0, 0), // year, month (0 = Jan), day, hour, minute
  dateLabel: "21.01.2027",
  rsvpDeadline: "1 December 2026", // placeholder – set your real RSVP date
  maxGuests: 6,
  songUrl: "", // Paste your MP3 link here, e.g. "music/song.mp3" or a full URL
  flowerImages: ["flower.png", "assets/flower-gold.svg"], // used in rotation at section corners
  flowerImage: "", // optional: ONE image (e.g. your own PNG) to use everywhere instead
  heroPhoto: "", // Hero arch photo
  photos: [
    // Gallery photos (src = image URL, cap = caption)
    { src: "", cap: "Our first trip" },
    { src: "", cap: "The proposal" },
    { src: "", cap: "Sunday mornings" },
    { src: "", cap: "With family" },
    { src: "", cap: "Engagement day" },
    { src: "", cap: "Just us" },
  ],
  ceremony: {
    name: "Parish of the Immaculate Heart of Mary",
    addr: "Hinulugang Taktak Rd., Brgy. Dela Paz, Antipolo City",
    when: "21 January 2027 · 4:00 PM",
    note: "",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(
        "Parish of the Immaculate Heart of Mary, Hinulugang Taktak Rd., Brgy. Dela Paz, Antipolo City",
      ),
  },
  reception: {
    name: "The Chandelier Events Place",
    addr: "267 San Jose Ext. St., Antipolo",
    when: "6:00 PM onward",
    note: "Cocktails to follow right after the ceremony.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(
        "The Chandelier Events Place, 267 San Jose Ext. St., Antipolo",
      ),
  },
  timeline: [
    ["15:00", "Guest arrival", "Settle in and say hello"],
    ["16:00", "Ceremony", "A little laughter, a little tears"],
    ["17:00", "Cocktail hour", "Drinks and photos"],
    ["18:00", "Reception dinner", "Toasts and a shared meal"],
    ["20:00", "First dance & cake", "Then the dance floor opens"],
    ["23:00", "End of evening", "Sparklers and goodbyes"],
  ],
  dressText: "Semi-formal attire in harmony with our wedding colors.",
  dressLadies: "Long dress, knee-length dress or cocktail dress",
  dressGents: "Long pants, black coat and tie",
  dressAvoid: "Kindly avoid jeans and sneakers.",
  dressColors: [
    ["Navy", "#14213D"],
    ["Royal blue", "#3F5A8C"],
    ["Light blue", "#A9B9DA"],
    ["Gold", "#C9A24B"],
    ["Cream", "#F3EEE4"],
    ["White", "#FFFFFF"],
    ["Sage", "#A8C3A0"],
  ],
  entourage: [
    ["Parents", ["[Name] & [Name]", "[Name] & [Name]"]],
    ["Principal Sponsors", ["[Name] & [Name]"]],
    ["Best Man & Maid of Honor", ["[Name] & [Name]"]],
    ["Groomsmen & Bridesmaids", ["[Name] & [Name]"]],
    [
      "Secondary Sponsors",
      [
        "Candle: [Name] & [Name]",
        "Veil: [Name] & [Name]",
        "Cord: [Name] & [Name]",
      ],
    ],
    ["Little Ones", ["Flower girls: [Name]", "Ring bearer: [Name]"]],
  ],
};
/* ========================================================== */

const $ = (id) => document.getElementById(id),
  root = document.documentElement;
const store = (k, v) => {
  try {
    if (v === undefined) return localStorage.getItem(k);
    localStorage.setItem(k, v);
  } catch (_) {
    return null;
  }
};
const FLOWER_PH =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><circle cx='110' cy='110' r='104' fill='#8A9BC4' fill-opacity='.25' stroke='#C9A24B' stroke-width='3' stroke-dasharray='9 7'/><text x='110' y='104' text-anchor='middle' font-family='Arial' font-size='20' fill='#C9A24B'>FLOWER</text><text x='110' y='132' text-anchor='middle' font-family='Arial' font-size='17' fill='#C9A24B'>PNG HERE</text></svg>",
  );
const media = (src, alt) =>
  src
    ? '<img src="' + src + '" alt="' + alt + '">'
    : '<div class="ph">PHOTO</div>';

/* ---------- text ---------- */
$("nm").textContent = CONFIG.names;
$("dt").textContent = CONFIG.dateLabel;
$("by").textContent = "Please respond by " + CONFIG.rsvpDeadline;
$("ft").textContent = "With love, " + CONFIG.names;
$("hp").innerHTML = media(CONFIG.heroPhoto, "The couple");
$("dd").textContent = CONFIG.dressText;
$("da").textContent = CONFIG.dressAvoid;
$("dl").textContent = CONFIG.dressLadies;
$("dg").textContent = CONFIG.dressGents;
/* gold ornament divider under every section heading */
document
  .querySelectorAll("section h2")
  .forEach((h) =>
    h.insertAdjacentHTML(
      "afterend",
      '<div class="orn" aria-hidden="true"><b></b></div>',
    ),
  );

/* ---------- date strip (5 days around the wedding date) ---------- */
$("days").innerHTML = [-2, -1, 0, 1, 2]
  .map((o) => {
    const d = new Date(
      CONFIG.date.getFullYear(),
      CONFIG.date.getMonth(),
      CONFIG.date.getDate() + o,
    );
    return o
      ? "<span>" + d.getDate() + "</span>"
      : "<b>" + d.getDate() + "</b>";
  })
  .join("");

/* ---------- venues, timeline, dress code, entourage ---------- */
function venue(id, v) {
  $(id).innerHTML =
    "<p>" +
    v.name +
    "<br>" +
    v.addr +
    '<br><b style="font-weight:500">' +
    v.when +
    "</b></p>" +
    (v.note ? "<p>" + v.note + "</p>" : "") +
    '<p style="margin-top:16px"><a class="btn" href="' +
    v.mapUrl +
    '" target="_blank" rel="noopener">View on map</a></p>' +
    '<div class="map frame"><div class="ph">MAP</div></div>';
}
venue("cer", CONFIG.ceremony);
venue("rec", CONFIG.reception);
$("tl").innerHTML = CONFIG.timeline
  .map(
    (t, i) =>
      '<div class="row rv" style="--d:' +
      i * 0.12 +
      's"><span class="tm">' +
      t[0] +
      "</span><span><b>" +
      t[1] +
      "</b><br>" +
      t[2] +
      "</span></div>",
  )
  .join("");
$("sw").innerHTML = CONFIG.dressColors
  .map(
    (c) =>
      '<i tabindex="0" data-n="' +
      c[0] +
      '" style="background:' +
      c[1] +
      '" aria-label="' +
      c[0] +
      '"></i>',
  )
  .join("");
$("en").innerHTML = CONFIG.entourage
  .map(
    (g, i) =>
      '<div class="ac"><button aria-expanded="false" aria-controls="eg' +
      i +
      '"><span>' +
      g[0] +
      '</span><span>+</span></button><div id="eg' +
      i +
      '">' +
      g[1].map((n) => "<p>" + n + "</p>").join("") +
      "</div></div>",
  )
  .join("");
document.querySelectorAll(".ac>button").forEach(
  (b) =>
    (b.onclick = () => {
      const a = b.parentNode,
        open = !a.classList.contains("open");
      document.querySelectorAll(".ac").forEach((x) => {
        x.classList.remove("open");
        x.firstChild.setAttribute("aria-expanded", "false");
        x.firstChild.lastChild.textContent = "+";
      });
      if (open) {
        a.classList.add("open");
        b.setAttribute("aria-expanded", "true");
        b.lastChild.textContent = "−";
      }
    }),
);

/* ---------- flower image slots + pearls on every section ---------- */
const FL = [
  ["top:-30px;right:-38px", 20],
  ["bottom:-30px;left:-40px", -25],
  ["top:90px;left:-46px", -15],
  ["bottom:-34px;right:-40px", 30],
];
document.querySelectorAll("section").forEach((s, i) => {
  [FL[(i % 2) * 2], FL[(i % 2) * 2 + 1]].forEach((f, j) => {
    const im = new Image();
    im.className = "fl";
    im.alt = "";
    const fi = CONFIG.flowerImages;
    im.src = CONFIG.flowerImage || fi[(i + j) % fi.length];
    im.onerror = () => {
      im.onerror = null;
      im.src = FLOWER_PH;
    };
    im.style.cssText = f[0] + ";transform:rotate(" + f[1] + "deg)";
    s.appendChild(im);
  });
  [
    [
      "top:" + (60 + ((i * 7) % 40)) + "px;left:" + (8 + ((i * 17) % 70)) + "%",
      14,
    ],
    [
      "bottom:" +
        (50 + ((i * 9) % 30)) +
        "px;right:" +
        (5 + ((i * 11) % 30)) +
        "%",
      9,
    ],
  ].forEach((p) => {
    const e = document.createElement("i");
    e.className = "pl";
    e.style.cssText = p[0] + ";width:" + p[1] + "px;height:" + p[1] + "px";
    s.appendChild(e);
  });
});

/* ---------- gallery: stack + grid ---------- */
const P = CONFIG.photos,
  N = P.length,
  st = $("stack");
let ord = P.map((_, i) => i),
  mode = "stack",
  cur = 0,
  swiped = false;
const cards = P.map((p, i) => {
  const c = document.createElement("div");
  c.className = "card";
  c.tabIndex = 0;
  c.setAttribute("role", "button");
  c.setAttribute("aria-label", p.cap);
  c.innerHTML = media(p.src, p.cap).replace(
    ">PHOTO<",
    ">PHOTO " + (i + 1) + "<",
  );
  st.appendChild(c);
  c.onclick = () => {
    if (swiped) return;
    const pos = ord.indexOf(i);
    if (mode === "grid" || pos === 0) openLb(i);
    else {
      ord.splice(pos, 1);
      ord.unshift(i);
      lay();
    } // bring tapped card to the front
  };
  c.onkeydown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      c.click();
    }
  };
  return c;
});
$("dots").innerHTML = P.map(() => "<i></i>").join("");
function lay() {
  cards.forEach((c, i) => {
    const p = ord.indexOf(i);
    c.classList.toggle("front", p === 0 && mode === "stack");
    c.style.zIndex = N - p;
    c.style.transform =
      "translateY(" +
      -p * 26 +
      "px) rotate(" +
      [0, -5, 4, -3, 5, -4][p % 6] +
      "deg)";
  });
  [...$("dots").children].forEach((d, i) =>
    d.classList.toggle("on", i === ord[0]),
  );
}
const go = (d) => {
  d > 0 ? ord.push(ord.shift()) : ord.unshift(ord.pop());
  lay();
};
$("nx").onclick = () => go(1);
$("pv").onclick = () => go(-1);
function setMode(m) {
  if (m === mode) return;
  st.style.opacity = 0;
  setTimeout(() => {
    mode = m;
    st.classList.toggle("grid", m === "grid");
    $("ctl").classList.toggle("hide", m === "grid");
    $("hint").textContent =
      m === "grid"
        ? "Tap a photo to enlarge"
        : "Tap a card’s top edge · swipe · tap to enlarge";
    $("m1").setAttribute("aria-pressed", m === "stack");
    $("m2").setAttribute("aria-pressed", m === "grid");
    lay();
    st.style.opacity = 1;
  }, 250);
}
$("m1").onclick = () => setMode("stack");
$("m2").onclick = () => setMode("grid");
let sx = null; // swipe
st.onpointerdown = (e) => {
  sx = e.clientX;
  swiped = false;
};
st.onpointerup = (e) => {
  if (sx !== null && mode === "stack" && Math.abs(e.clientX - sx) > 40) {
    swiped = true;
    go(e.clientX < sx ? 1 : -1);
    setTimeout(() => (swiped = false), 50);
  }
  sx = null;
};
lay();

/* ---------- lightbox ---------- */
const lb = $("lb");
function openLb(i) {
  cur = i;
  $("lbc").innerHTML = media(P[i].src, P[i].cap);
  $("lbt").textContent = P[i].cap;
  if (!lb.open) lb.showModal();
}
$("lp").onclick = () => openLb((cur + N - 1) % N);
$("lx").onclick = () => openLb((cur + 1) % N);
$("lc").onclick = () => lb.close();
lb.onclick = (e) => {
  if (e.target === lb) lb.close();
};

/* ---------- RSVP (no seats / tables) ---------- */
const dlg = $("dlg");
let gn = 1;
$("op").onclick = () => {
  $("f").classList.remove("hide");
  $("ty").classList.add("hide");
  dlg.showModal();
};
$("x").onclick = $("x2").onclick = () => dlg.close();
dlg.onclick = (e) => {
  if (e.target === dlg) dlg.close();
};
document
  .querySelectorAll("[name=a]")
  .forEach(
    (r) =>
      (r.onchange = () =>
        $("gw").classList.toggle("hide", r.value !== "Joyfully accepts")),
  );
$("g-").onclick = () => {
  gn = Math.max(1, gn - 1);
  $("gn").textContent = gn;
};
$("g+").onclick = () => {
  gn = Math.min(CONFIG.maxGuests, gn + 1);
  $("gn").textContent = gn;
};
$("f").onsubmit = (e) => {
  e.preventDefault();
  let ok = true;
  const a = document.querySelector("[name=a]:checked");
  const ck = (id, bad, msg) => {
    $(id).textContent = bad ? msg : "";
    if (bad) ok = false;
  };
  ck("e1", !$("n").value.trim(), "Please enter your name.");
  ck(
    "e2",
    $("c").value.trim().length < 5,
    "Please enter an email or mobile number.",
  );
  ck("e3", !a, "Please choose a response.");
  if (!ok) return;
  let list = [];
  try {
    list = JSON.parse(store("rsvps") || "[]");
  } catch (_) {}
  list.push({
    name: $("n").value,
    contact: $("c").value,
    attending: a.value,
    guests: a.value === "Joyfully accepts" ? gn : 0,
    diet: $("d").value,
    song: $("s").value,
    msg: $("m").value,
  });
  store("rsvps", JSON.stringify(list)); // demo storage – connect to your own backend/form service to receive replies
  $("f").classList.add("hide");
  $("ty").classList.remove("hide");
};

/* ---------- countdown ---------- */
const setC = (i, v) => {
  const el = $("c" + i),
    s = String(v).padStart(2, "0");
  if (el.textContent !== s) {
    el.classList.add("t");
    setTimeout(() => {
      el.textContent = s;
      el.classList.remove("t");
    }, 150);
  }
};
function tick() {
  const s = Math.max(0, Math.floor((CONFIG.date - new Date()) / 1e3));
  setC(0, Math.floor(s / 86400));
  setC(1, Math.floor((s % 86400) / 3600));
  setC(2, Math.floor((s % 3600) / 60));
  setC(3, s % 60);
}
tick();
setInterval(tick, 1000);

/* ---------- nav + scroll reveal ---------- */
$("bg").onclick = () => {
  const o = $("mn").classList.toggle("open");
  $("bg").setAttribute("aria-expanded", o);
};
$("mn").onclick = () => $("mn").classList.remove("open");
addEventListener(
  "scroll",
  () => $("nav").classList.toggle("show", scrollY > innerHeight * 0.7),
  { passive: true },
);
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in-view");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".rv").forEach((x) => io.observe(x));

/* ---------- theme (dark / light) ---------- */
const MOON = "M12 3a9 9 0 109 9 7 7 0 01-9-9z",
  SUN =
    "M12 7a5 5 0 100 10 5 5 0 000-10zM11 1h2v3h-2zM11 20h2v3h-2zM1 11h3v2H1zM20 11h3v2h-3z";
function theme(t) {
  root.dataset.theme = t;
  $("thp").setAttribute("d", t === "dark" ? SUN : MOON);
  $("th").setAttribute(
    "aria-label",
    t === "dark" ? "Switch to light theme" : "Switch to dark theme",
  );
}
theme(
  store("theme") ||
    (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"),
);
$("th").onclick = () => {
  const t = root.dataset.theme === "dark" ? "light" : "dark";
  theme(t);
  store("theme", t);
};

/* ---------- hero sparkles ---------- */
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const c = $("sp"),
    x = c.getContext("2d"),
    S = Array.from({ length: 26 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2 + 0.7,
      v: Math.random() * 0.0006 + 0.0002,
      p: Math.random() * 6,
    }));
  let w, h;
  const rs = () => {
    w = c.width = c.offsetWidth;
    h = c.height = c.offsetHeight;
  };
  rs();
  addEventListener("resize", rs);
  (function f(t) {
    x.clearRect(0, 0, w, h);
    x.fillStyle = getComputedStyle(root).getPropertyValue("--gold");
    S.forEach((p) => {
      p.y -= p.v;
      if (p.y < 0) p.y = 1;
      x.globalAlpha = 0.25 + 0.5 * Math.abs(Math.sin(t / 900 + p.p));
      x.beginPath();
      x.arc(p.x * w, p.y * h, p.r, 0, 7);
      x.fill();
    });
    requestAnimationFrame(f);
  })(0);
}

/* ---------- music: autoplay attempt, first-touch fallback, pause is respected ---------- */
const au = $("song"),
  mu = $("mu");
let userPaused = store("musicPaused") === "1",
  wasOn = false;
function ui() {
  const on = !au.paused;
  mu.classList.toggle("on", on);
  mu.setAttribute("aria-pressed", on);
  mu.setAttribute("aria-label", on ? "Pause music" : "Play music");
  $("mup").setAttribute(
    "d",
    on ? "M6 5h4v14H6zM14 5h4v14h-4z" : "M8 5v14l11-7z",
  );
}
if (CONFIG.songUrl) {
  au.src = CONFIG.songUrl;
  mu.classList.remove("hide");
  au.onplay = au.onpause = ui;
  ui();
  const ev = ["pointerdown", "touchstart", "keydown", "scroll"];
  const start = () => {
    ev.forEach((e) => removeEventListener(e, start));
    if (!userPaused) au.play().catch(() => {});
  };
  if (!userPaused)
    au.play().catch(() =>
      ev.forEach((e) => addEventListener(e, start, { passive: true })),
    ); // blocked? wait for first interaction
  mu.onclick = () => {
    ev.forEach((e) => removeEventListener(e, start));
    if (au.paused) {
      userPaused = false;
      store("musicPaused", "0");
      au.play().catch(() => {});
    } else {
      userPaused = true;
      store("musicPaused", "1");
      au.pause();
    }
  };
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      wasOn = !au.paused;
      au.pause();
    } else if (wasOn && !userPaused) au.play().catch(() => {});
  });
}
