/* ================= EDIT YOUR DETAILS HERE ================= */
const CONFIG = {
  names: "Abe & Collyn", // replace with your names
  date: new Date(2027, 0, 21, 16, 0, 0), // year, month (0 = Jan), day, hour, minute
  dateLabel: "1.21.2027",
  rsvpDeadline: "December 1, 2026", // placeholder – set your real RSVP date
  sheetUrl:
    "https://script.google.com/macros/s/AKfycbzrVUFeLJs8HPP14bdJEF48creBxjpaW8bLkQ_ODE95SuqFO-LZ_VFUUVjCvPLueWrx2Q/exec", // paste your Google Apps Script web app URL here (see google-apps-script.gs). Leave "" to test without sending.
  songUrl: "assets/song.mp3", // your song: put song.mp3 in the same folder as index.html (or paste a full MP3 link)
  flowers: [
    "assets/flower-1.png",
    "assets/flower-2.png",
    "assets/flower-3.png",
    "assets/flower-4.png",
  ], // your 4 flower pictures
  logoLightTheme: "assets/logo.png", // logo shown in the LIGHT theme (transparent PNG, dark / colored ink)
  logoDarkTheme: "assets/logo-gold-cream.png", // logo shown in the DARK theme (a light / gold version). If this file is missing, the light-theme logo is used.
  videoUrl: "assets/prenup_final.mp4", // Facebook link (must be a PUBLIC video; if it does not load, open the link in a browser and paste the final address, e.g. facebook.com/yourpage/videos/123...) OR a file like "assets/prenup.mp4". Muted autoplay, so the background song keeps playing
  videoPoster: "assets/videoposter.png", // optional still image shown before the video loads
  videoRatio: "16 / 9", // e.g. "9 / 16" for a phone-style vertical video
  photos: [
    // Gallery photos (src = image URL, cap = caption)
    { src: "assets/photo-1.jpg" },
    { src: "assets/photo-2.jpg" },
    { src: "assets/photo-3.jpg" },
    { src: "assets/photo-4.jpg" },
    { src: "assets/photo-5.jpg" },
    { src: "assets/photo-6.jpg" },
    { src: "assets/photo-7.jpg" },
    { src: "assets/photo-8.jpg" },
    { src: "assets/photo-9.jpg" },
  ],
  ceremony: {
    name: "Parish of the Immaculate Heart of Mary",
    addr: "Hinulugang Taktak Rd., Brgy. Dela Paz, Antipolo City",
    when: "January 21, 2027 · 4:00 PM",
    note: "",
    photo: "assets/church.webp", // big photo of the church
    mapEmbed: "", // optional: paste the src of Google Maps > Share > Embed a map; leave "" to search by name + address
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(
        "Parish of the Immaculate Heart of Mary, Hinulugang Taktak Rd., Brgy. Dela Paz, Antipolo City",
      ),
  },
  reception: {
    name: "The Chandelier Events Place",
    addr: "267 San Jose Ext. St., Antipolo",
    when: "6:00 PM onwards",
    note: "Cocktails to follow right after the ceremony.",
    photo: "assets/reception.webp", // big photo of the reception venue
    mapEmbed: "", // optional: same as above
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(
        "The Chandelier Events Place, 267 San Jose Ext. St., Antipolo",
      ),
  },
  timeline: [
    // [time, title, short line, optional small text under the time]
    ["3:00 PM", "Guest arrival", "Settle in and say hello"],
    ["4:00 PM", "Ceremony", "A little laughter, a little tears"],
    ["5:00 PM", "Cocktail hour", "Drinks and photos"],
    ["6:00 PM", "Reception", "Toasts and a shared meal", "onwards"],
  ],
  dressText: "Semi-formal attire in harmony with our wedding colors.",
  dressLadies: "Long dress, knee-length dress, cocktail dress or slacks",
  dressGents: "Long sleeves and slacks, coat and tie",
  dressAvoid: "Strictly no jeans & sneakers.",
  // [who, color name, color]
  dressRoles: [
    ["Ninongs", "Black", "#1C1C1C"],
    ["Ninangs", "Beige", "#D2B89A"],
    ["Groomsmen", "Cream", "#F2E8D5"],
    ["Bridesmaids", "Champagne", "#DBC8A6"],
  ],
  // other guests: all shades of blue
  dressBlues: [
    ["Navy", "#2D456E"],
    ["Royal blue", "#3C5B91"],
    ["Cornflower", "#7590C8"],
    ["Sky blue", "#ADC6ED"],
    ["Powder blue", "#D3DFF5"],
    ["Ice blue", "#EBF1FA"],
  ],
  // Entourage: everything is shown on the page (nothing to tap). One name per row.
  // principal = [left name, right name] pairs. Left column = groom's side / men, right column = bride's side / women.
  // Leave a list empty ([]) and that block is hidden (e.g. Secondary Sponsors).
  entourage: {
    parentsGroom: ["Abemel Obordo", "Hermenia Obordo"],
    parentsBride: ["Joselito Panganiban", "Josephine Panganiban"],
    principal: [
      ["Mr. Ponciano Tugonon", "Evelyn Tugonon"],
      ["Engr. Antonio Ocampo", "Jailyn Ocampo"],
      ["JCSUPT Lyndon Torres (Ret.)", "PLTCOL Catherine Ramos"],
      ["PLTCOL Neil Gumana", "Julgen Obordo"],
      ["JSUPT Jayrex Joseph Bustinera", "Ma Fatima Montoya"],
      ["PLTCOL Bryan O' Neil Salvacion", "Mrs. Racquel Salvacion"],
      ["PLTCOL Ruel Burlat", "Byng Acevedo"],
      ["JSUPT Mark Anthony Omega", "Lourdes Eyao Icoy"],
    ],
    bestMan: ["PCPT Joedhel Lloyd Obordo"],
    maidOfHonor: ["Paula Kat-yana Tugonon-Manuel", "Anne Sofia Lou Ocampo"],
    groomsmen: [
      "Joerald Buen Obordo",
      "Luigi Edward Panganiban",
      "PCPT Harren Ralph Dunton",
      "PCPT Michael John Bañes",
    ],
    bridesmaids: [
      "Melnia Andrea Obordo",
      "Apple Serrano",
      "JSINSP Krizza Jane Bermudo",
      "Princess Arianne Macaranas",
    ],
    candle: [],
    veil: [],
    cord: [], // Secondary Sponsors – add names to show this block
    coinBearer: ["Kenzo Laylo"],
    bibleBearer: ["Kenneth Cordovero"],
    ringBearer: ["Joross Axl Obordo"],
    flowerGirls: ["Gwen Eloise Mestidio", "Amarah Ysabelle Obordo"],
  },
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
const media = (src, alt) =>
  src
    ? '<img src="' +
      src +
      '" alt="' +
      alt +
      '" onerror="this.outerHTML=\'<div class=ph>PHOTO</div>\'">'
    : '<div class="ph">PHOTO</div>';

/* ---------- text ---------- */
$("nm").textContent = CONFIG.names;
$("dt").textContent = CONFIG.dateLabel;
$("by").textContent = "Please respond by " + CONFIG.rsvpDeadline;
$("ft").textContent = "With love, " + CONFIG.names;
/* logo swaps with the theme; falls back to the other file if one is missing, hides if both are */
function setLogo(t) {
  const lg = $("lg"),
    want = t === "dark" ? CONFIG.logoDarkTheme : CONFIG.logoLightTheme,
    fb = CONFIG.logoLightTheme;
  lg.classList.remove("hide");
  lg.onerror = () => {
    lg.onerror = () => lg.classList.add("hide");
    if (want && want !== fb) lg.src = fb;
    else lg.classList.add("hide");
  };
  lg.src = want || fb;
}
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
    '<div class="vphoto frame">' +
    media(v.photo, v.name) +
    "</div>" +
    '<p style="margin-top:18px"><a class="btn" href="' +
    v.mapUrl +
    '" target="_blank" rel="noopener">View on map</a></p>' +
    '<div class="map frame"><iframe title="Map of ' +
    v.name +
    '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen src="' +
    (v.mapEmbed ||
      "https://www.google.com/maps?q=" +
        encodeURIComponent(v.name + ", " + v.addr) +
        "&output=embed") +
    '"></iframe></div>';
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
      (t[3] ? "<small>" + t[3] + "</small>" : "") +
      "</span><span><b>" +
      t[1] +
      "</b><br>" +
      t[2] +
      "</span></div>",
  )
  .join("");
