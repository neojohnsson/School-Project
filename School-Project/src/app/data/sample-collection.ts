import { Card, CollectionSlot } from '../models/card';

/** How many different cards exist in the whole set (the 151 Kanto Pokémon). */
export const SET_SIZE = 151;

/** Small helpers so the list below is easy to read. */
const owned = (card: Card): CollectionSlot => ({ number: card.number, card });
const missing = (number: number): CollectionSlot => ({ number, card: null });

/**
 * SAMPLE DATA: the same cards as in the Figma design.
 * Later this list should come from the cards the player opens on the
 * Open Packs page (for example saved in localStorage or in a backend).
 */
export const SAMPLE_COLLECTION: CollectionSlot[] = [
  owned({
    number: 1,
    name: 'Bulbasaur',
    type: 'Grass',
    hp: 70,
    rarity: 'Common',
    copies: 1,
    isNew: false,
  }),
  owned({
    number: 4,
    name: 'Charmander',
    type: 'Fire',
    hp: 70,
    rarity: 'Common',
    copies: 1,
    isNew: false,
  }),
  owned({
    number: 6,
    name: 'Charizard',
    type: 'Fire',
    hp: 180,
    rarity: 'Ultra rare',
    copies: 1,
    isNew: true,
  }),
  owned({
    number: 7,
    name: 'Squirtle',
    type: 'Water',
    hp: 60,
    rarity: 'Common',
    copies: 1,
    isNew: false,
  }),
  missing(12),
  owned({
    number: 25,
    name: 'Pikachu',
    type: 'Electric',
    hp: 60,
    rarity: 'Rare',
    copies: 1,
    isNew: true,
  }),
  owned({
    number: 39,
    name: 'Jigglypuff',
    type: 'Normal',
    hp: 70,
    rarity: 'Uncommon',
    copies: 1,
    isNew: true,
  }),
  owned({
    number: 54,
    name: 'Psyduck',
    type: 'Water',
    hp: 70,
    rarity: 'Common',
    copies: 3,
    isNew: false,
  }),
  missing(68),
  owned({
    number: 94,
    name: 'Gengar',
    type: 'Ghost',
    hp: 130,
    rarity: 'Rare',
    copies: 1,
    isNew: false,
  }),
  owned({
    number: 130,
    name: 'Gyarados',
    type: 'Water',
    hp: 180,
    rarity: 'Rare',
    copies: 1,
    isNew: false,
  }),
  owned({
    number: 133,
    name: 'Eevee',
    type: 'Normal',
    hp: 60,
    rarity: 'Common',
    copies: 2,
    isNew: false,
  }),
  owned({
    number: 143,
    name: 'Snorlax',
    type: 'Normal',
    hp: 150,
    rarity: 'Uncommon',
    copies: 1,
    isNew: false,
  }),
  missing(149),
  owned({
    number: 150,
    name: 'Mewtwo',
    type: 'Psychic',
    hp: 130,
    rarity: 'Ultra rare',
    copies: 1,
    isNew: false,
  }),
];
