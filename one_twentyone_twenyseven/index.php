<!DOCTYPE html>
<html lang="en" data-t="linen"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Abe &amp; Collyn · The Road to Forever</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body class="dark">
<canvas id="fx"></canvas>
<div id="bgL" aria-hidden="true"></div>

<header id="top">
  <button class="t" id="openMap" aria-label="Open the map"><i data-i="map"></i><span>Open the map</span></button>
  <span class="row"><button class="t" id="au" aria-label="Toggle music"><i data-i="note"></i></button><button class="t" id="inf" aria-label="Info"><i data-i="info"></i><span>Info</span></button></span>
</header>

<div id="modal" class="hid" role="dialog" aria-label="Info"><div class="sheet">
  <button class="rb x" id="mX" aria-label="Close"><i data-i="close"></i></button>
  <h3 class="it">The essentials</h3>
  <dl class="ess">
    <dt>When</dt><dd id="eWhen"></dd><dt>Ceremony</dt><dd id="eCer"></dd><dt>Reception</dt><dd id="eRec"></dd>
    <dt>Dress code</dt><dd>Semi-formal in navy, gold and cream. Strictly no jeans and sneakers.</dd>
    <dt>RSVP</dt><dd>By <span id="eRsvp"></span> · <a href="#" data-go="7" class="ln">Reply now</a></dd></dl>
  <p class="k">Jump to</p><div class="jg" id="jg"></div>
  <p class="k">Find your table</p><div class="find"><input id="tb" aria-label="Your name"><button class="p" id="tf">Find</button></div><p id="tr" class="sm"></p>
  <button class="disc" id="chartT"><i class="tri"></i>See the full seating chart</button>
  <ul id="chart" class="hid sm"><li>Tita Baby &amp; guest: <b>Table 4</b></li><li>Family: <b>Table 1</b></li><li>Entourage: <b>Table 2</b></li><li class="k">Sample data only</li></ul>
  <p class="k">Theme</p><div class="swr" id="sw2"></div>
</div></div>

<div id="rm" class="hid" aria-label="Map"><canvas id="cl"></canvas>
  <div class="rmh"><h2>The road to forever</h2><p class="k" id="rmk"></p></div>
  <svg id="rmsv" viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid meet"></svg>
  <button class="p rmx" id="rmX"><i data-i="close"></i><span id="rmXt">Close</span></button><button class="p rmx sk hid" id="skip">Skip</button></div>
<div id="sw" aria-label="Colour theme"></div>

<main>
<!-- PROLOGUE -->
<section class="pg on" data-d="1" data-n="The invitation" data-l="Prologue">
  <div id="boarding"><p class="k pulse">Tap your boarding pass</p>
    <div class="pass" id="ps" role="button" tabindex="0" aria-label="Open your boarding pass">
      <div class="m"><small>PASSENGER</small><b data-g>Tita Baby</b>
        <div class="route"><span><small>FROM</small><b>MNL</b></span><svg class="rt" viewBox="0 0 120 20"><path d="M2 10H118" stroke-dasharray="3 4"/><g class="pf"><path d="M0 0L-8 4 -6 0 -8 -4z" transform="translate(8 10) scale(1.4)"/></g></svg><span><small>TO</small><b>ANTIPOLO</b></span></div>
        <small>FLIGHT AC 2027 · 21 JANUARY 2027 · <span data-s>2</span> SEATS RESERVED</small></div>
      <div class="s"><svg viewBox="0 0 90 90" aria-hidden="true"><g fill="none" stroke="#E5C583" stroke-width="1.5"><path d="M12 84V46l33-26 33 26v38z"/><path d="M45 20V6M39 12h12"/><path d="M33 84V62a12 12 0 0124 0v22"/><circle cx="45" cy="42" r="5"/><path d="M4 84h82"/></g></svg><svg id="bar" viewBox="0 0 90 16"></svg><span class="stamp">AC 2027</span></div></div></div>
  <div class="card inv hid" id="invite"><p class="k">You are invited</p><h3 class="it">Dear <span data-g>Tita Baby</span>,</h3><p>Together with their families,</p><h2 class="nm">Abe &amp; Collyn</h2><p>would love for you to celebrate their wedding<br>Thursday, 21 January 2027 · Antipolo</p>
    <div class="row"><button class="b" id="begin">Begin our story<i data-i="ar"></i></button><button class="b o" id="justD">Just the details</button></div></div>
