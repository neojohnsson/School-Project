import { Component, computed, model, output } from '@angular/core';

/**
 * The black booster pack (the "Booster Pack" component in Figma).
 * Drag across the dotted line at the top to tear it open.
 *
 * Use it like this:
 *   <app-booster-pack [(progress)]="tearProgress" (opened)="onOpened()" />
 */
@Component({
  selector: 'app-booster-pack',
  templateUrl: './booster-pack.html',
  styleUrl: './booster-pack.css',
})
export class BoosterPack {
  /**
   * How far the pack is torn: 0 = sealed, 1 = fully open.
   * model() is a two-way value: the page can set it (the "Open pack" button),
   * and the pack sets it while you drag. The page uses [(progress)] for that.
   */
  readonly progress = model(0);

  /** Sends a message to the page when the pack is torn all the way. */
  readonly opened = output<void>();

  protected readonly isOpen = computed(() => this.progress() >= 1);

  private dragging = false;
  private dragStartX = 0;
  private dragStartProgress = 0;

  /** Finger or mouse goes down on the dotted line. */
  protected startTear(event: PointerEvent): void {
    this.dragging = true;
    this.dragStartX = event.clientX;
    this.dragStartProgress = this.progress();
    // Keep getting move events even if the pointer leaves the tear area.
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  }

  /** Finger or mouse moves: the further right, the more the pack is torn. */
  protected moveTear(event: PointerEvent, width: number): void {
    if (!this.dragging) return;
    const progress = this.dragStartProgress + (event.clientX - this.dragStartX) / width;
    this.progress.set(Math.min(1, Math.max(0, progress)));

    if (this.progress() >= 1) {
      this.dragging = false;
      this.opened.emit();
    }
  }

  /** Finger or mouse goes up: the tear stays where it is, like real foil. */
  protected endTear(): void {
    this.dragging = false;
  }
}
