// Carry The Flame - Core Game Configuration
// Aligned to CTF Beginner's Guide v9 rules.
// Test repo only: ProfessorZoom45/carry-the-flame-app

window.CTF_CONFIG = {
  STARTING_CHI: 10000,
  STARTING_HAND: 5,
  HAND_LIMIT: 7,

  DECK: {
    MAIN_MIN: 40,
    MAIN_MAX: 60,
    FUSION_MIN: 0,
    FUSION_MAX: 15,
    SIDE_MIN: 0,
    SIDE_MAX: 15,
    COPIES_PER_CARD_MAX: 3
  },

  PHASES: [
    'TURN_START',
    'DRAW',
    'IGNITION',
    'ACTION',
    'BATTLE',
    'RESOLUTION',
    'END'
  ],

  TURN_RULES: {
    FIRST_PLAYER_DRAWS_TURN_ONE: true,
    FIRST_PLAYER_CANNOT_ATTACK_TURN_ONE: true,
    ATTACKING_ALWAYS_OPTIONAL: true,
    NORMAL_SUMMONS_PER_TURN: 1,
    POSITION_CHANGES_PER_TURN: 1,
    CANNOT_CHANGE_POSITION_SAME_TURN_SUMMONED: true,
    SPECIAL_SUMMON_HARD_CAP: 5
  },

  WIN_CONDITIONS: {
    CHI_KO_AT: 0,
    KILLS_REQUIRED: 7,
    EXTRACTIONS_REQUIRED: 7,
    PATHS_DO_NOT_MIX: true
  },

  DRAW_RULES: {
    EMPTY_DECK_IS_NOT_LOSS: true,
    EMPTY_DECK_SKIP_DRAW: true,
    DRAW_PER_TURN: 1
  },

  SHOTGUN_RULE: {
    ENABLED: true,
    EVERY_SPECIAL_SUMMON_TRIGGERS: true,
    TRIGGER_NUMBERS: [1, 2, 3, 4, 5],
    OPPONENT_DRAWS_PER_TRIGGER: 1,
    LIBRA_COUNTS_AS_ONE_SPECIAL_SUMMON: true,
    LIBRA_TRIGGERS_EXACTLY_ONE_DRAW: true,
    LIBRA_HAS_NO_PER_CATALYST_DRAW: true
  },

  END_PHASE: {
    ACTIONS: ['END_TURN', 'EXTRACTION', 'RESCUE', 'DESTROY_TRICK'],
    END_TURN_ALWAYS_LEGAL: true,
    END_TURN_COST: 0,
    PAID_ACTION_COST: 'SACRIFICE_1_ELIGIBLE_CATALYST_TO_VOID',
    GREAT_CARDS_CAN_PAY_COST: true,
    NON_GREAT_CATALYSTS_CAN_PAY_COST: true,
    LIBRA_ZONE_CARDS_CANNOT_PAY_COST: true,
    DISCARD_TO_HAND_LIMIT_AFTER_ACTION: true,
    PLAYER_CHOOSES_DISCARDS: true
  },

  GREAT_CARD: {
    MAX_TOTAL_PER_DECK: 5,
    MAX_COPIES_PER_GREAT_CARD: 1,
    CANNOT_ENTER_BOX: true,
    CANNOT_BE_CAPTURED: true,
    DEF_LOSS_REDIRECTS_TO_VOID: true,
    DEF_LOSS_COUNTS_AS_KILL: true,
    DEF_LOSS_CAUSES_LOGIC_DAMAGE: false,
    CANNOT_BE_EXTRACTED: true,
    EXTRACT_ATTEMPT_GOES_TO_VOID_AS_KILL: true,
    CAN_BE_END_PHASE_COST: true,
    CAN_BE_KILLED_ATK_VS_ATK: true
  },

  LIBRA: {
    ENABLED: true,
    ZONES_ARE_OUTERMOST_TRICK_SLOTS: true,
    ONLY_NORMAL_CATALYSTS_AS_SCALES: true,
    CARDS_TREATED_AS_TRICKS: true,
    CAN_BE_DESTROYED_BY_EFFECTS: true,
    CANNOT_BE_END_PHASE_SACRIFICE: true,
    SUMMON_LEVELS_STRICTLY_BETWEEN_SCALES: true,
    MAX_CATALYSTS_PER_LIBRA_SUMMON: 5,
    COUNTS_AS_ONE_SPECIAL_SUMMON: true,
    TRIGGERS_EXACTLY_ONE_SHOTGUN_DRAW: true,
    NO_PER_CATALYST_SHOTGUN_DRAWS: true,
    NO_RETROACTIVE_EFFECT_WHEN_SCALE_DESTROYED: true
  },

  DIRECT_ATTACK: {
    REQUIRES_OPPONENT_ENTIRE_FIELD_EMPTY: true,
    DEF_CATALYSTS_BLOCK_DIRECT_ATTACK: true,
    LIBRA_ZONE_CARDS_BLOCK_DIRECT_ATTACK: true,
    DAMAGE_EQUALS_FULL_PRESSURE: true
  },

  BATTLE: {
    STAT_NAMES: {
      ATTACK: 'Pressure',
      DEFENSE: 'Counter Pressure',
      DAMAGE: 'Logic Damage'
    },
    OUTCOMES: {
      ATK_GT_ATK: {
        loserDestination: 'VOID',
        countsAsKill: true,
        logicDamage: 'PRESSURE_DIFFERENCE_TO_LOSER'
      },
      ATK_LT_ATK: {
        attackerDestination: 'VOID',
        countsAsKillForDefender: true,
        logicDamage: 'PRESSURE_DIFFERENCE_TO_ATTACKER'
      },
      ATK_EQ_ATK: {
        bothDestination: 'VOID',
        countsAsMutualKill: true,
        killGainEachPlayer: 1,
        logicDamage: 0
      },
      ATK_GT_DEF_NON_GREAT: {
        defenderDestination: 'ATTACKER_BOX',
        countsAsCapture: true,
        countsAsKill: false,
        logicDamage: 0
      },
      ATK_GT_DEF_GREAT: {
        defenderDestination: 'VOID',
        countsAsKill: true,
        countsAsCapture: false,
        logicDamage: 0
      },
      ATK_EQ_DEF: {
        noDestruction: true,
        attackerBouncesOff: true,
        logicDamage: 0
      },
      ATK_LT_DEF: {
        noDestruction: true,
        noCapture: true,
        attackerControllerTakesDamage: true,
        logicDamage: 'DEF_MINUS_ATK_TO_ATTACKER'
      },
      DIRECT_ATTACK: {
        logicDamage: 'FULL_ATTACKER_PRESSURE'
      }
    }
  },

  CHAINS: {
    RESOLUTION: 'LIFO',
    PALM_TRICKS_CAN_START_CHAIN: true,
    PALM_TRICKS_CAN_RESPOND: false,
    CONCEALED_TRICKS_CAN_RESPOND: true,
    COUNTER_TRICKS_ONLY_RESPONDABLE_BY_COUNTER_TRICKS: true
  },

  CARD_TYPES: {
    CATALYST: 'Catalyst',
    PALM_TRICK: 'Palm Trick',
    CONCEALED_TRICK: 'Concealed Trick',
    FIELD_TRICK: 'Field Trick',
    FUSION_CARD: 'Fusion Card'
  },

  ZONES: {
    VOID: 'Void',
    BOX: 'Box',
    RFG: 'Removed From Game',
    CATALYST_ZONE_MAX: 5,
    TRICK_ZONE_TOTAL: 5,
    FIELD_TRICK_ACTIVE_PER_PLAYER: 1
  }
};
