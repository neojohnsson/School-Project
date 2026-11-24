import { Component, computed, inject, signal } from '@angular/core';
import { AppHeader } from '../../components/app-header/app-header';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';
import { CARD_SET, SET_SIZE } from '../../data/card-set';
import { CollectionSlot, PokemonType, RARITY_LEVEL, Rarity, formatNumber } from '../../models/card';
import { CollectionService } from '../../services/collection.service';

type TypeFilter = 'All' | PokemonType;
type SortOption = 'number' | 'name';

/** How many cards to show before the user clicks "Load more". */
const PAGE_SIZE = 15;

/**
 * Home page = "My collection" (page 3 in Figma).
 * Shows every card the player owns, with filter tabs, search, sorting and "Load more".
 */
@Component({
  selector: 'app-home-page',
  // Everything the template uses must be imported here:
  // AppHeader for <app-header>, PokemonCard for <app-pokemon-card>.
  imports: [AppHeader, PokemonCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  // ---------- Data ----------
  // The collection is shared with the Open Packs page, so new cards show up here.
  private readonly collection = inject(CollectionService);
  protected readonly slots = this.collection.slots;
  protected readonly setSize = SET_SIZE;
  protected readonly tabs: TypeFilter[] = [
    'All',
    'Grass',
    'Fire',
    'Water',
    'Electric',
    'Psychic',
    'Normal',
  ];
  protected readonly formatNumber = formatNumber; // so the template can use it

  // ---------- State ----------
  // A signal is a value that Angular watches. When it changes, the page updates by itself.
  protected readonly activeType = signal<TypeFilter>('All');
  protected readonly search = signal('');
  protected readonly sortBy = signal<SortOption>('number');
  protected readonly shownCount = signal(PAGE_SIZE);

  // ---------- Values calculated from the state ----------
  // computed() recalculates only when a signal it reads changes.
  protected readonly ownedCount = this.collection.ownedCount;
  protected readonly progress = computed(() => (this.ownedCount() / this.setSize) * 100);

  /** For the table: per rarity, how many cards you own and how many can come out of packs. */
  protected readonly rarityRows = computed(() =>
    (Object.keys(RARITY_LEVEL) as Rarity[]).map((rarity) => ({
      rarity,
      owned: this.slots().filter((slot) => slot.card?.rarity === rarity).length,
      total: CARD_SET.filter((card) => card.rarity === rarity).length,
    })),
  );

  /** The slots that match the active tab + search, in the chosen order. */
  protected readonly filteredSlots = computed(() => {
    const type = this.activeType();
    const query = this.search().trim().toLowerCase();
    const isFiltering = type !== 'All' || query !== '';

    const result = this.slots().filter((slot) => {
      // Empty spots have no name or type, so only show them when nothing is filtered.
      if (!slot.card) return !isFiltering;
      const matchesType = type === 'All' || slot.card.type === type;
      const matchesSearch = slot.card.name.toLowerCase().includes(query);
      return matchesType && matchesSearch;
    });

    return result.sort(this.sortBy() === 'name' ? compareByName : compareByNumber);
  });

  /** Only the first `shownCount` slots are on screen. */
  protected readonly shownSlots = computed(() => this.filteredSlots().slice(0, this.shownCount()));
  protected readonly hasMore = computed(() => this.filteredSlots().length > this.shownCount());

  // ---------- Actions (called from the template) ----------
  protected selectType(type: TypeFilter): void {
    this.activeType.set(type);
    this.shownCount.set(PAGE_SIZE); // start from the top again
  }

  protected setSearch(value: string): void {
    this.search.set(value);
    this.shownCount.set(PAGE_SIZE);
  }

  protected setSort(value: string): void {
    this.sortBy.set(value as SortOption);
  }

  protected loadMore(): void {
    this.shownCount.update((count) => count + PAGE_SIZE);
  }
}

/** Sort helpers for Array.sort: a negative result puts `a` first, a positive one puts `b` first. */
function compareByNumber(a: CollectionSlot, b: CollectionSlot): number {
  return a.number - b.number;
}

function compareByName(a: CollectionSlot, b: CollectionSlot): number {
  if (!a.card && !b.card) return compareByNumber(a, b);
  if (!a.card) return 1; // empty spots go to the end
  if (!b.card) return -1;
  return a.card.name.localeCompare(b.card.name);
}
