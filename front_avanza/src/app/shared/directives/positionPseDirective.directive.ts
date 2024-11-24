import {Directive, ElementRef, OnDestroy} from '@angular/core';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Directive({
  selector: '[appPositionPse]',
  exportAs: 'appPositionPse',
})
/**
 * Directive that handles the positioning of the PSE (Payment Service Provider) autocomplete panel.
 * It listens to the scroll event and updates the position of the autocomplete panel accordingly.
 */
export class PositionPseDirective implements OnDestroy {
  private inputElement: HTMLInputElement;

  /**
   * Constructs a new instance of the PositionPseDirective.
   * @param elementRef - Reference to the input element.
   * @param matAutocompleteTrigger - Reference to the MatAutocompleteTrigger.
   */
  public constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>,
    private readonly matAutocompleteTrigger: MatAutocompleteTrigger
  ) {
    this.inputElement = this.elementRef.nativeElement;
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  /**
   * Cleans up any resources used by the directive.
   */
  public ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  /**
   * Event handler for the scroll event.
   * Updates the position of the autocomplete panel based on the visibility of the input element.
   */
  private scrollEvent = (): void => {
    if (this.matAutocompleteTrigger == null) {
      return;
    }
    const inputRect = this.inputElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const elementTop = inputRect.top + scrollY;
    const elementBottom = inputRect.bottom + scrollY - 200;
    const isElementVisible =
      elementBottom > 0 && elementTop <= viewportHeight + scrollY;
    if (!isElementVisible) {
      this.matAutocompleteTrigger.closePanel();
      return;
    }
    this.matAutocompleteTrigger.updatePosition();
  };
}
