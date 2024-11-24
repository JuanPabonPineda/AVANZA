import {Directive, ElementRef, OnDestroy} from '@angular/core';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Directive({
  selector: '[appAutocompletePosition]',
  exportAs: 'appAutocompletePosition'
})
export class AutocompletePositionDirective implements OnDestroy {
  private inputElement: HTMLInputElement;

  public constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>,
    private readonly matAutocompleteTrigger: MatAutocompleteTrigger,
  ) {
    this.inputElement = this.elementRef.nativeElement;
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  public ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  /* Esta función `scrollEvent` es una función de devolución de llamada que se activa cada vez que ocurre
  el evento `scroll` en la ventana. Aquí hay un desglose de lo que hace: */

  private scrollEvent = (): void => {
    if (this.matAutocompleteTrigger == null) {
      return;
    }
    const inputRect = this.inputElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const elementTop = inputRect.top + scrollY;
    const elementBottom = inputRect.bottom + scrollY - 120;
    const isElementVisible = elementBottom > 0 && elementTop <= (viewportHeight + scrollY);
    if (!isElementVisible) {
      this.matAutocompleteTrigger.closePanel();
      return;
    }
    this.matAutocompleteTrigger.updatePosition();
  }
}
