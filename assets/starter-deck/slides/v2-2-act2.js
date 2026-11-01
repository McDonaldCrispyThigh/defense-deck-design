/* Act II · how well the phone agrees with the lab (sample talk) */
Deck.add('act2', `
<section class="anchor" data-title="So far: the phone measure" data-demo="anchor" data-done="3" data-steps="2" data-photo="sample-night" data-scrim="sx blur" data-acc="bd">
  <div class="eyebrow e">Where we are</div>
  <h2 class="title e">Does the phone record <em>the same sleep</em> as the lab?</h2>
  <div class="anchor-host e"></div>
  <aside class="notes-kw" hidden><ol>
    <li data-k="0"><span class="en">Recorded, scored, totalled: 7.1 h median</span></li>
    <li data-k="1"><span class="en">Our night: 7.4 h by phone</span></li>
    <li data-k="2" data-key><span class="en">Next, RQ2: does it agree with the lab?</span></li>
  </ol></aside>
  <aside class="notes-en" hidden><p>So far: nights recorded, scored and totalled; the median night is 7.1 hours by phone. <b>Click:</b> our night reads 7.4 hours. <b>Click:</b> next, RQ2: does the phone agree with the lab on the same nights?</p></aside>
</section>

<section data-title="RQ2: how well the phone agrees" data-demo="agree tswap" data-steps="1" data-acc="bd">
  <div class="eyebrow e">RQ2 · Finding</div>
  <h2 class="title e tswap"><span data-t="0" class="cur">The phone agrees with the lab on <em>4/5</em> of nights.</span><span data-t="1">When they disagree, the phone nearly always counts <em>more sleep</em>.</span></h2>
  <div class="g-64 body">
    <div class="sc2-fig e"><svg class="sc2-svg" viewBox="0 0 960 660" role="img" aria-label="Scatter plot: total sleep by phone against total sleep by lab, one dot per night"></svg></div>
    <div class="col jc">
      <div class="e">${Deck_afx({ k: 'agree', n: '96', d: '120', v: '80%' })}</div>
      <p class="small mt-m e"><b>So:</b> on most nights, the phone can stand in for the lab.</p>
      <p class="small e" data-s="1"><b>So:</b> where it fails, it fails in one direction: wake that it does not see becomes sleep.</p>
    </div>
  </div>
  <div class="src">Synthetic data from tools/build_sample_data.py: 40 participants, three nights each. Agreement: phone within 30 minutes of the lab.</div>
  <div class="xrefs"><a class="xref" data-goto="s-agree"></a></div>
  <aside class="notes-kw" hidden><ol>
    <li data-k="0" data-key><span class="en">96 of 120 nights within 30 minutes: 4/5</span></li>
    <li data-k="0"><span class="en">So: the phone can stand in on most nights</span></li>
    <li data-k="1"><span class="en">23 of 24 misses lie above the line: wake counted as sleep</span></li>
  </ol></aside>
  <aside class="notes-en" hidden><p>Each dot is one night: the lab across, the phone up. Agreement is the share of nights where the phone is within thirty minutes of the lab: 96 of 120, four in five. <b>Click:</b> the misses are not random. Twenty-three of the twenty-four lie above the line: the phone counts more sleep than the lab.</p><p><b>If asked:</b> S1 gives the counts by group and the reason for the 30-minute band.</p></aside>
</section>
`);
