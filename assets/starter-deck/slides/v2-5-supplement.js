/* Supplement · details for questions (sample talk). Slides here are numbered S1, S2 … and get back chips. */
Deck.add('backup', `
<section data-title="How agreement is counted" data-id="s-agree" data-acc="bd">
  <div class="eyebrow e">Supplement · Agreement by group</div>
  <h2 class="title e">Most misses are shift workers’ nights, and they run <em>past 30 minutes</em>.</h2>
  ${Deck_pin('agree')}
  <div class="body">
    <div class="bk-tbl wide e">
      <div class="h"><span>Phone minus lab, absolute (minutes)</span><span>Day workers (72 nights)</span><span>Shift workers (48)</span><span>All (120)</span></div>
      <div><span>0 to 15</span><b>50</b><b>17</b><b>67</b></div>
      <div><span>16 to 30</span><b>17</b><b>12</b><b>29</b></div>
      <div><span>31 to 60</span><b>5</b><b>15</b><b>20</b></div>
      <div><span>More than 60</span><b>0</b><b>4</b><b>4</b></div>
      <div><span><b>Within 30 minutes</b> (agreement)</span><b>67</b><b>29</b><b>96</b></div>
    </div>
    <p class="small mt-m e"><b>Why 30 minutes:</b> the band was fixed before the comparison, as half the gap between the two verdicts the field argues over, 7 and 8 hours.</p>
  </div>
  <div class="src">Synthetic data from tools/build_sample_data.py. Counts of nights.</div>
  <aside class="notes-kw" hidden><ol><li data-k="0" data-key><span class="en">Shift workers: 29 of 48 within 30 minutes; day workers: 67 of 72</span></li></ol></aside>
  <aside class="notes-en" hidden><p>The same agreement, by group. Day workers agree on 67 of 72 nights; shift workers on 29 of 48. The band was fixed before the comparison.</p></aside>
</section>

<section data-title="Where the nights were recorded" data-id="s-sites" data-demo="sites" data-steps="1" data-acc="sp">
  <div class="eyebrow e">Supplement · Study setting</div>
  <h2 class="title e">Participants came from <em>21 of 48 districts</em> around three clinics.</h2>
  <div class="g-64 body">
    <div class="map st-map e"><svg role="img" aria-label="Map of a fictional city: districts shaded by number of participants, three clinics"></svg>
      <div class="map-lg"><span><i style="--c:color-mix(in srgb,var(--sp) 72%,transparent)"></i>3 or more participants</span><span><i style="--c:color-mix(in srgb,var(--sp) 34%,transparent)"></i>1 or 2</span><span><i style="--c:var(--fill)"></i>none</span><span><i style="--c:color-mix(in srgb,var(--wf) 18%,transparent)"></i>river</span><span data-s="1"><i class="dot" style="--c:var(--tx)"></i>clinic</span></div>
    </div>
    <div class="col jc">
      <div class="stat e"><span class="num m c-sp">40</span><span class="lab">participants, recruited at three clinics</span></div>
      <p class="small mt-m e"><b>So:</b> the sample covers less than half of the city, clustered around where recruitment happened.</p>
    </div>
  </div>
  <div class="src">A fictional city and synthetic participant counts from tools/build_sample_data.py; one district per grid cell.</div>
  <aside class="notes-kw" hidden><ol>
    <li data-k="0"><span class="en">40 participants in 21 of 48 districts</span></li>
    <li data-k="1" data-key><span class="en">Clustered around three clinics</span></li>
  </ol></aside>
  <aside class="notes-en" hidden><p>Where the nights were recorded: forty participants in 21 of the 48 districts. <b>Click:</b> they cluster around the three clinics that recruited them.</p></aside>
</section>

<section data-title="Limitations and next steps" data-id="s-limits" data-acc="w">
  <div class="eyebrow e" style="--acc:var(--tx2)">Supplement · Discussion</div>
  <h2 class="title e">Limitations and <em>next steps</em>.</h2>
  <div class="lims body">
    <div class="lm e"><span class="num">1</span><b>A reference, not the truth</b><span>The lab test has scoring errors of its own. Next: two independent lab scorers on every night.</span></div>
    <div class="lm e"><span class="num">2</span><b>One phone model</b><span>Next: other phones and placements, and nights with a bed partner.</span></div>
    <div class="lm e"><span class="num">3</span><b>Three nights each</b><span>Night-to-night variation within a person is only partly covered.</span></div>
    <div class="lm e"><span class="num">4</span><b>One city, three clinics</b><span>Next: participants recruited outside clinics.</span></div>
    <div class="lm wide e"><span class="num">→</span><b>Other verdicts</b><span>Next: the same check for sleep onset and for wake after sleep onset, which studies also turn into yes-or-no verdicts.</span></div>
  </div>
  <div class="src">Sample talk.</div>
  <aside class="notes-kw" hidden><ol><li data-k="0" data-key><span class="en">Reference, one phone, three nights, one city</span></li></ol></aside>
  <aside class="notes-en" hidden><p>Four limitations, each with its next step, and one extension to other verdicts.</p></aside>
</section>
`);
