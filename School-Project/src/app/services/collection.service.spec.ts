import { TestBed } from '@angular/core/testing';

import { MemoryStorage } from '../../testing/memory-storage';
import { CARD_SET } from '../data/card-set';
import { CollectionService } from './collection.service';

describe('CollectionService', () => {
  let collection: CollectionService;
  const find = (number: number) => CARD_SET.find((card) => card.number === number)!;

  beforeEach(() => {
    vi.stubGlobal('localStorage', new MemoryStorage()); // a fresh, empty storage for every test
    collection = TestBed.inject(CollectionService);
  });

  it('starts with the 12 starter cards', () => {
    expect(collection.ownedCount()).toBe(12);
  });

  it('adds new cards and extra copies', () => {
    const [dragonite, pikachu] = collection.addCards([find(149), find(25)]);

    expect(dragonite).toMatchObject({ name: 'Dragonite', copies: 1, isNew: true });
    expect(pikachu).toMatchObject({ name: 'Pikachu', copies: 2, isNew: false });
    expect(collection.ownedCount()).toBe(13);
  });

  it('saves the collection in the browser', () => {
    collection.addCards([find(149)]);

    const saved = JSON.parse(localStorage.getItem('packvault-collection')!);
    expect(saved[149]).toEqual({ copies: 1, isNew: true });
  });
});
