/* Epilogue · answers, thanks (sample talk) */
Deck.add('close', `
<section data-title="Summary of findings" data-steps="2" data-acc="sp">
  <div class="eyebrow e">Summary of findings</div>
  <h2 class="title e">The phone agrees on 4/5 of nights, yet <em>1/5 of shift-worker nights</em> get a different verdict.</h2>
  <div class="ans body">
    <div class="e" style="--c:var(--wf)"><span class="rq">RQ1 · BUILD</span><span class="num">120</span><span class="lab">nights scored at home from a phone, 960 epochs each</span><span class="sub">No lab visit; the model never saw these participants.</span></div>
    <div class="e" data-s="1" style="--c:var(--bd)"><span class="rq">RQ2 · CHECK</span><span class="num">4/5</span><span class="lab">nights within 30 minutes of the lab test</span><span class="sub">When the phone is wrong, it counts wake as sleep.</span></div>
    <div class="e" data-s="2" style="--c:var(--sp)"><span class="rq">RQ3 · APPLY</span><span class="num">1/5</span><span class="lab">shift-worker nights get a different 7-hour verdict</span><span class="sub">Day workers: 1/14. The error falls on the group that sleeps least.</span></div>
  </div>
  <p class="ans-new e" data-s="2"><b>What is new:</b> a home measure checked night by night against the lab, and tested on the verdict that studies of short sleep use.</p>
  <p class="ans-geo e" data-s="2"><b>For sleep research:</b> check a home measure on the group you study; agreement across everyone can hide a group whose verdicts change.</p>
  <div class="src">Sample talk; synthetic data from tools/build_sample_data.py.</div>
  <div class="xrefs"><a class="xref" data-goto="s-limits"></a></div>
  <aside class="notes-kw" hidden><ol>
    <li data-k="0"><span class="en">RQ1: 120 nights scored at home</span></li>
    <li data-k="1"><span class="en">RQ2: 4/5 within 30 minutes</span></li>
    <li data-k="2" data-key><span class="en">RQ3: 1/5 of shift-worker nights change verdict</span></li>
  </ol></aside>
  <aside class="notes-en" hidden><p>Three answers. RQ1: 120 nights scored at home. <b>Click:</b> RQ2: four in five within thirty minutes of the lab. <b>Click:</b> RQ3: one in five shift-worker nights gets a different seven-hour verdict. Agreement across everyone hides the group where the error lands.</p><p><b>If asked:</b> S3 lists the limitations and next steps.</p></aside>
</section>

<section data-title="Thank you" data-chrome="off" data-photo="sample-night" data-scrim="sl" data-pos="20% 40%" class="t-thanks">
  <h2 class="display e">Thank you.</h2>
  <p class="lead e">Questions and discussion</p>
  <p class="small e t-repo"><span class="deck-logo sm"><img class="lg-d" src="img/logo-dark.svg" alt=""><img class="lg-l" src="img/logo.svg" alt=""></span>Code and data: github.com/your-account/your-repository</p>
  <div class="t-plate lg e" data-lg-scale="40">
    <div><b>Your Name</b><span>Department · University</span></div>
    <div><span class="lab">Thesis Advisor</span><b>Advisor Name</b></div>
    <div><span class="lab">Committee Member</span><b>Member Name</b></div>
  </div>
  <aside class="notes-kw" hidden><ol><li data-k="0" data-key><span class="en">Thank you; questions</span></li></ol></aside>
  <aside class="notes-en" hidden><p>Thank you. I am happy to take questions.</p></aside>
</section>
`);
