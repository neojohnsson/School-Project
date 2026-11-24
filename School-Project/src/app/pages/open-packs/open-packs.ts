import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppHeader } from '../../components/app-header/app-header';
import { BoosterPack } from '../../components/booster-pack/booster-pack';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';
import { CARDS_PER_PACK, createBoosterPack } from '../../data/booster-pack';
import { Card } from '../../models/card';
import { CollectionService } from '../../services/collection.service';

/**
 * The 3 parts of opening a pack (the 4 Figma screens):
 *  - 'pack'    = 2.1 Sealed and 2.2 Tearing (tearProgress tells them apart)
 *  - 'reveal'  = 2.3 One card at a time
 *  - 'summary' = 2.4 All 5 cards
 */
type Phase = 'pack' | 'reveal' | 'summary';

/** How long the "pack opens, cards slide out" animation plays before the first card shows. */
const OPEN_ANIMATION_MS = 1100;

@Component({
  selector: 'app-open-packs',
  imports: [RouterLink, AppHeader, BoosterPack, PokemonCard],
  templateUrl: './open-packs.html',
  styleUrl: './open-packs.css',
})
export class OpenPacks {
  private readonly collection = inject(CollectionService);

  // ---------- State ----------
  protected readonly phase = signal<Phase>('pack');
  protected readonly tearProgress = signal(0); // 0 = sealed, 1 = torn open
  protected readonly pulled = signal<Card[]>([]); // the 5 cards, filled in when the pack opens
  protected readonly revealIndex = signal(0); // which card we are showing (0 to 4)

  /** The 5 cards inside this pack are decided as soon as you get the pack. */
  private pack = createBoosterPack();
  private tearTimer?: ReturnType<typeof setInterval>;
  private revealTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    // Stop the timers if you leave the page in the middle of an animation.
    inject(DestroyRef).onDestroy(() => this.stopTimers());
  }

  // ---------- Values for the template ----------
  protected readonly segments = Array.from({ length: CARDS_PER_PACK }, (_, i) => i);
  protected readonly tearPercent = computed(() => Math.round(this.tearProgress() * 100));
  protected readonly current = computed(() => this.pulled()[this.revealIndex()]);
  protected readonly isLastCard = computed(() => this.revealIndex() === this.pulled().length - 1);

  /** The short line under the card name on the reveal screen. */
  protected readonly revealMessage = computed(() => {
    const card = this.current();
    if (card.rarity === 'Ultra rare') return 'An ultra rare, amazing pull!';
    if (card.rarity === 'Rare') return 'A rare one, nice pull!';
    if (card.isNew) return 'New card for your collection!';
    return 'You already have this one.';
  });

  /** The short line on the summary screen. */
  protected readonly summaryText = computed(() => {
    // A Set removes doubles, in case you pulled the same new card twice.
    const newCards = new Set(
      this.pulled()
        .filter((card) => card.isNew)
        .map((c) => c.number),
    ).size;
    if (newCards === 0) return 'No new cards this time, but your copies were saved.';
    if (newCards === 1) return '1 new card was added to your collection!';
    return `${newCards} new cards were added to your collection!`;
  });

  /**
   * The 5 cards spread out like a hand of cards. The rare card (the last one) goes in the middle.
   * Each card gets a position, a turn and a layer (zIndex) from how far it is from the middle.
   */
  protected readonly fan = computed(() => {
    const [first, second, third, fourth, rare] = this.pulled();
    return [first, second, rare, third, fourth].map((card, i) => {
      const offset = i - 2; // -2, -1, 0, 1, 2
      return {
        card,
        transform: `translate(${offset * 112}px, ${Math.abs(offset) * 24}px) rotate(${offset * 6}deg) scale(0.82)`,
        zIndex: 3 - Math.abs(offset),
      };
    });
  });

  // ---------- Actions (called from the template) ----------

  /** "Open pack" button: the pack tears by itself, a little bit every 16 milliseconds. */
  protected autoTear(): void {
    if (this.tearTimer) return;
    this.tearTimer = setInterval(() => {
      const next = Math.min(1, this.tearProgress() + 0.025);
      this.tearProgress.set(next);
      if (next >= 1) this.open();
    }, 16);
  }

  /** The pack is fully torn: save the cards, let the animation play, then show card 1. */
  protected open(): void {
    if (this.pulled().length > 0) return; // already opened
    this.stopTimers();
    this.tearProgress.set(1);
    this.pulled.set(this.collection.addCards(this.pack));
    this.revealTimer = setTimeout(() => this.phase.set('reveal'), OPEN_ANIMATION_MS);
  }

  /** "Skip animation": open the pack and go straight to the summary. */
  protected skip(): void {
    this.open();
    this.stopTimers();
    this.phase.set('summary');
  }

  /** "Next card" button, or clicking the card. After the last card: the summary. */
  protected next(): void {
    if (this.isLastCard()) {
      this.phase.set('summary');
    } else {
      this.revealIndex.update((index) => index + 1);
    }
  }

  protected revealAll(): void {
    this.phase.set('summary');
  }

  /** "Open next pack": start again with a new random pack. */
  protected openNextPack(): void {
    this.stopTimers();
    this.pack = createBoosterPack();
    this.pulled.set([]);
    this.tearProgress.set(0);
    this.revealIndex.set(0);
    this.phase.set('pack');
  }

  private stopTimers(): void {
    clearInterval(this.tearTimer);
    clearTimeout(this.revealTimer);
    this.tearTimer = undefined;
    this.revealTimer = undefined;
  }
}
