/**
 * Types that describe a Pokémon card.
 * A "type" in TypeScript is only a description of the data. It helps the editor
 * catch mistakes, like writing 'Fyre' instead of 'Fire'.
 */

/** Pokémon types. Some of them are filter tabs on the Collection page. */
export type PokemonType =
  | 'Grass'
  | 'Fire'
  | 'Water'
  | 'Electric'
  | 'Psychic'
  | 'Normal'
  | 'Ghost'
  | 'Bug'
  | 'Fighting'
  | 'Dragon';

/** How rare a card is. Every step up adds one black diamond on the card. */
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Ultra rare';

/** The facts printed on a card. They are the same for every player. */
export interface PokemonInfo {
  number: number; // Pokédex number, e.g. 25 for Pikachu
  name: string;
  type: PokemonType;
  hp: number;
  rarity: Rarity;
}

/** What one player has of a card. */
export interface Owned {
  copies: number; // how many of this card the player has (shows "×3")
  isNew: boolean; // true if it came from the latest pack (shows "NEW")
}

/** A card the player owns = the card facts + how many they have. */
export interface Card extends PokemonInfo, Owned {}

/** One spot in the collection grid: a card you own, or an empty spot (card is null). */
export interface CollectionSlot {
  number: number;
  card: Card | null;
}

/** How many diamonds are filled in for each rarity. */
export const RARITY_LEVEL: Record<Rarity, number> = {
  Common: 1,
  Uncommon: 2,
  Rare: 3,
  'Ultra rare': 4,
};

/** Turns 25 into "#025". */
export function formatNumber(number: number): string {
  return '#' + String(number).padStart(3, '0');
}

/** The official artwork image for a Pokémon (from PokéAPI's free image collection). */
export function artworkUrl(number: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;
}