</section>

<!-- 1 PROPOSAL -->
<section class="pg sunset" data-d="1" data-n="The proposal" data-l="1"><div class="sp rev">
  <div class="vz"><svg id="pro" viewBox="0 0 420 380" aria-label="Two people at sunset with a ring in front of a chapel">
    <g class="stars2"><circle cx="40" cy="30" r="1.5"/><circle cx="120" cy="60" r="1.2"/><circle cx="330" cy="40" r="1.6"/><circle cx="380" cy="90" r="1.2"/><circle cx="250" cy="25" r="1.3"/></g>
    <circle class="sglow" cx="210" cy="285" r="120"/><circle class="sun" cx="210" cy="285" r="48"/>
    <g class="bird"><path d="M0 0q6-8 12 0q6-8 12 0" /></g><g class="bird b2"><path d="M0 0q5-6 10 0q5-6 10 0"/></g>
    <rect x="0" y="300" width="420" height="80" fill="#24142f"/>
    <polygon class="shd" points="60,300 175,300 340,322 225,322"/><polygon class="shd" points="265,300 285,300 330,326 312,326"/>
    <g fill="#1b1230"><rect x="62" y="190" width="112" height="110"/><polygon points="52,190 118,130 184,190"/><rect x="108" y="96" width="20" height="40"/><path d="M118 70v28M110 80h16" stroke="#1b1230" stroke-width="3"/><path d="M104 300v-34a14 14 0 0128 0v34z" fill="#3a2410"/></g>
    <g class="win"><rect x="76" y="212" width="14" height="22" rx="7"/><rect x="146" y="212" width="14" height="22" rx="7"/><circle cx="118" cy="162" r="7"/></g>
    <g class="ppl"><g class="br"><circle cx="262" cy="236" r="10" fill="#1b1230"/><path d="M250 300v-48q12-14 24 0v48z" fill="#1b1230"/><path d="M272 258l26 4" stroke="#1b1230" stroke-width="5" stroke-linecap="round"/>
      <rect x="296" y="258" width="12" height="9" rx="2" fill="#E5C583"/><g class="ring"><circle cx="302" cy="252" r="4.5" fill="none" stroke="#fff3c4" stroke-width="2"/><path class="gl2" d="M302 238l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/></g></g>
      <g class="br b3"><circle cx="330" cy="234" r="10" fill="#1b1230"/><path class="hair" d="M322 230q-12 6-8 22q8-8 8-22z" fill="#1b1230"/><path d="M318 252q12-12 24 0l12 48h-48z" fill="#1b1230"/></g></g></svg></div>
  <div class="tx glass"><p class="k">Chapter one</p><h2>The proposal</h2><p>[Your proposal story goes here: where it happened, who was there, and what was said.] The sun was setting, the sky turned gold, and a small box changed everything.</p><p class="sm">Story text is a placeholder until the couple adds the real one.</p></div></div></section>

<!-- 2 PRENUP -->
<section class="pg" data-n="The prenup shoot" data-l="2"><div class="hd"><p class="k">Chapter two</p><h2>The prenup shoot</h2><p class="sm">Flick the top photo away, or spread them all out.</p></div>
  <div class="sp"><div class="vz"><div class="deck" id="deck"></div><div class="row"><button class="b" id="spread">Spread them out</button><span class="k" id="cnt">1 / 12</span></div></div>
  <div class="vz"><div class="vid" id="vid"><video id="vd" playsinline preload="none"></video><div class="vph" id="vph"><svg viewBox="0 0 120 80"><rect x="2" y="2" width="116" height="76" rx="6" fill="none"/><circle cx="60" cy="40" r="20" class="pp"/><path d="M54 30l18 10-18 10z"/></svg><span class="k">Video coming soon</span></div>
    <div class="vc"><button class="rb" id="vpl" aria-label="Play"><svg viewBox="0 0 24 24"><path id="vpi" d="M7 4l13 8-13 8z"/></svg></button><input type="range" id="vpr" value="0" min="0" max="100" aria-label="Progress"><button class="rb" id="vmu" aria-label="Mute"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zM16 9q3 3 0 6"/></svg></button><button class="rb" id="vfs" aria-label="Fullscreen"><svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button></div></div></div></div>
  <div id="lb" class="hid"></div></section>

