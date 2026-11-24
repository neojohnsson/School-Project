import { Owned, PokemonInfo } from '../models/card';

/** How many different cards exist in the whole Kanto set. Used for "12 / 151 collected". */
export const SET_SIZE = 151;

/**
 * Every card that can come out of a booster pack in our app.
 * (We only made 15 of the 151 so far. Add more here and they work everywhere.)
 */
export const CARD_SET: PokemonInfo[] = [
  { number: 1, name: 'Bulbasaur', type: 'Grass', hp: 70, rarity: 'Common' },
  { number: 4, name: 'Charmander', type: 'Fire', hp: 70, rarity: 'Common' },
  { number: 6, name: 'Charizard', type: 'Fire', hp: 180, rarity: 'Ultra rare' },
  { number: 7, name: 'Squirtle', type: 'Water', hp: 60, rarity: 'Common' },
  { number: 12, name: 'Butterfree', type: 'Bug', hp: 70, rarity: 'Uncommon' },
  { number: 25, name: 'Pikachu', type: 'Electric', hp: 60, rarity: 'Rare' },
  { number: 39, name: 'Jigglypuff', type: 'Normal', hp: 70, rarity: 'Uncommon' },
  { number: 54, name: 'Psyduck', type: 'Water', hp: 70, rarity: 'Common' },
  { number: 68, name: 'Machamp', type: 'Fighting', hp: 130, rarity: 'Rare' },
  { number: 94, name: 'Gengar', type: 'Ghost', hp: 130, rarity: 'Rare' },
  { number: 130, name: 'Gyarados', type: 'Water', hp: 180, rarity: 'Rare' },
  { number: 133, name: 'Eevee', type: 'Normal', hp: 60, rarity: 'Common' },
  { number: 143, name: 'Snorlax', type: 'Normal', hp: 150, rarity: 'Uncommon' },
  { number: 149, name: 'Dragonite', type: 'Dragon', hp: 150, rarity: 'Ultra rare' },
  { number: 150, name: 'Mewtwo', type: 'Psychic', hp: 130, rarity: 'Ultra rare' },
];

/**
 * The cards a new player starts with (the same as in the Figma design).
 * The key is the card number. Butterfree (#012), Machamp (#068) and Dragonite (#149)
 * are missing, so they show as empty spots until you pull them from a pack.
 */
export const STARTER_COLLECTION: Record<number, Owned> = {
  1: { copies: 1, isNew: false },
  4: { copies: 1, isNew: false },
  6: { copies: 1, isNew: true },
  7: { copies: 1, isNew: false },
  25: { copies: 1, isNew: true },
  39: { copies: 1, isNew: true },
  54: { copies: 3, isNew: false },
  94: { copies: 1, isNew: false },
  130: { copies: 1, isNew: false },
  133: { copies: 2, isNew: false },
  143: { copies: 1, isNew: false },
  150: { copies: 1, isNew: false },
};
