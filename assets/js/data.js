// Carry The Flame - Card Database Loader
// Temporary test-repo-safe loader.
// Replace this file with the full generated database when ready.

window.CTF_CARDS = window.CTF_CARDS || [];
window.CTF_CARD_DATABASE = window.CTF_CARD_DATABASE || window.CTF_CARDS;
window.CTF_DATA_STATUS = {
  loaded: Array.isArray(window.CTF_CARDS),
  cardCount: Array.isArray(window.CTF_CARDS) ? window.CTF_CARDS.length : 0,
  note: 'Temporary loader. Full data.js from website repo ZIP still needs to be uploaded when size-safe.'
};

console.info('[CTF] data.js loaded. Cards:', window.CTF_DATA_STATUS.cardCount);
