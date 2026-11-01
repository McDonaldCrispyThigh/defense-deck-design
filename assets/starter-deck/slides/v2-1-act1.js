/* Act I · how the phone measure is built (sample talk) */
Deck.add('act1', `
<section data-title="Step 1: scoring each epoch" data-demo="epochs" data-steps="3" data-acc="ai">
  <div class="eyebrow e">RQ1 · Scoring the night</div>
  <h2 class="title e">Each night is cut into <em>30-second epochs</em>, and a model labels every one.</h2>
  <div class="g2 body">
    <div class="col jc e"><svg class="ep-svg" viewBox="0 0 820 470" role="img" aria-label="Schematic: a motion trace cut into 30-second epochs, each labelled asleep or awake"></svg></div>
    <div class="steps jc">
      <div class="e"><b>Record motion and sound</b><span>The phone lies on the mattress; three nights per participant.</span></div>
      <div class="e" data-s="1"><b>Cut the night into 30-second epochs</b><span>960 epochs between 23:00 and 07:00.</span></div>
      <div class="e" data-s="2"><b>A model labels each epoch</b><span>Asleep or awake; trained on other people’s lab nights, never on these.</span></div>
      <div class="e" data-s="3"><b>Add up the asleep epochs</b><span>Total sleep = asleep epochs × 30 seconds.</span></div>
    </div>
  </div>
  <div class="src">Diagram schematic, not to scale. Sample talk; the method is illustrative.</div>
  <div class="xrefs"><a class="xref" data-goto="s-sites" data-label="Where the nights were recorded"></a></div>
  <div class="conv e"><span class="dots"><i class=""></i><i class="on"></i><i class=""></i><i class=""></i><i class=""></i></span><span><b>Sleep studies usually score sleep in a lab,</b> while this one scores it at home from a phone.</span></div>
  <aside class="notes-kw" hidden><ol>
    <li data-k="0"><span class="en">The phone records motion and sound</span></li>
    <li data-k="1"><span class="en">30-second epochs, 960 a night</span></li>
    <li data-k="2" data-key><span class="en">A model labels each epoch: asleep or awake</span></li>
    <li data-k="3"><span class="en">Total sleep = asleep epochs × 30 s</span></li>
  </ol></aside>
  <aside class="notes-en" hidden><p>How the phone measure is built. The phone records motion and sound. <b>Click:</b> the night is cut into thirty-second epochs, the same unit the lab uses. <b>Click:</b> a model labels each epoch asleep or awake. <b>Click:</b> total sleep is the asleep epochs times thirty seconds.</p><p><b>If asked:</b> S2 shows where the participants were recruited.</p></aside>
</section>
`);
