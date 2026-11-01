/* Q&A cheat sheet for the presenter window (sample talk). Presenter only: never shown on the audience screen,
   and left out of any copy sent to reviewers. Slides are found by data-title, so keep titles stable.
   DeckQA: answer moves {t: name, en: gloss, go: [slide titles], lines: [answer lines]}.
   DeckQABank: questions by asker {who, items: [{hear, say, go}]}, shown from the thank-you slide on. */
window.DeckQA = [
  { t: 'Reference', en: 'what we compare to', go: ['Did this participant sleep 7 hours?', 'How agreement is counted'],
    lines: ['The lab is the usual reference, not the truth.', 'Agreement: within 30 minutes, fixed before the comparison.'] },
  { t: 'Group', en: 'who it fails for', go: ['RQ3: where the verdict changes'],
    lines: ['Shift workers: 9 of 48 nights change verdict; day workers: 5 of 72.'] },
  { t: 'Scope', en: 'what the sample covers', go: ['Where the nights were recorded', 'Limitations and next steps'],
    lines: ['40 people, three clinics, one phone model.'] },
];
window.DeckQABank = [
  { who: 'Advisor', items: [
    { hear: 'Why trust the lab?', say: 'It is the reference sleep studies use; it has errors of its own, so I call it a reference.', go: ['How agreement is counted'] },
  ] },
  { who: 'Statistician', items: [
    { hear: 'Why a 30-minute band?', say: 'Fixed in advance: half the gap between the 7- and 8-hour verdicts.', go: ['How agreement is counted'] },
    { hear: 'Are the nights independent?', say: 'No, three per person; the counts describe, no test is claimed.', go: ['RQ2: how well the phone agrees'] },
  ] },
  { who: 'Outside reader', items: [
    { hear: 'Would another phone do better?', say: 'Not tested here; it is the second next step.', go: ['Limitations and next steps'] },
  ] },
];
