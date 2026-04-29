// Carry The Flame - Split Card Database Loader
// Load order required in HTML:
// 1. assets/js/data_part1.js
// 2. assets/js/data_part2.js
// 3. assets/js/data_part3.js
// 4. assets/js/data.js

(function(global){
  const parts = [
    global.CTF_DATA_PART_1,
    global.CTF_DATA_PART_2,
    global.CTF_DATA_PART_3
  ].filter(Array.isArray);

  const merged = parts.flat();

  global.CTF_CARDS = merged;
  global.CTF_CARD_DATABASE = merged;
  global.CTF_DATA_STATUS = {
    loaded: true,
    splitMode: true,
    partsLoaded: parts.length,
    cardCount: merged.length,
    note: parts.length === 3
      ? 'Full split database loaded.'
      : 'Split database loader active, but not all data parts are uploaded yet.'
  };

  console.info('[CTF] Split data loaded:', global.CTF_DATA_STATUS);
})(window);