$("roles").innerHTML = CONFIG.dressRoles
  .map(
    (r, i) =>
      '<div class="rc rv rv-z" style="--d:' +
      i * 0.1 +
      's"><i style="background:' +
      r[2] +
      '" aria-hidden="true"></i><b>' +
      r[0] +
      "</b><span>" +
      r[1] +
      "</span></div>",
  )
  .join("");
$("sw").innerHTML = CONFIG.dressBlues
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
/* entourage: all names visible. Two-column blocks put the left column against the middle (right-aligned)
   and the right column against the middle (left-aligned), like a printed program. */
{
  const E = CONFIG.entourage,
    has = (x) => x && x.length;
  const col = (c) =>
    '<div class="ec ' +
    c.s +
    '">' +
    (c.h ? '<div class="eh">' + c.h + "</div>" : "") +
    c.n.map((n) => "<p>" + n + "</p>").join("") +
    "</div>";
  const blk = (cols, title) => {
    cols = cols.filter((c) => has(c.n));
    if (!cols.length) return "";
    if (cols.length === 1) cols[0].s = "c";
    return (
      '<div class="eblk rv">' +
      (title ? '<div class="eh mid">' + title + "</div>" : "") +
      '<div class="eg eg' +
      cols.length +
      '">' +
      cols.map(col).join("") +
      "</div></div>"
    );
  };
  /* two aligned columns: every row is one grid row, so a name that wraps never pushes its partner out of line */
  const duo = (la, lb, h1, h2, title) => {
    const n = Math.max(la.length, lb.length);
    if (!n) return "";
    let cells =
      h1 || h2
        ? '<div class="eh l">' +
          (h1 || "") +
          '</div><div class="eh r">' +
          (h2 || "") +
          "</div>"
        : "";
    for (let i = 0; i < n; i++)
      cells +=
        '<p class="l">' +
        (la[i] || "") +
        '</p><p class="r">' +
        (lb[i] || "") +
        "</p>";
    return (
      '<div class="eblk rv">' +
      (title ? '<div class="eh mid">' + title + "</div>" : "") +
      '<div class="eg eg2 rows">' +
      cells +
      "</div></div>"
    );
  };
  const two = (h1, a, h2, b) => duo(a, b, h1, h2);
  $("en").innerHTML =
    two(
      "Parents of the Groom",
      E.parentsGroom,
      "Parents of the Bride",
      E.parentsBride,
    ) +
    duo(
      E.principal.map((p) => p[0]),
      E.principal.map((p) => p[1]),
      "",
      "",
      "Principal Sponsors",
    ) +
    two(
      "Best Man",
      E.bestMan,
      E.maidOfHonor.length > 1 ? "Maids of Honor" : "Maid of Honor",
      E.maidOfHonor,
    ) +
    two("Groomsmen", E.groomsmen, "Bridesmaids", E.bridesmaids) +
    blk(
      [
        { s: "c", h: "Candle", n: E.candle },
        { s: "c", h: "Veil", n: E.veil },
        { s: "c", h: "Cord", n: E.cord },
      ],
      "Secondary Sponsors",
    ) +
    blk([
      { s: "c", h: "Coin Bearer", n: E.coinBearer },
      { s: "c", h: "Bible Bearer", n: E.bibleBearer },
      { s: "c", h: "Ring Bearer", n: E.ringBearer },
    ]) +
    blk([{ s: "c", n: E.flowerGirls }], "Flower Girls");
}

