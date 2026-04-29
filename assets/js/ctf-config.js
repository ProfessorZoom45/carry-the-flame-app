// Carry The Flame - Core Game Configuration

window.CTF_CONFIG = {
  STARTING_CHI: 10000,
  STARTING_HAND: 5,
  HAND_LIMIT: 7,

  DECK: {
    MIN: 40,
    MAX: 60,
    FUSION_MAX: 15,
    SIDE_MIN: 0,
    SIDE_MAX: 15
  },

  PHASES: [
    'START',
    'DRAW',
    'IGNITION',
    'ACTION',
    'BATTLE',
    'RESOLUTION',
    'END'
  ],

  WIN_CONDITIONS: {
    CHI_ZERO: true,
    KILLS: 7,
    EXTRACTIONS: 7
  },

  RULES: {
    DECK_OUT_NO_LOSS: true,
    SHOTGUN_DRAW_ON_SPECIAL: true
  },

  GREAT_CARD: {
    MAX_PER_DECK: 5,
    ONE_COPY_EACH: true,
    CANNOT_BE_CAPTURED: true,
    GOES_TO_VOID_ON_DEFEAT: true,
    CANNOT_BE_USED_FOR_EXTRACTION: true
  },

  LIBRA: {
    ENABLED: true,
    REQUIRES_TWO_NORMAL: true,
    ONE_SPECIAL_SUMMON: true,
    OPPONENT_DRAWS_ONCE: true
  }
};
