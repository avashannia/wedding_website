<!DOCTYPE html>
<html lang="en" data-t="linen"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Abe &amp; Collyn · The Road to Forever</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body class="dark">
<canvas id="fx"></canvas>
<svg id="clouds" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <g class="cl c1"><path d="M0 60q20-30 55-20 15-30 55-15 30-5 40 25 25 0 25 25H0z"/></g>
  <g class="cl c2"><path d="M0 60q20-30 55-20 15-30 55-15 30-5 40 25 25 0 25 25H0z"/></g>
  <g class="cl c3"><path d="M0 60q20-30 55-20 15-30 55-15 30-5 40 25 25 0 25 25H0z"/></g>
</svg>
<svg id="plants" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"></svg>

<header id="top">
  <button class="t" id="openMap"><i data-i="map"></i><span>Open the map</span></button>
  <span class="row">
    <button class="t" id="au" aria-label="Toggle music"><i data-i="note"></i></button>
    <button class="t" id="inf" aria-label="Info"><i data-i="info"></i></button>
  </span>
</header>

<aside id="dr" aria-label="The Essentials">
  <button class="t x" id="drX" aria-label="Close"><i data-i="close"></i></button>
  <h3>The Essentials</h3>
  <p class="k">Find your table</p>
  <div class="row l"><input id="tb" value="Tita Baby" aria-label="Guest name"><button class="b" id="tf">Find</button></div>
  <p id="tr" class="sm"></p>
  <button class="t" id="chartT">See the full seating chart</button>
  <div id="chart" class="hid sm">Seating chart will be added by the couple.</div>
  <p class="k">The story map</p>
  <ol id="dir"></ol>
  <div class="row l"><button class="b o" id="mapB">Open the map</button><button class="b" id="replay">Replay from the start</button></div>
</aside>

<div id="modal" class="hid"><div class="card">
  <button class="t x" id="mX" aria-label="Close"><i data-i="close"></i></button>
  <h3>Abe &amp; Collyn</h3><p class="k">Thursday, 21 January 2027</p>
  <p><b>Ceremony</b><br>Parish of the Immaculate Heart of Mary, Hinulugang Taktak Rd., Brgy. Dela Paz, Antipolo City</p>
  <p><b>Reception</b><br>The Chandelier Events Place, 267 San Jose Ext. St., Antipolo</p>
  <p><b>Attire</b> Semi-formal. Strictly no jeans and sneakers.</p>
</div></div>

<div id="sw" aria-label="Colour theme"></div>

<main id="app">

<!-- PROLOGUE -->
<section class="pg on" data-d="1" data-n="Prologue: The invitation">
  <div id="boarding">
    <div class="pass" id="ps" role="button" tabindex="0" aria-label="Open your boarding pass">
      <div class="m">
        <small>PASSENGER</small><b>Tita Baby</b>
        <div class="route"><span><small>FROM</small><b>MNL</b></span><i data-i="plane" class="fly"></i><span><small>TO</small><b>ANTIPOLO</b></span></div>
        <small>FLIGHT AC 2027 &nbsp;·&nbsp; 21 JANUARY 2027 &nbsp;·&nbsp; 2 SEATS RESERVED</small>
      </div>
      <div class="s">
        <svg viewBox="0 0 80 100" aria-hidden="true"><g fill="none" stroke="#E5C583" stroke-width="1.4"><path d="M10 92V50l30-26 30 26v42z"/><path d="M40 24V8M34 14h12"/><path d="M30 92V66a10 10 0 0120 0v26"/><circle cx="40" cy="44" r="5"/><path d="M4 92h72"/></g></svg>
        <small>BOARDING</small>
      </div>
    </div>
    <p class="k pulse">Tap your boarding pass</p>
  </div>
  <div class="card inv hid" id="invite">
    <p class="k">You are invited</p>
    <h3 class="it">Dear Tita Baby,</h3>
    <p>Together with their families,</p>
    <h2>Abe &amp; Collyn</h2>
    <p>would love for you to celebrate their wedding on 21 January 2027 in Antipolo.</p>
    <div class="row"><button class="b" data-go="1">Begin our story<i data-i="ar"></i></button><button class="b o" id="justD">Just the details</button></div>
  </div>
</section>

<!-- 1 -->
<section class="pg" data-d="1" data-n="1: How we met">
  <div class="split">
    <div><p class="k">Chapter one</p><h2>How we met</h2><p>Two strangers, two seats, one sky. Seat 14A and seat 27F drifted through the same clouds. Drag them together, or let us help.</p><button class="b" id="bring">Bring them together</button></div>
    <div class="sky" id="sky">
      <div class="pl" id="p1"><i data-i="plane"></i><small>him · 14A</small></div>
      <div class="pl" id="p2"><i data-i="plane"></i><small>her · 27F</small></div>
      <div class="lock" id="lockH"><i data-i="heart"></i></div>
    </div>
  </div>
</section>