/* ---------- prenup photos: grid only (an odd last photo is centered by the CSS) ---------- */
const P = CONFIG.photos,
  N = P.length,
  st = $("stack");
let cur = 0;
P.forEach((p, i) => {
  p.cap = p.cap || "Prenup photo " + (i + 1);
  const c = document.createElement("div");
  c.className = "card rv rv-z";
  c.tabIndex = 0;
  c.setAttribute("role", "button");
  c.setAttribute("aria-label", p.cap);
  c.style.setProperty("--d", ((i % 3) * 0.1).toFixed(2) + "s");
  c.innerHTML = media(p.src, p.cap);
  st.appendChild(c);
  c.onclick = () => openLb(i);
  c.onkeydown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      c.click();
    }
  };
});

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

/* ---------- RSVP: one reply per guest, sent to Google Sheets (no seats, no plus-ones) ---------- */
const dlg = $("dlg"),
  openBtn = $("op");
const doneInfo = () => {
  try {
    return JSON.parse(store("rsvpDone") || "null");
  } catch (_) {
    return null;
  }
};
function showState(s) {
  // "form" | "thanks" | "already"
  $("f").classList.toggle("hide", s !== "form");
  $("dh").classList.toggle("hide", s !== "form");
  $("ty").classList.toggle("hide", s === "form");
  $("tyh").textContent =
    s === "already" ? "You’ve already replied" : "Thank you!";
  $("typ").textContent =
    s === "already"
      ? "We already have your answer, so there is nothing more to do. See you soon!"
      : "Your reply has been received. We can’t wait to celebrate with you.";
}
function updateBtn() {
  if (doneInfo()) openBtn.textContent = "You’ve replied ✓";
}
updateBtn();
openBtn.onclick = () => {
  showState(doneInfo() ? "already" : "form");
  dlg.showModal();
};
$("x").onclick = $("x2").onclick = () => dlg.close();
dlg.onclick = (e) => {
  if (e.target === dlg) dlg.close();
};
$("f").onsubmit = async (e) => {
  e.preventDefault();
  if (doneInfo()) return showState("already"); // answer only once per device
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
  const data = {
    name: $("n").value.trim(),
    contact: $("c").value.trim(),
    attending: a.value,
    msg: $("m").value.trim(),
  };
  const btn = $("send");
  btn.disabled = true;
  btn.textContent = "Sending…";
  $("e4").textContent = "";
  try {
    let status = "ok";
    if (CONFIG.sheetUrl) {
      // text/plain body avoids a CORS preflight; Google Apps Script answers with JSON
      const r = await fetch(CONFIG.sheetUrl, {
        method: "POST",
        body: JSON.stringify(data),
      });
      status = (await r.json()).status;
    } else {
      // test mode: keep a copy in this browser only
      let list = [];
      try {
        list = JSON.parse(store("rsvps") || "[]");
      } catch (_) {}
      list.push(data);
      store("rsvps", JSON.stringify(list));
    }
    if (status !== "ok" && status !== "duplicate") throw new Error(status);
    store(
      "rsvpDone",
      JSON.stringify({ name: data.name, attending: data.attending }),
    );
    updateBtn();
    showState(status === "duplicate" ? "already" : "thanks");
  } catch (_) {
    $("e4").textContent =
      "We couldn’t send your reply. Please check your connection and try again.";
  }
  btn.disabled = false;
  btn.textContent = "Send";
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
        const t = e.target;
        t.classList.add("in-view");
        io.unobserve(t);
        setTimeout(() => t.style.removeProperty("--d"), 1600);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".rv").forEach((x) => io.observe(x));
