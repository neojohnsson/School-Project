import { Component, computed, input } from '@angular/core';
import { Card, RARITY_LEVEL, artworkUrl, formatNumber } from '../../models/card';

/**
 * Shows one Pokémon card (the "Card" component in Figma).
 *
 * Use it like this:  <app-pokemon-card [card]="myCard" />
 */
@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  /** The card to show. input.required = the parent MUST pass a card. */
  readonly card = input.required<Card>();

  /** computed() = a value that updates by itself when the card changes. */
  protected readonly imageUrl = computed(() => artworkUrl(this.card().number));
  protected readonly number = computed(() => formatNumber(this.card().number));
  protected readonly rarityLevel = computed(() => RARITY_LEVEL[this.card().rarity]);

  /** Every card has 4 diamonds; rarityLevel decides how many are black. */
  protected readonly pips = [1, 2, 3, 4];
}
