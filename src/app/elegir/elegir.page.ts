import { Component } from '@angular/core';

@Component({
  selector: 'app-elegir',
  templateUrl: './elegir.page.html',
  styleUrls: ['./elegir.page.scss'],
})
export class ElegirPage {
  selectedDomicilio: string = '';

  selectDomicilio(domicilioId: string) {
    this.selectedDomicilio = domicilioId;
  }

  editarDomicilio(event: Event) {
    event.stopPropagation(); // Evita seleccionar el domicilio al hacer clic en "Editar domicilio"
    // Lógica para editar domicilio
  }
}


