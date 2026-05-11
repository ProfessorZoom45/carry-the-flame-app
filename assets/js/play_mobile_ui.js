/* ═══════════════════════════════════════════════════════════════════
   CTF PLAY MOBILE UI v1.0
   Drawer toggles, bottom-sheet animations, mode-switcher (lobby/game),
   phase-aware auto-open of the action sheet.
   ═══════════════════════════════════════════════════════════════════ */
(function(global){
  'use strict';
  function $(id){ return document.getElementById(id); }
  function clsToggle(el, cls, force){
    if(!el) return;
    if(typeof force === 'boolean') el.classList[force ? 'add' : 'remove'](cls);
    else el.classList.toggle(cls);
  }
  function toggleSidebar(force){
    var sb = $('sidebar');
    var bd = $('sidebar-backdrop');
    if(!sb) return;
    var willOpen = (typeof force === 'boolean') ? force : !sb.classList.contains('open');
    clsToggle(sb, 'open', willOpen);
    clsToggle(bd, 'open', willOpen);
    document.body.style.overflow = willOpen ? 'hidden' : '';
  }
  function toggleBottomSheet(force){
    var sh = $('bottom-sheet');
    var chev = $('sheet-chev');
    if(!sh) return;
    var willOpen = (typeof force === 'boolean') ? force : !sh.classList.contains('open');
    clsToggle(sh, 'open', willOpen);
    if(chev) chev.textContent = willOpen ? '⌄' : '⌃';
  }
  var PHASE_NEEDS_INPUT = ['draw','action','battle','resolution','end'];
  var PHASE_LABELS = {turnStart:'Turn Start',draw:'Draw Phase',ignition:'Ignition',action:'Action Phase',battle:'Battle Phase',resolution:'Resolution',end:'End Phase'};
  var lastPhase = null;
  var lastActivePlayer = null;
  function refreshTopbarAndSheet(){
    var GS = global.GS;
    if(!GS) return;
    var phase = GS.phaseName || 'turnStart';
    var label = PHASE_LABELS[phase] || phase;
    var pill = $('topbar-phase');
    if(pill) pill.textContent = label;
    var human = (typeof global.myPlayer === 'number') ? global.myPlayer : 0;
    var isMyTurn = GS.activePlayer === human;
    var phaseChanged = (phase !== lastPhase) || (GS.activePlayer !== lastActivePlayer);
    if(phaseChanged && isMyTurn && PHASE_NEEDS_INPUT.indexOf(phase) !== -1){
      if(window.matchMedia && window.matchMedia('(max-width: 1023px)').matches){
        toggleBottomSheet(true);
      }
    }
    lastPhase = phase;
    lastActivePlayer = GS.activePlayer;
  }
  function showGameScreen(){
    document.body.setAttribute('data-mode','game');
    if(window.matchMedia && window.matchMedia('(max-width: 1023px)').matches){
      toggleBottomSheet(false);
      toggleSidebar(false);
    } else toggleBottomSheet(true);
  }
  function showLobbyScreen(){ document.body.setAttribute('data-mode','lobby'); }
  var toastTimer = null;
  function showToast(msg, ms){
    var t = $('toast');
    if(!t) return;
    t.textContent = String(msg || '');
    t.classList.add('show');
    if(toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ t.classList.remove('show'); }, ms || 2400);
  }
  function init(){
    var hookAttempts = 0;
    var hookTimer = setInterval(function(){
      hookAttempts++;
      if(typeof global.renderAll === 'function'){
        var original = global.renderAll;
        if(!original.__mobileWrapped){
          var wrapped = function(){ try { original.apply(this, arguments); } finally { try { refreshTopbarAndSheet(); } catch(e){} } };
          wrapped.__mobileWrapped = true;
          global.renderAll = wrapped;
          clearInterval(hookTimer);
        }
      } else if(hookAttempts > 40){ clearInterval(hookTimer); }
    },100);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  global.toggleSidebar = toggleSidebar;
  global.toggleBottomSheet = toggleBottomSheet;
  global.showGameScreen = showGameScreen;
  global.showLobbyScreen = showLobbyScreen;
  if(typeof global.showToast !== 'function') global.showToast = showToast;
  global.CTF_MOBILE_UI = {version:'1.0.0',toggleSidebar:toggleSidebar,toggleBottomSheet:toggleBottomSheet,refreshTopbarAndSheet:refreshTopbarAndSheet};
})(typeof window !== 'undefined' ? window : globalThis);
