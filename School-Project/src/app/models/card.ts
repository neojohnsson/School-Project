/**
 * Types that describe a Pokémon card.
 * A "type" in TypeScript is only a description of the data. It helps the editor
 * catch mistakes, like writing 'Fyre' instead of 'Fire'.
 */

/** Pokémon types. Each one (except Ghost) is a filter tab on the Collection page. */
export type PokemonType = 'Grass' | 'Fire' | 'Water' | 'Electric' | 'Psychic' | 'Normal' | 'Ghost';

/** How rare a card is. Every step up adds one black diamond on the card. */
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Ultra rare';

/** One card the player owns. */
export interface Card {
  number: number; // Pokédex number, e.g. 25 for Pikachu
  name: string;
  type: PokemonType;
  hp: number;
  rarity: Rarity;
  copies: number; // how many of this card the player has (shows "×3")
  isNew: boolean; // true if it came from the latest pack (shows "NEW")
}

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