<!-- 3 WEDDING DAY -->
<section class="pg wday" data-d="1" data-n="The wedding day" data-l="3"><canvas id="fw"></canvas>
  <svg class="chand" viewBox="0 0 300 190" aria-hidden="true"><path d="M150 0v34" stroke="currentColor"/><circle cx="150" cy="38" r="6" class="cg"/><path d="M150 44C90 44 50 70 40 100M150 44c60 0 100 26 110 56M150 44v100" fill="none" stroke="currentColor" stroke-width="2"/><g id="crys"></g><circle class="lit" cx="150" cy="110" r="90"/></svg>
  <svg class="bell bl" viewBox="0 0 80 100" aria-hidden="true"><g class="bw"><circle cx="40" cy="60" r="18" class="wv"/><circle cx="40" cy="60" r="18" class="wv w2"/></g><g class="bsw"><path d="M40 6v10M18 70q4-10 4-26a18 18 0 0136 0q0 16 4 26zM14 74h52M36 78a4 4 0 008 0" fill="none"/></g></svg>
  <svg class="bell br2" viewBox="0 0 80 100" aria-hidden="true"><g class="bw"><circle cx="40" cy="60" r="18" class="wv"/><circle cx="40" cy="60" r="18" class="wv w2"/></g><g class="bsw s2"><path d="M40 6v10M18 70q4-10 4-26a18 18 0 0136 0q0 16 4 26zM14 74h52M36 78a4 4 0 008 0" fill="none"/></g></svg>
  <div class="wc"><p class="k">Chapter three</p><div class="date" id="date" aria-label="21 January 2027"></div><div class="cd" id="cd"></div>
    <button class="hold" id="hold" aria-label="Hold to light the day"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" class="ring0"/><circle cx="40" cy="40" r="34" class="ringp" id="rp"/><path d="M40 22l4 12 12 2-10 8 4 12-10-7-10 7 4-12-10-8 12-2z"/></svg><span>Hold to light the day</span></button>
    <div class="tkt"><div class="th"><b>HOME</b><svg viewBox="0 0 60 12"><path d="M2 6H56M50 2l6 4-6 4"/></svg><b>YOU</b></div><p class="sm">Ceremony · <span class="tm" data-t="cer"></span> · Parish of the Immaculate Heart of Mary<br>Reception · <span class="tm" data-t="rec"></span> · The Chandelier Events Place<br><i class="k">Times are placeholders</i></p></div>
    <div class="row"><a class="b" id="ics" download="abe-collyn.ics"><i data-i="cal"></i>Add to calendar</a><a class="b o" target="_blank" rel="noopener" id="gcal"><i data-i="gc"></i>Google Calendar</a></div></div></section>

<!-- 4 PROGRAMME + JOURNEY -->
<section class="pg" data-n="The programme and journey" data-l="4"><div class="hd"><p class="k">Chapter four</p><h2>The programme and journey</h2></div>
  <div class="sp pj"><div class="boardc"><div class="board"><div class="bh"><svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>DEPARTURES<span class="led"></span></div><div class="rw hd2"><span>TIME</span><span>EVENT</span><span>PLACE</span><span>STATUS</span></div><div id="rows"></div></div><p class="sm">Tap a row to show its venue on the map. Times are placeholders.</p></div>
  <div class="mapc"><div class="mapf" id="mapf"><svg id="fb" viewBox="0 0 320 220" aria-label="Fallback map"><rect width="320" height="220" fill="var(--mbg)"/><g id="fbl"></g><path class="lk2" d="M30 160C90 120 120 150 170 110S250 100 276 70"/><g class="fp"><circle cx="276" cy="70" r="6"/></g><g class="fp f2"><circle cx="260" cy="84" r="6"/></g><text x="12" y="176" class="mt">Manila</text><text x="212" y="54" class="mt">Antipolo</text></svg><iframe id="mif" title="Venue map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    <div class="row"><button class="b" id="vc2"><svg class="ic" viewBox="0 0 24 24"><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/></svg>Ceremony</button><button class="b o" id="vr2"><svg class="ic" viewBox="0 0 24 24"><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/></svg>Reception</button></div></div>
  <div class="trav"><div class="row" id="tabs"></div><p class="tp" id="tp"></p><div class="lks" id="lks"></div></div></div></section>

