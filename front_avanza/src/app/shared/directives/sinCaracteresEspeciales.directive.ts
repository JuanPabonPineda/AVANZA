import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appSinCaracteresEspeciales]'
})
export class SinCaracteresEspecialesDirective {

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const valorInput = inputElement.value;

    // Filtrar caracteres especiales usando una expresión regular
    const valorFiltrado = valorInput.replace(/[^a-zA-Z0-9\sáéíóúüñ]/g, '');

    // Actualizar el valor del campo de entrada
    if (valorFiltrado !== valorInput) {
      inputElement.value = valorFiltrado;
      inputElement.dispatchEvent(new Event('input'));
    }
  }
}
