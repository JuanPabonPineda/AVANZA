import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[soloNumerosYPuntos]',
})
export class SoloNumerosYPuntosDirective {
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const valorInput = inputElement.value;

    const valorFiltrado = valorInput.replace(/(?:\.(?=.*\.)|$)|[^\d.]/g, '');


    if (valorFiltrado !== valorInput) {
      inputElement.value = valorFiltrado;
      inputElement.dispatchEvent(new Event('input'));
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
  }

}
