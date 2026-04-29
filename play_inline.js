// Carry The Flame - Inline Play Boot Script
// Initializes basic game state and connects UI to engine

(function(){
  console.log('[CTF] Play inline boot starting...');

  window.CTF_GAME = {
    phase: 'START',
    turn: 1,
    currentPlayer: 1,
    chi: {
      p1: 10000,
      p2: 10000
    },
    kills: {
      p1: 0,
      p2: 0
    },
    extractions: {
      p1: 0,
      p2: 0
    }
  };

  function updateUI(){
    console.log('[CTF] UI sync', window.CTF_GAME);
  }

  function nextPhase(){
    const phases = ['START','DRAW','IGNITION','ACTION','BATTLE','RESOLUTION','END'];
    let i = phases.indexOf(window.CTF_GAME.phase);
    i = (i + 1) % phases.length;
    window.CTF_GAME.phase = phases[i];
    if(window.CTF_GAME.phase === 'START'){
      window.CTF_GAME.turn++;
      window.CTF_GAME.currentPlayer = window.CTF_GAME.currentPlayer === 1 ? 2 : 1;
    }
    updateUI();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    console.log('[CTF] Play UI ready');

    const phaseBtn = document.getElementById('next-phase-btn');
    if(phaseBtn){
      phaseBtn.addEventListener('click', nextPhase);
    }

    updateUI();
  });
})();
