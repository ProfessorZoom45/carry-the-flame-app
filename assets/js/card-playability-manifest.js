// Carry The Flame card playability manifest fallback for test repo.
// Main CTF repo has the full generated manifest; this fallback prevents v3.3 play.html from 404ing during mobile layout testing.
window.CTF_CARD_PLAYABILITY = window.CTF_CARD_PLAYABILITY || {
  generatedAt: new Date().toISOString(),
  total: 0,
  counts: { normal: 0, auto: 0, generic: 0, manual: 0 },
  manualIds: [],
  autoIds: [],
  genericIds: [],
  notes: 'Fallback manifest for carry-the-flame-app test repo. Replace with full generated manifest from ProfessorZoom45/CTF when doing effect coverage QA.'
};