<!-- 5 WHAT TO WEAR -->
<section class="pg" data-n="What to wear" data-l="5"><div class="hd"><p class="k">Chapter five</p><h2>What to wear</h2></div>
  <div class="sp"><div class="tx"><div class="row l" id="wt"><button class="b" data-w="g">Guests</button><button class="b o" data-w="e">Entourage</button></div>
    <div class="ed"><p><b>Women</b> · semi-formal long dress, knee-length dress or cocktail dress.</p><p><b>Men</b> · semi-formal: long sleeves and slacks, coat and tie.</p><div class="skip"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M6 6l12 12"/></svg><span>Please skip · jeans and sneakers</span></div></div>
    <div class="chips" id="chips"></div><label class="own">Try your own colour <input type="color" id="own" value="#1d3466" aria-label="Pick a colour"></label><p class="sm" id="cnote"></p></div>
  <div class="vz"><svg id="rack" viewBox="0 0 340 250" aria-label="Suit and cocktail dress on a rack"><path d="M10 22H330M40 22v215M300 22v215M20 237h300" stroke="currentColor" stroke-width="3" fill="none"/>
    <g class="sway"><path d="M105 22q0-14 10-14" fill="none" stroke="currentColor" stroke-width="2"/><path d="M95 22l10 5 10-5" fill="none" stroke="currentColor" stroke-width="2"/>
      <g class="gar" id="jk"><path d="M70 36l28-8 7 22 7-22 28 8 8 60-12 4 2 20h-66l2-20-12-4z"/></g>
      <path d="M97 30l8 34 8-34-8-6z" fill="#f7f0e0"/><path d="M105 40l-4 6 4 20 4-20z" class="tie"/>
      <g class="gar" id="pt"><path d="M72 124h66l4 100h-28l-8-70-8 70h-28z"/></g><path d="M105 124v30" stroke="#fff6"/></g>
    <g class="sway s2"><path d="M232 22q0-14 10-14" fill="none" stroke="currentColor" stroke-width="2"/><path d="M222 22l10 5 10-5" fill="none" stroke="currentColor" stroke-width="2"/>
      <g class="gar" id="dr"><path d="M220 34q12 8 24 0l6 4 4 54q-14 8-44 0l4-54zM208 92q-22 56-34 112 40 14 112 0-12-56-34-112z"/></g><path d="M214 92q18 6 36 0" stroke="#fff8" fill="none"/></g></svg></div></div></section>

<!-- 6 CAST -->
<section class="pg" data-d="1" data-n="The cast" data-l="6"><div class="cc"><p class="k">Chapter six</p><h2>The cast</h2><div class="credits" id="cr"><div id="crIn"></div></div><button class="b o" id="pc"><i data-i="pause"></i><span>Pause the credits</span></button></div></section>

<!-- 7 RSVP -->
<section class="pg" data-n="Your part · RSVP" data-l="7"><div class="rv0"><svg class="env" viewBox="0 0 160 110" aria-hidden="true"><rect x="6" y="30" width="148" height="74" rx="5"/><path class="flap" d="M6 34l74 46 74-46"/><path d="M6 104l56-40M154 104L98 64"/></svg>
  <div class="card frame" id="rvc"><svg class="co c1" viewBox="0 0 40 40"><path d="M2 38V8q0-6 6-6h30M10 38V14q0-4 4-4h24M2 2l12 12"/></svg><svg class="co c2" viewBox="0 0 40 40"><path d="M2 38V8q0-6 6-6h30M10 38V14q0-4 4-4h24M2 2l12 12"/></svg><svg class="co c3" viewBox="0 0 40 40"><path d="M2 38V8q0-6 6-6h30M10 38V14q0-4 4-4h24M2 2l12 12"/></svg><svg class="co c4" viewBox="0 0 40 40"><path d="M2 38V8q0-6 6-6h30M10 38V14q0-4 4-4h24M2 2l12 12"/></svg>
    <svg class="seal" viewBox="0 0 60 60"><circle cx="30" cy="30" r="24"/><circle cx="30" cy="30" r="17" class="s2"/><path d="M30 20c-8-6-14 4-6 10l6 8 6-8c8-6 2-16-6-10z"/></svg>
    <div class="rib"><span>Will you be there, <span data-g>Tita Baby</span>?</span></div><p class="sm c">Kindly reply by <b id="rsvpBy"></b>. We've reserved <b data-s>2</b> seats for you.</p>
    <div id="rv" class="form"><p class="k">Attendance</p><div class="row"><button class="b" data-a="y"><i data-i="check"></i>Joyfully accepts</button><button class="b o" data-a="n">Regretfully declines</button></div><p class="sm c" id="resp">Yay! Save some energy for the dance floor.</p>
      <svg class="dv" viewBox="0 0 200 10"><path d="M0 5H80M120 5H200"/><path d="M100 1l4 4-4 4-4-4z"/></svg>
      <div id="fs"><p class="k">Seats</p><div class="row"><button class="rb" id="mn" aria-label="Fewer"><i data-i="minus"></i></button><b id="gc">2</b><button class="rb" id="pl" aria-label="More"><i data-i="plus"></i></button></div>
        <svg class="dv" viewBox="0 0 200 10"><path d="M0 5H80M120 5H200"/><path d="M100 1l4 4-4 4-4-4z"/></svg>
        <p class="k">Your details</p><input placeholder="Allergies or dietary needs" aria-label="Dietary"><input placeholder="ONE SONG THAT GETS YOU ON THE DANCE FLOOR" aria-label="Song">
        <p class="k">Your message</p><textarea rows="2" placeholder="Advice for the couple (optional)" aria-label="Advice"></textarea></div>
      <button class="b" id="snd">Send my RSVP<i data-i="ar"></i></button><div id="ok" class="hid"><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="22"/><path d="M14 26l8 8 15-17"/></svg><span>Thank you. Your RSVP is sealed and sent.</span></div>
      <p class="k c">Demo only · connect a form backend in script.js</p></div><div id="petals"></div></div></div></section>