<!-- 2 -->
<section class="pg" data-d="1" data-n="2: The proposal">
  <p class="k">Chapter two</p><h2>The proposal</h2>
  <p>Under a moonlit sky, swipe across the candles to light them.</p>
  <div class="night" id="night">
    <svg viewBox="0 0 400 170" aria-hidden="true"><g id="stars"></g><circle cx="330" cy="36" r="14" fill="#F8F5EE" opacity=".9"/><path d="M0 170V120l60-34 50 30 70-52 70 56 60-34 90 40v44z" fill="#071410"/></svg>
    <div id="candles"></div>
    <svg class="ring" viewBox="0 0 60 50"><rect x="8" y="22" width="44" height="24" rx="3" fill="none" stroke="#E5C583" stroke-width="2"/><path d="M8 28h44" stroke="#E5C583"/><circle cx="30" cy="16" r="7" fill="none" stroke="#E5C583" stroke-width="2"/><path d="M26 6l4-4 4 4-4 4z" fill="#F8F5EE"/></svg>
  </div>
</section>

<!-- 3 -->
<section class="pg" data-n="3: Little moments">
  <p class="k">Chapter three</p><h2>Little moments</h2>
  <div class="deck" id="deck"></div>
  <button class="b" id="spread">Spread them out</button>
  <div id="lb" class="hid"></div>
</section>

<!-- 4 -->
<section class="pg" data-n="4: The big day">
  <p class="k">Chapter four</p><h2>The big day</h2>
  <div class="row top">
    <div class="card w"><div class="cd" id="cd"></div>
      <p class="sm"><i data-i="pin"></i> Ceremony · Parish of the Immaculate Heart of Mary<br><i data-i="pin"></i> Reception · The Chandelier Events Place</p>
      <div class="row"><a class="b" id="ics" download="abe-collyn.ics"><i data-i="cal"></i>Add to calendar</a>
      <a class="b o" target="_blank" rel="noopener" href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Abe+%26+Collyn+Wedding&dates=20270121T093000Z/20270121T150000Z&location=Antipolo+City">Google Calendar</a></div></div>
    <div class="card w"><p class="k">Save the date</p>
      <div class="scratch"><div class="under">21 JANUARY 2027</div><canvas id="scr" width="280" height="140"></canvas></div>
      <p class="sm">Scratch the gold foil</p></div>
  </div>
</section>

<!-- 5 -->
<section class="pg" data-n="5: The programme">
  <p class="k">Chapter five</p><h2>The programme</h2>
  <div class="boardwrap"><div class="board" id="board"><div class="bh"><i data-i="plane"></i> DEPARTURES</div><div id="rows"></div></div></div>
  <svg class="sunsvg" id="sunsvg" viewBox="0 0 300 110" aria-label="Drag the sun">
    <path id="arc" d="M10 100Q150 -50 290 100" fill="none" stroke="currentColor" stroke-dasharray="3 6" opacity=".5"/>
    <g id="sun"><circle r="18" class="halo"/><circle r="10"/></g>
  </svg>
  <p class="sm">Drag the sun across the sky</p>
</section>

<!-- 6 -->
<section class="pg" data-n="6: The journey">
  <p class="k">Chapter six</p><h2>The journey</h2>
  <div class="row" id="tabs"></div>
  <div class="card" id="tp"></div>
  <div class="row"><a class="b o" target="_blank" rel="noopener" href="https://www.google.com/maps/search/Parish+of+the+Immaculate+Heart+of+Mary+Hinulugang+Taktak+Antipolo">Google Maps</a><a class="b o" target="_blank" rel="noopener" href="https://waze.com/ul?q=Parish%20of%20the%20Immaculate%20Heart%20of%20Mary%20Antipolo">Waze</a></div>
  <svg id="road" viewBox="0 0 320 90" aria-label="Drag the car">
    <path id="rd" d="M10 70C70 10 120 100 180 45S280 20 310 45" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="2 8" opacity=".6"/>
    <g id="carG"><g class="carsh"><path d="M-12 4v-6l4-8h16l4 8v6zM-9 4v4M9 4v4" fill="none" stroke="currentColor" stroke-width="2"/></g></g>
  </svg>
  <p class="sm">Drag the car along the road</p>
</section>

<!-- 7 -->
<section class="pg" data-n="7: Where to stay">
  <p class="k">Chapter seven</p><h2>Where to stay</h2>
  <p>Stay close to the celebration. Hotel suggestions are coming soon.</p>
  <div class="row" id="hotels"></div>
</section>

