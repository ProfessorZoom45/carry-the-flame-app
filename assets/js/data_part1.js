// Carry The Flame - Split Card Database Part 1
// Test repo seed data part.
// Replace/expand with the full exported database chunk when available.

window.CTF_DATA_PART_1 = [
  {
    id: "BL1-000",
    set: "BL1",
    cardNumber: "000",
    name: "Yoichi Isagi",
    category: "Effect Catalyst",
    type: "Wind",
    alignment: "Wind",
    level: 4,
    pressure: 1800,
    counterPressure: 1200,
    atk: 1800,
    def: 1200,
    group: "Warrior/Striker/Effect",
    kinds: ["Warrior", "Striker", "Effect"],
    fusion: 0,
    desc: "When this card destroys a Catalyst in battle, draw 1 card. [BL1]"
  },
  {
    id: "BL1-001",
    set: "BL1",
    cardNumber: "001",
    name: "Meguru Bachira",
    category: "Effect Catalyst",
    type: "Wind",
    alignment: "Wind",
    level: 4,
    pressure: 1750,
    counterPressure: 1300,
    atk: 1750,
    def: 1300,
    group: "Warrior/Striker/Effect",
    kinds: ["Warrior", "Striker", "Effect"],
    fusion: 0,
    desc: "If a Catalyst of that Type attacks this card, negate the attack and inflict 500 Logic Damage. [BL1]"
  },
  {
    id: "RKN-SAMPLE-001",
    set: "RKN",
    name: "Himura - Hitokiri Battousai",
    category: "Effect Catalyst",
    type: "Fire",
    alignment: "Fire",
    level: 4,
    pressure: 1900,
    counterPressure: 1200,
    atk: 1900,
    def: 1200,
    group: "Warrior/Effect",
    kinds: ["Warrior", "Effect"],
    fusion: 0,
    desc: "Sample testing entry for image normalization and card browser rendering."
  },
  {
    id: "ANM-SAMPLE-001",
    set: "ANM",
    name: "Reese The Great's Gundam",
    category: "Great Effect Catalyst",
    type: "Light",
    alignment: "Light",
    level: 8,
    pressure: 3000,
    counterPressure: 2800,
    atk: 3000,
    def: 2800,
    group: "Machine/Gundam/Great/Effect",
    kinds: ["Machine", "Gundam", "Great", "Effect"],
    fusion: 0,
    desc: "Sample Great Catalyst testing entry. Great Cards cannot enter the Box and may be used as End Phase cost under v9 rules."
  }
];

console.info('[CTF] data_part1.js loaded:', window.CTF_DATA_PART_1.length, 'cards');