<!-- 8 GIFTS -->
<section class="pg gift" data-n="Gifts" data-l="8"><div class="rays"></div><div id="hearts"></div>
  <div class="gc2"><svg id="gbox" viewBox="0 0 200 190" role="button" aria-label="Replay the gift animation"><g id="glid"><rect x="20" y="58" width="160" height="28" rx="3" fill="none" stroke="currentColor" stroke-width="3"/><path d="M100 58V86" stroke="var(--gd)" stroke-width="12"/><g class="bow"><path d="M100 58C60 14 36 50 100 58zM100 58C140 14 164 50 100 58z"/><circle cx="100" cy="58" r="7"/></g></g><rect x="30" y="86" width="140" height="96" fill="none" stroke="currentColor" stroke-width="3"/><path d="M100 86V182" stroke="var(--gd)" stroke-width="12"/><path class="rib1" d="M100 62C80 40 60 30 40 44M100 62C120 40 140 30 160 44" fill="none" stroke="var(--gd)" stroke-width="4"/></svg>
    <h2 class="big" id="big" aria-label="Your presence is the gift."></h2><p class="sub">Having you there is everything.</p></div></section>

<!-- 9 QUESTIONS -->
<section class="pg" data-n="Questions" data-l="9"><div class="sp"><div class="tx"><p class="k">Chapter nine</p><h2>Questions, answered</h2><p>Tap a question. We usually reply faster than this.</p></div>
  <div class="vz"><div class="card chat"><div class="who"><span class="av"><svg viewBox="0 0 24 24"><path d="M12 21C4 14 3 9 6 6.5S11 5 12 8c1-3 4.5-3.5 6-1.5S20 14 12 21z"/></svg></span><span>Abe &amp; Collyn<br><small><i class="dot"></i>usually active</small></span></div>
    <div class="log" id="log"><div class="a">Hi there! Ask us anything.</div></div><div class="row l" id="bubs"></div></div></div></div></section>

<!-- EPILOGUE -->
<section class="pg" data-n="Forever day" data-l="Epilogue" id="epi"><div class="sky2" id="sky2"></div><div class="epc"><p class="k">Epilogue</p><h2>See you on forever day</h2><p>Abe &amp; Collyn · 21.01.2027 · Antipolo</p><p class="sm">Tap the sky to light a lantern, or send a wish up.</p><div class="row"><input id="wish" placeholder="Your wish" maxlength="40" style="max-width:220px" aria-label="Your wish"><button class="b" id="rel">Release</button></div><button class="b o" id="replay2"><i data-i="redo"></i>Replay our story</button></div></section>
</main>
<footer id="bot"><button class="t" id="pv" aria-label="Previous"><i data-i="al"></i></button><small class="hint">Use <kbd>←</kbd> <kbd>→</kbd> to turn the page</small><button class="b" id="nx">Next stop<i data-i="ar"></i></button></footer>
<script src="script.js"></script>
</body></html>