<!-- 8 -->
<section class="pg" data-n="8: What to wear">
  <p class="k">Chapter eight</p><h2>What to wear</h2>
  <svg id="rack" viewBox="0 0 300 190" aria-label="Clothing rack">
    <path d="M10 20H290" stroke="currentColor" stroke-width="3"/><path d="M30 20v165M270 20v165" stroke="currentColor" stroke-width="3"/>
    <g class="sway"><path d="M105 20q0-10 8-10" fill="none" stroke="currentColor" stroke-width="2"/>
      <g id="g1" class="gar"><path d="M105 22l-22 12 6 16 10-4 4 90h44l4-90 10 4 6-16-22-12-18 14z"/><path d="M105 36v110" stroke="#fff8" stroke-width="1.5"/><circle cx="105" cy="60" r="1.5" fill="#fff"/><circle cx="105" cy="80" r="1.5" fill="#fff"/></g></g>
    <g class="sway s2"><path d="M195 20q0-10 8-10" fill="none" stroke="currentColor" stroke-width="2"/>
      <g id="g2" class="gar"><path d="M178 26q-24 4-30 22 14 4 20 0l4 8q6 8 12 8t12-8l4-8q6 4 20 0c-6-18-30-22-30-22q-8-2-12 0zM176 66l-30 114h104l-30-114z"/></g></g>
  </svg>
  <div class="card"><p><b>Women</b> semi-formal long dress, knee-length dress or cocktail dress.</p><p><b>Men</b> semi-formal long sleeves and slacks, coat and tie.</p><p class="k">Strictly no jeans and sneakers</p></div>
  <div class="row" id="swatches"></div>
</section>

<!-- 9 -->
<section class="pg" data-d="1" data-n="9: The cast">
  <p class="k">Chapter nine</p><h2>The cast</h2>
  <div class="credits" id="cr"><div id="crIn"></div></div>
  <button class="b o" id="pc"><i data-i="pause"></i><span>Pause the credits</span></button>
</section>

<!-- 10 -->
<section class="pg" data-n="10: Your part · RSVP">
  <p class="k">Chapter ten</p><h2>Will you be there, Tita Baby?</h2>
  <div class="card form" id="rv">
    <div class="row"><button class="b" data-a="y"><i data-i="check"></i>Joyfully accepts</button><button class="b o" data-a="n">Regretfully declines</button></div>
    <div class="row">Seats <button class="t" id="mn" aria-label="Fewer"><i data-i="minus"></i></button><b id="gc">2</b><button class="t" id="pl" aria-label="More"><i data-i="plus"></i></button></div>
    <input placeholder="Dietary or allergies">
    <input placeholder="One song that gets you on the dance floor">
    <textarea rows="2" placeholder="Advice for the couple"></textarea>
    <button class="b" id="snd">Send my RSVP<i data-i="ar"></i></button>
    <p id="ok" class="k hid"><i data-i="heart"></i> Thank you. Your RSVP is noted.</p>
  </div>
</section>

<!-- 11 -->
<section class="pg" data-n="11: Gifts">
  <p class="k">Chapter eleven</p><h2>Your presence is the gift</h2>
  <p class="narrow">Having you there is everything. If you would like to bless our new home, a monetary gift would mean the world.</p>
  <svg id="gift" viewBox="0 0 200 190" role="button" aria-label="Pull the ribbon">
    <rect x="30" y="80" width="140" height="95" fill="none" stroke="currentColor" stroke-width="3"/>
    <rect x="22" y="62" width="156" height="24" fill="none" stroke="currentColor" stroke-width="3"/>
    <path d="M100 62V175" stroke="var(--gd)" stroke-width="12"/>
    <g id="bow"><path d="M100 62C60 20 40 55 100 62zM100 62C140 20 160 55 100 62z" fill="var(--gd)"/><circle cx="100" cy="62" r="7" fill="var(--gd)"/>
      <path id="tail1" d="M100 66l-16 36M100 66l16 36" stroke="var(--gd)" stroke-width="6" fill="none"/></g>
  </svg>
  <button class="b" id="pull">Pull the ribbon</button>
  <div class="card hid" id="gd"><p class="k">Bank transfer</p><svg id="qr" viewBox="0 0 21 21" width="120" aria-label="QR placeholder"></svg><p class="sm">QR code and account details will be added by the couple. Registry links go here.</p></div>
</section>

<!-- 12 -->
<section class="pg" data-n="12: Questions">
  <p class="k">Chapter twelve</p><h2>Questions, answered</h2>
  <div class="card chat"><div class="who"><span class="av"><i data-i="heart"></i></span><span>Abe &amp; Collyn<br><small>usually active</small></span></div>
    <div class="log" id="log"></div><div class="row l" id="bubs"></div></div>
</section>

<!-- Epilogue -->
<section class="pg" data-n="Epilogue: Forever day">
  <p class="k">Epilogue</p><h2>Forever day</h2>
  <p class="narrow">Thank you for being part of our story. See you on 21 January 2027.</p>
  <svg class="rings" viewBox="0 0 120 60" aria-hidden="true"><circle cx="45" cy="30" r="22" fill="none" stroke="var(--gd)" stroke-width="3"/><circle cx="75" cy="30" r="22" fill="none" stroke="var(--gd)" stroke-width="3"/></svg>
  <div class="row"><button class="b" data-go="10">RSVP</button><button class="b o" id="replay2">Replay from the start</button></div>
</section>

</main>

<footer id="bot">
  <button class="t" id="pv" aria-label="Previous"><i data-i="al"></i></button>
  <small>Use <kbd>←</kbd> <kbd>→</kbd> to turn the page</small>
  <button class="b" id="nx">Next stop<i data-i="ar"></i></button>
</footer>
<script src="script.js"></script>
</body></html>