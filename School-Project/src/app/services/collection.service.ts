import { Injectable, computed, signal } from '@angular/core';
import { CARD_SET, STARTER_COLLECTION } from '../data/card-set';
import { Card, CollectionSlot, Owned, PokemonInfo } from '../models/card';

/** The name we save the collection under in the browser. */
const STORAGE_KEY = 'packvault-collection';

/**
 * Keeps track of which cards the player owns.
 *
 * A service is a class that many pages can share. `providedIn: 'root'` means Angular makes
 * only ONE of it for the whole app, so the Open Packs page and the Collection page see the
 * same cards. The collection is saved in the browser (localStorage), so it is still there
 * after you reload the page.
 */
@Injectable({ providedIn: 'root' })
export class CollectionService {
  /** card number → how many you have. Starts from what was saved, or the starter cards. */
  private readonly owned = signal<Record<number, Owned>>(loadCollection());

  /** One spot per card in the set: the card if you own it, or null if you don't. */
  readonly slots = computed<CollectionSlot[]>(() =>
    CARD_SET.map((info) => {
      const owned = this.owned()[info.number];
      return { number: info.number, card: owned ? { ...info, ...owned } : null };
    }),
  );

  /** How many different cards you own. */
  readonly ownedCount = computed(() => Object.keys(this.owned()).length);

  /**
   * Adds the cards from an opened pack and saves the collection.
   * Returns the pulled cards with their NEW tag and number of copies, for the reveal screens.
   */
  addCards(pulled: PokemonInfo[]): Card[] {
    // Copy the collection and remove the old NEW tags ("new" means "from the latest pack").
    const next: Record<number, Owned> = {};
    for (const [number, owned] of Object.entries(this.owned())) {
      next[Number(number)] = { ...owned, isNew: false };
    }

    const cards = pulled.map((info) => {
      const existing = next[info.number];
      next[info.number] = existing
        ? { ...existing, copies: existing.copies + 1 } // you had it already: one more copy
        : { copies: 1, isNew: true }; // first time: it's new!
      return { ...info, ...next[info.number] };
    });

    this.owned.set(next);
    saveCollection(next);
    return cards;
  }

  /** Back to the 12 starter cards (used by the "Clear saved data" button). */
  reset(): void {
    this.owned.set({ ...STARTER_COLLECTION });
  }
}

function loadCollection(): Record<number, Owned> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // localStorage can be blocked (private mode) or the saved text can be broken.
  }
  return { ...STARTER_COLLECTION };
}

function saveCollection(collection: Record<number, Owned>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
  } catch {
    // If saving fails the app still works, it just forgets the cards after a reload.
  }
}
