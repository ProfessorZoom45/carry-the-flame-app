// Carry The Flame - Engine Scaffold
// Test repo only. Battle helpers aligned to Beginner's Guide v9.

(function(global){
  const cfg = global.CTF_CONFIG || {};

  function num(value){
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  function pressure(card){
    return num(card?.pressure ?? card?.atk ?? card?.ATK ?? card?.Pressure);
  }

  function counterPressure(card){
    return num(card?.counterPressure ?? card?.def ?? card?.DEF ?? card?.CounterPressure);
  }

  function isGreat(card){
    const name = String(card?.name || card?.NAME || '').toLowerCase();
    const group = String(card?.group || card?.GROUP || card?.kinds || '').toLowerCase();
    return /\bgreat\b/.test(name) || /\bgreat\b/.test(group);
  }

  function resolveBattle(attacker, defender, defenderPosition){
    const atk = pressure(attacker);
    const defPos = String(defenderPosition || 'ATK').toUpperCase();

    if(!defender){
      return {
        type: 'DIRECT_ATTACK',
        damageToDefenderController: atk,
        summary: `Direct attack for ${atk} Logic Damage.`
      };
    }

    if(defPos === 'ATK'){
      const targetAtk = pressure(defender);
      if(atk > targetAtk){
        return {
          type: 'ATK_GT_ATK',
          defenderDestination: 'VOID',
          killForAttacker: 1,
          damageToDefenderController: atk - targetAtk,
          summary: 'Attacker wins ATK vs ATK. Defender goes to Void. Damage equals Pressure difference.'
        };
      }
      if(atk < targetAtk){
        return {
          type: 'ATK_LT_ATK',
          attackerDestination: 'VOID',
          killForDefender: 1,
          damageToAttackerController: targetAtk - atk,
          summary: 'Attacker loses ATK vs ATK. Attacker goes to Void. Attacker takes Pressure difference.'
        };
      }
      return {
        type: 'ATK_EQ_ATK',
        attackerDestination: 'VOID',
        defenderDestination: 'VOID',
        killForAttacker: 1,
        killForDefender: 1,
        damageToAttackerController: 0,
        damageToDefenderController: 0,
        summary: 'Equal ATK vs ATK. Mutual Kill. No Logic Damage.'
      };
    }

    const def = counterPressure(defender);
    if(atk > def){
      if(isGreat(defender)){
        return {
          type: 'ATK_GT_DEF_GREAT',
          defenderDestination: 'VOID',
          killForAttacker: 1,
          capture: false,
          damageToDefenderController: 0,
          summary: 'ATK beats DEF Great Card. Great goes to Void, counts as Kill, no Logic Damage.'
        };
      }
      return {
        type: 'ATK_GT_DEF_NON_GREAT',
        defenderDestination: 'ATTACKER_BOX',
        capture: true,
        killForAttacker: 0,
        damageToDefenderController: 0,
        summary: 'ATK beats non-Great DEF. Defender is captured to attacker Box. No Logic Damage.'
      };
    }
    if(atk === def){
      return {
        type: 'ATK_EQ_DEF',
        noDestruction: true,
        damageToAttackerController: 0,
        damageToDefenderController: 0,
        summary: 'ATK equals DEF. Attacker bounces off. No destruction, no Logic Damage.'
      };
    }
    return {
      type: 'ATK_LT_DEF',
      noDestruction: true,
      damageToAttackerController: def - atk,
      summary: 'ATK loses to DEF. No destruction. Attacker controller takes DEF minus ATK Logic Damage.'
    };
  }

  function createGameState(){
    return {
      chi: { p1: cfg.STARTING_CHI || 10000, p2: cfg.STARTING_CHI || 10000 },
      kills: { p1: 0, p2: 0 },
      extractions: { p1: 0, p2: 0 },
      turn: 1,
      phaseIndex: 0,
      phases: (cfg.PHASES || ['TURN_START','DRAW','IGNITION','ACTION','BATTLE','RESOLUTION','END']).slice()
    };
  }

  global.CTF_ENGINE = {
    createGameState,
    resolveBattle,
    pressure,
    counterPressure,
    isGreat
  };
})(window);
