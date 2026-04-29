// Carry The Flame - Split Card Database Loader
// Generated for Patch 57 clean PTCG build.
// Load data_part1.js through data_part8.js before this file.

(function(global){
  const parts = [];
  for(let i = 1; i <= 8; i++){
    const part = global[`CTF_DATA_PART_${i}`];
    if(Array.isArray(part)) parts.push(part);
  }
  const merged = parts.flat();
  global.CTF_CARDS = merged;
  global.CTF_CARD_DATABASE = merged;
  global.CTF_DATA_STATUS = {
    loaded: true,
    splitMode: true,
    expectedParts: 8,
    partsLoaded: parts.length,
    cardCount: merged.length,
    note: parts.length === 8 ? 'Full clean PTCG database loaded.' : 'Database loader active, but not all data parts are uploaded/loaded yet.'
  };
  console.info('[CTF] Split data loaded:', global.CTF_DATA_STATUS);
})(window);