const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
/* ---------- scroll animations: every element reveals with a staggered effect ---------- */
function rev(el, i, t) {
  if (
    el.classList.contains("rv") ||
    el.tagName === "CANVAS" ||
    el.matches(".sw,.cd,.en,#tl,.two2,#cer,#rec,.mid,#roles,#stack")
  )
    return;
  el.classList.add("rv");
  if (t) el.classList.add(t);
  el.style.setProperty("--d", (i * 0.09).toFixed(2) + "s");
  io.observe(el);
}
document.querySelectorAll("section").forEach((sec) => {
  let i = 0;
  sec.querySelectorAll(".in > *, #cer > *, #rec > *").forEach((el) => {
    const t = /^H[12]$/.test(el.tagName)
      ? "rv-b"
      : el.classList.contains("frame") || el.classList.contains("orn")
        ? "rv-z"
        : "";
    rev(el, Math.min(i++, 5), t);
  });
});
document.querySelectorAll(".sw i,.cd>div,.two2>div").forEach((e, i) => {
  e.classList.add("rv", "rv-z");
  e.style.setProperty("--d", ((i % 7) * 0.09).toFixed(2) + "s");
  io.observe(e);
});

/* ---------- flower pictures: 4 images, 8 fixed placements (each image used twice, alternating sides) ---------- */
// [section id, flower no. 1-4, side, top %, side offset %, rotation, mirrored, size, parallax speed]
const PL = [
  ["top", 1, "r", 6, -4, 15, 0, 1.1, 0.14],
  ["story", 2, "l", 44, -6, -18, 0, 1, -0.1],
  ["ceremony", 3, "r", 52, -5, 22, 0, 1, 0.12],
  ["reception", 4, "l", 55, -5, -25, 0, 1.05, -0.12],
  ["program", 1, "r", 8, -6, -20, 1, 0.95, 0.1],
  ["dress", 2, "l", 58, -6, 20, 1, 1, -0.1],
  ["entourage", 3, "r", 3, -5, -15, 1, 1, 0.12],
  ["rsvp", 4, "l", 62, -5, 18, 1, 1.05, -0.12],
];
PL.forEach((p) => {
  const d = document.createElement("div");
  d.className = "fl";
  d.dataset.name = "flower-" + p[1];
  d.dataset.par = p[8];
  d.style.cssText =
    "top:" +
    p[3] +
    "%;" +
    (p[2] === "r" ? "right:" : "left:") +
    p[4] +
    "%;--r:" +
    p[5] +
    "deg;--f:" +
    (p[6] ? -1 : 1) +
    ";--s:" +
    p[7];
  const im = new Image();
  im.alt = "";
  im.src = CONFIG.flowers[p[1] - 1];
  im.onerror = () => d.classList.add("missing");
  d.appendChild(im);
  $(p[0]).appendChild(d);
  io.observe(d);
});

