// Carry The Flame - Deck Utility Helpers
// Uses window.CTF_CONFIG when available.

(function(global){
  const cfg = global.CTF_CONFIG || {};
  const deckCfg = cfg.DECK || {};

  function cardName(card){
    return String((card && (card.name || card.NAME || card.card_name || card.title)) || '').trim();
  }

  function cardKinds(card){
    const raw = card && (card.kinds || card.KINDS || card.group || card.GROUP || card.category || card.type || '');
    if(Array.isArray(raw)) return raw.map(String);
    return String(raw).split(/[\/|,]+/).map(s=>s.trim()).filter(Boolean);
  }

  function isFusion(card){
    const text = cardKinds(card).join(' ').toLowerCase() + ' ' + String(card?.category || card?.type || '').toLowerCase();
    return /fusion/.test(text);
  }

  function isGreat(card){
    const name = cardName(card).toLowerCase();
    const text = cardKinds(card).join(' ').toLowerCase();
    return /\bgreat\b/.test(name) || /\bgreat\b/.test(text);
  }

  function countByName(cards){
    const counts = {};
    (cards || []).forEach(card=>{
      const n = cardName(card);
      if(!n) return;
      counts[n] = (counts[n] || 0) + 1;
    });
    return counts;
  }

  function validateDeck(deck){
    const main = deck?.main || [];
    const fusion = deck?.fusion || [];
    const side = deck?.side || [];
    const errors = [];
    const warnings = [];

    const mainMin = deckCfg.MAIN_MIN ?? deckCfg.MIN ?? 40;
    const mainMax = deckCfg.MAIN_MAX ?? deckCfg.MAX ?? 60;
    const fusionMax = deckCfg.FUSION_MAX ?? 15;
    const sideMin = deckCfg.SIDE_MIN ?? 0;
    const sideMax = deckCfg.SIDE_MAX ?? 15;
    const copyMax = deckCfg.COPIES_PER_CARD_MAX ?? 3;

    if(main.length < mainMin) errors.push(`Main Deck must be at least ${mainMin} cards.`);
    if(main.length > mainMax) errors.push(`Main Deck cannot exceed ${mainMax} cards.`);
    if(fusion.length > fusionMax) errors.push(`Fusion Deck cannot exceed ${fusionMax} cards.`);
    if(side.length < sideMin) errors.push(`Side Deck cannot be below ${sideMin} cards.`);
    if(side.length > sideMax) errors.push(`Side Deck cannot exceed ${sideMax} cards.`);

    main.forEach(card=>{
      if(isFusion(card)) errors.push(`${cardName(card)} is a Fusion card and cannot be in the Main Deck.`);
    });

    fusion.forEach(card=>{
      if(!isFusion(card)) errors.push(`${cardName(card)} is not a Fusion card and cannot be in the Fusion Deck.`);
    });

    const allNonFusion = [...main, ...side];
    const counts = countByName(allNonFusion);
    Object.entries(counts).forEach(([name,count])=>{
      if(count > copyMax) errors.push(`${name} has ${count} copies. Max is ${copyMax}.`);
    });

    const greatCards = main.filter(isGreat);
    const greatCounts = countByName(greatCards);
    if(greatCards.length > 5) errors.push(`Deck has ${greatCards.length} Great Cards. Max is 5.`);
    Object.entries(greatCounts).forEach(([name,count])=>{
      if(count > 1) errors.push(`${name} is a Great Card. Max 1 copy per deck.`);
    });

    if(main.length >= mainMin && main.length <= mainMax && fusion.length <= fusionMax){
      warnings.push('Deck size is legal. Check effect-specific restrictions manually until full engine validation is enabled.');
    }

    return {
      legal: errors.length === 0,
      errors,
      warnings,
      counts: {
        main: main.length,
        fusion: fusion.length,
        side: side.length,
        great: greatCards.length
      }
    };
  }

  function exportDeckText(deck){
    const parts = [];
    function section(title, cards){
      parts.push(`[${title}]`);
      countByName(cards).entries;
      Object.entries(countByName(cards || [])).sort((a,b)=>a[0].localeCompare(b[0])).forEach(([name,count])=>{
        parts.push(`${count}x ${name}`);
      });
      parts.push('');
    }
    section('Main Deck', deck?.main || []);
    section('Fusion Deck', deck?.fusion || []);
    section('Side Deck', deck?.side || []);
    return parts.join('\n').trim() + '\n';
  }

  global.CTF_DECK_UTILS = {
    cardName,
    cardKinds,
    isFusion,
    isGreat,
    countByName,
    validateDeck,
    exportDeckText
  };
})(window);
