import { createBoosterPack } from './booster-pack';

describe('createBoosterPack', () => {
  it('has 5 cards and the last one is always rare or better', () => {
    // Open 50 packs to be sure it is not luck
    for (let i = 0; i < 50; i++) {
      const pack = createBoosterPack();
      expect(pack.length).toBe(5);
      expect(['Rare', 'Ultra rare']).toContain(pack[4].rarity);
    }
  });

  it('gives the same pack when the "random" numbers are the same', () => {
    const alwaysZero = () => 0; // always picks the most common rarity and the first card
    const names = createBoosterPack(alwaysZero).map((card) => card.name);

    expect(names).toEqual(['Bulbasaur', 'Bulbasaur', 'Bulbasaur', 'Bulbasaur', 'Pikachu']);
  });
});
