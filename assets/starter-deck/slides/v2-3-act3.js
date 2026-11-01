/* Act III · what changes for shift workers (sample talk) */
Deck.add('act3', `
<section data-title="RQ3: where the verdict changes" data-demo="verdict tswap" data-steps="2" data-acc="sp">
  <div class="eyebrow e">RQ3 · Finding</div>
  <h2 class="title e tswap"><span data-t="0" class="cur">For shift workers, the 7-hour verdict changes on <em>1/5</em> of nights.</span><span data-t="1">For day workers, it changes on only <em>1/14</em> of nights.</span><span data-t="2">Pooled, <em>1/9</em> of nights change, most of them shift workers’.</span></h2>
  <div class="g-64 body">
    <div class="vd-fig e">
      <div class="lg-btns lg vd-ctl" data-lg-scale="34"><button data-t="0">Shift workers</button><button data-t="1">Day workers</button><button data-t="2">All nights</button></div>
      <svg class="vd-svg" viewBox="0 0 960 600" role="img" aria-label="Dot strip: phone minus lab total sleep for each night, by work schedule"></svg>
      <div class="vd-key"><span><i style="--c:var(--wf)"></i>only the phone says 7 h or more</span><span><i style="--c:var(--bd)"></i>only the lab says 7 h or more</span><span><i style="--c:color-mix(in srgb,var(--tx) 32%,transparent)"></i>same verdict</span><span><i class="sq" style="--c:color-mix(in srgb,var(--ok) 10%,transparent)"></i>within 30 minutes</span></div>
    </div>
    <div class="col jc">
      <div class="stat"><span class="num m c-sp vd-n">0</span><span class="lab vd-lab"></span></div>
      <p class="small mt-m" style="margin-bottom:8px;color:var(--tx2)">Number of nights, by each instrument’s verdict</p>
      <div class="dx">
        <span></span><span class="dx-h">Phone:<br>7 h or more</span><span class="dx-h">Phone:<br>under 7 h</span>
        <span class="dx-r">Lab: 7 h or more</span><b class="dx-c vd-yy"></b><b class="dx-c bo vd-yn"></b>
        <span class="dx-r">Lab: under 7 h</span><b class="dx-c wo vd-ny"></b><b class="dx-c vd-nn"></b>
      </div>
      <p class="small mt-m vd-so"></p>
    </div>
  </div>
  <div class="src">Synthetic data; the 7-hour verdict is total sleep of 7 hours or more. Dots are spread vertically to reduce overlap.</div>
  <aside class="notes-kw" hidden><ol>
    <li data-k="0" data-key><span class="en">Shift workers: 9 of 48 nights change verdict, 1/5</span></li>
    <li data-k="0"><span class="en">Almost all: the phone says enough, the lab says short</span></li>
    <li data-k="1"><span class="en">Day workers: 5 of 72, 1/14</span></li>
    <li data-k="2"><span class="en">Pooled: 14 of 120; 9 of them shift workers’</span></li>
  </ol></aside>
  <aside class="notes-en" hidden><p>Now the verdict studies use: seven hours or more. Each dot is a night, placed by how far the phone is from the lab. For shift workers, nine of 48 nights change their verdict, about one in five, and in eight of the nine the phone says enough sleep where the lab says short. <b>Click:</b> for day workers, five of 72. <b>Click:</b> pooled, fourteen of 120, nine of them from shift workers.</p><p><b>If asked:</b> the buttons switch the group; every number and the title follow.</p></aside>
</section>
`);
