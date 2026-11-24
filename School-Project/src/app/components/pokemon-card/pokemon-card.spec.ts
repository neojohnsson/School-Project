import { TestBed } from '@angular/core/testing';

import { Card } from '../../models/card';
import { PokemonCard } from './pokemon-card';

describe('PokemonCard', () => {
  const pikachu: Card = {
    number: 25,
    name: 'Pikachu',
    type: 'Electric',
    hp: 60,
    rarity: 'Rare',
    copies: 1,
    isNew: true,
  };

  it('shows the name, number, NEW tag and 3 rarity diamonds', async () => {
    await TestBed.configureTestingModule({ imports: [PokemonCard] }).compileComponents();
    const fixture = TestBed.createComponent(PokemonCard);
    fixture.componentRef.setInput('card', pikachu);
    await fixture.whenStable();

    const card: HTMLElement = fixture.nativeElement;
    expect(card.querySelector('.name')?.textContent).toContain('Pikachu');
    expect(card.querySelector('.number')?.textContent).toContain('#025');
    expect(card.querySelector('.tag')?.textContent).toContain('NEW');
    expect(card.querySelectorAll('.pip.on').length).toBe(3);
  });
});
