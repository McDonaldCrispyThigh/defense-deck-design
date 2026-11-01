/* Prologue · title, one case and one question, the plan. Sample talk: every number is synthetic. */
Deck.add('open', `
<section data-title="Title" data-chrome="off" data-photo="sample-night" data-scrim="sl" data-pos="60% 50%" class="t-title">
  <div class="deck-logo e"><img class="lg-d" src="img/logo-dark.svg" alt=""><img class="lg-l" src="img/logo.svg" alt=""></div>
  <div class="eyebrow e">Sleep Science · Thesis Defense · Sample talk</div>
  <h1 class="display e" style="font-size:120px">Does a phone<br>measure sleep<br>like the lab?</h1>
  <p class="lead e">A sample talk for the defense-deck-design starter. Every number in it is synthetic.</p>
  <div class="t-plate lg e" data-lg-scale="40">
    <div><b>Your Name</b><span>Department · University</span></div>
    <div><span class="lab">Thesis Advisor</span><b>Advisor Name</b></div>
    <div><span class="lab">Committee Member</span><b>Member Name</b></div>
    <div><span class="lab">Date</span><b>Month D, YYYY</b></div>
  </div>
  <aside class="notes-kw" hidden><ol><li data-k="0" data-key><span class="en">Thank the committee; one question about one night</span></li></ol></aside>
  <aside class="notes-en" hidden><p>Thank you all for coming. This talk asks one question about sleep: does a phone on the mattress measure the same night as a lab test does?</p></aside>
</section>

<section data-title="Did this participant sleep 7 hours?" data-demo="night" data-steps="3" data-photo="sample-room" data-scrim="sf" class="t-hook">
  <div class="eyebrow e">A simple question</div>
  <h2 class="title e">Did this participant sleep at least <em>7 hours</em> on this night?</h2>
  <div class="hook-body">
    <div class="hook-map nt-fig"><svg class="nt-svg" viewBox="0 0 900 500" role="img" aria-label="One night scored by a lab test and by a phone app, 23:00 to 07:00"></svg></div>
    <div class="hook-ans">
      <div class="ha" data-s="2" data-a="right"><span class="ha-src c-wf">Phone app, scored at home</span><span class="ha-num num c-wf" data-unit="h">7.4</span><span class="ha-v yes">Yes</span></div>
      <div class="ha" data-s="2" data-a="right" data-d="2"><span class="ha-src c-bd">Reference: lab test (polysomnography)</span><span class="ha-num num c-bd" data-unit="h">6.6</span><span class="ha-v no">No</span></div>
      <p class="lead" data-s="3"><b>Only the instrument changed.</b></p>
    </div>
  </div>
  <div class="src">Participant P014, night 3; synthetic data. Bars: 30-second epochs scored asleep between 23:00 and 07:00.</div>
  <aside class="notes-kw" hidden><ol>
    <li data-k="0"><span class="en">One night, one yes-or-no question</span></li>
    <li data-k="1"><span class="en">Same night, two instruments</span></li>
    <li data-k="2" data-key><span class="en">Phone 7.4 h: yes. Lab 6.6 h: no</span></li>
    <li data-k="3"><span class="en">Only the instrument changed: the phone missed two wake periods</span></li>
  </ol></aside>
  <aside class="notes-en" hidden><p>One participant, one night, and a yes-or-no question that sleep studies ask every day: at least seven hours? <b>Click:</b> the same night, measured twice, by a lab test and by a phone app. <b>Click:</b> the phone says 7.4 hours, yes; the lab says 6.6 hours, no. <b>Click:</b> only the instrument changed. The phone slept through two wake periods that the lab saw.</p><p><b>If asked:</b> the lab test is polysomnography, the usual reference; it has errors of its own, which is why it is called a reference here and not the truth.</p></aside>
</section>

<section class="anchor" data-title="The plan: build, check, apply" data-demo="anchor" data-done="0" data-steps="1" data-tract="1" data-photo="sample-night" data-scrim="sx blur" data-act="off">
  <div class="eyebrow e" style="--acc:var(--tx2)">The plan</div>
  <h2 class="title e"><em>Three research questions</em> follow one night from the phone to a verdict.</h2>
  <p class="lead e" style="max-width:1300px">How does a phone measure sleep, does it agree with the lab, and does the 7-hour verdict change?</p>
  <div class="anchor-host e"></div>
  <aside class="notes-kw" hidden><ol>
    <li data-k="0"><span class="en">Three questions, one rail</span></li>
    <li data-k="1" data-key><span class="en">RQ1 build, RQ2 check, RQ3 apply</span></li>
    <li data-k="1"><span class="en">Two running examples: one night, one shift worker</span></li>
  </ol></aside>
  <aside class="notes-en" hidden><p>The plan. <b>Click:</b> three research questions sit on this rail. RQ1, build: how does a phone measure sleep? RQ2, check: does it agree with the lab? RQ3, apply: does the seven-hour verdict change? Two examples come with us: the night from the opening, and one shift worker.</p></aside>
</section>
`);
