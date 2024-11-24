import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[soloLetrasConTildes]',
})
export class SoloLetrasConTildesDirective {

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const valorInput = inputElement.value;

    const valorFiltrado = valorInput.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');

    if (valorFiltrado !== valorInput) {
      inputElement.value = valorFiltrado;
      inputElement.dispatchEvent(new Event('input'));
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const textoPegado = event.clipboardData?.getData('text/plain');
    if (textoPegado) {
      const textoFiltrado = textoPegado.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
      document.execCommand('insertText', false, textoFiltrado);
    }
  }
}
