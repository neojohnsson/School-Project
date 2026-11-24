import { PokemonInfo, Rarity } from '../models/card';
import { CARD_SET } from './card-set';

export const CARDS_PER_PACK = 5;

/** Chance (out of 100) for each rarity on the first 4 cards. */
const NORMAL_ODDS: [Rarity, number][] = [
  ['Common', 60],
  ['Uncommon', 30],
  ['Rare', 10],
];

/** The last card is always "Rare or better", just like a real booster pack. */
const RARE_SLOT_ODDS: [Rarity, number][] = [
  ['Rare', 80],
  ['Ultra rare', 20],
];

/**
 * Makes a new random booster pack with 5 cards.
 * `random` is Math.random by default; tests can pass their own to get the same pack every time.
 */
export function createBoosterPack(random: () => number = Math.random): PokemonInfo[] {
  const pack: PokemonInfo[] = [];
  for (let i = 0; i < CARDS_PER_PACK - 1; i++) {
    pack.push(randomCard(pickRarity(NORMAL_ODDS, random), random));
  }
  pack.push(randomCard(pickRarity(RARE_SLOT_ODDS, random), random));
  return pack;
}

/** Rolls a number from 0 to 100 and finds which rarity it lands on. */
function pickRarity(odds: [Rarity, number][], random: () => number): Rarity {
  let roll = random() * 100;
  for (const [rarity, chance] of odds) {
    if (roll < chance) return rarity;
    roll -= chance;
  }
  return odds[odds.length - 1][0];
}

/** Picks a random card with the given rarity. */
function randomCard(rarity: Rarity, random: () => number): PokemonInfo {
  const options = CARD_SET.filter((card) => card.rarity === rarity);
  return options[Math.floor(random() * options.length)];
}
