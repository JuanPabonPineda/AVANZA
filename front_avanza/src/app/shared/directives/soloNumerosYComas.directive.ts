import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[soloNumerosYComas]',
})
export class SoloNumerosYComasDirective {
  /* El decorador `@HostListener('input', [''])` en el fragmento de código TypeScript se usa para
  escuchar el evento 'input' en el elemento host donde se aplica esta directiva. Cuando se activa el
  evento 'input' (por ejemplo, cuando el usuario escribe en un campo de entrada), se llama al método
  `onInput` con el objeto del evento como parámetro. */
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const valorInput = inputElement.value;
    const valorFiltrado = valorInput.replace(/[^\d,]/g, '');

    if (valorFiltrado !== valorInput) {
      inputElement.value = valorFiltrado;
      inputElement.dispatchEvent(new Event('input'));
    }
  }

  /* El decorador `@HostListener('paste', [''])` en el fragmento de código TypeScript se usa para
  escuchar el evento 'pegar' en el elemento host donde se aplica esta directiva. Cuando se activa el
  evento 'pegar' (por ejemplo, cuando el usuario pega contenido en un campo de entrada), se llama al
  método 'onPaste' con el objeto del evento como parámetro. */
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();

    if (navigator.clipboard) {
      navigator.clipboard.readText()
        .then(pastedText => {
          const inputElement = event.target as HTMLInputElement;
          const sanitizedText = pastedText.replace(/[^\d,]/g, '');
          inputElement.value += sanitizedText;
        })
        .catch(error => {
        });
    }
  }
}