/* ---------- parallax: flowers and a few frames drift at different speeds while scrolling ---------- */
document
  .querySelectorAll(".arc,.sw")
  .forEach((e) => (e.dataset.par = e.classList.contains("arc") ? 0.05 : -0.05));
const prog = document.createElement("div");
prog.id = "prog";
document.body.appendChild(prog);
const parEls = [...document.querySelectorAll("[data-par]")];
let pq = false;
function par() {
  pq = false;
  const vh = innerHeight;
  parEls.forEach((el) => {
    const r = el.parentElement.getBoundingClientRect();
    if (r.bottom < -300 || r.top > vh + 300) return;
    el.style.setProperty(
      "--py",
      (-(r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.par)).toFixed(
        1,
      ) + "px",
    );
  });
  prog.style.setProperty(
    "--p",
    Math.min(
      1,
      scrollY / Math.max(1, document.documentElement.scrollHeight - vh),
    ),
  );
}
if (!REDUCE) {
  addEventListener(
    "scroll",
    () => {
      if (!pq) {
        pq = true;
        requestAnimationFrame(par);
      }
    },
    { passive: true },
  );
  addEventListener("resize", par);
  par();
}

/* ---------- theme (dark / light) ---------- */
const MOON = "M12 3a9 9 0 109 9 7 7 0 01-9-9z",
  SUN =
    "M12 7a5 5 0 100 10 5 5 0 000-10zM11 1h2v3h-2zM11 20h2v3h-2zM1 11h3v2H1zM20 11h3v2h-3z";
function theme(t) {
  root.dataset.theme = t;
  setLogo(t);
  $("thp").setAttribute("d", t === "dark" ? SUN : MOON);
  $("th").setAttribute(
    "aria-label",
    t === "dark" ? "Switch to light theme" : "Switch to dark theme",
  );
}
theme(store("theme") || "dark"); // dark is the default theme; a guest's own choice is remembered
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
  au.onerror = () => mu.classList.add("hide"); // no backup track: if the file is missing, the button just hides
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

/* ---------- video: Facebook player (iframe) or a normal .mp4 file; the .mp4 version autoplays (muted) when it scrolls into view and pauses when it leaves; the background song keeps playing ---------- */
{
  const vd = $("vd"),
    vb = $("vb"),
    vw = $("vw");
  vw.style.setProperty("--va", CONFIG.videoRatio || "16 / 9");

  if (/facebook\.com|fb\.watch/.test(CONFIG.videoUrl)) {
    // Facebook links can't play inside <video>, so use Facebook's player iframe
    const f = document.createElement("iframe");
    f.title = "Prenup video";
    f.allow =
      "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
    f.allowFullscreen = true;
    f.style.cssText = "width:100%;height:100%;border:0";
    const src =
      "https://www.facebook.com/plugins/video.php?href=" +
      encodeURIComponent(CONFIG.videoUrl) +
      "&show_text=false&autoplay=true&mute=1";
    vd.replaceWith(f);
    if (vb) vb.remove(); // the custom play/pause button can't control Facebook's player
    // load it only once the guest scrolls to it, so it starts playing at that moment
    new IntersectionObserver(
      (es, o) => {
        if (es[0].isIntersecting) {
          f.src = src;
          o.disconnect();
        }
      },
      { threshold: 0.4 },
    ).observe(vw);
  } else {
    let vPaused = false; // true once a guest pauses it themselves
    vd.muted = true;
    if (CONFIG.videoPoster) vd.poster = CONFIG.videoPoster;
    vd.src = CONFIG.videoUrl;
    vd.onerror = () => {
      vw.innerHTML = '<div class="ph">VIDEO</div>';
    };
    const sync = () => {
      const p = $("vbp");
      if (!p) return;
      const on = !vd.paused;
      vb.setAttribute("aria-label", on ? "Pause video" : "Play video");
      p.setAttribute("d", on ? "M6 5h4v14H6zM14 5h4v14h-4z" : "M8 5v14l11-7z");
    };
    vd.onplay = vd.onpause = sync;
    new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            if (!vPaused) vd.play().catch(() => {});
          } else vd.pause();
        }),
      { threshold: 0.4 },
    ).observe(vw);
    vb.onclick = () => {
      if (vd.paused) {
        vPaused = false;
        vd.play().catch(() => {});
      } else {
        vPaused = true;
        vd.pause();
      }
    };
  }
}
