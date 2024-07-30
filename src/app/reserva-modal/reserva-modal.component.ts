import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reserva-modal',
  templateUrl: './reserva-modal.component.html',
  styleUrls: ['./reserva-modal.component.scss'],
})
export class ReservaModalComponent {
  nombre: string = '';
  apellidos: string = '';
  telefono: string = '';
  phoneNumberError: boolean = false;

  constructor(private modalController: ModalController) { }

  dismiss() {
    this.modalController.dismiss();
  }

  customCounterFormatter(inputLength: number, maxLength: number): string {
    return `${inputLength} / ${maxLength}`;
  }

  validatePhoneNumber(event: any) {
    const input = event.target.value;
    const phoneNumberPattern = /^[0-9]{10}$/;
    
    // Filtrar para permitir solo números
    const filteredInput = input.replace(/\D/g, ''); // Remover todos los caracteres que no sean dígitos

    // Validar longitud y formato
    this.phoneNumberError = !phoneNumberPattern.test(filteredInput);

    // Actualizar el valor del teléfono solo si es válido
    if (!this.phoneNumberError) {
      this.telefono = filteredInput;
    }
  }

  confirmarReserva() {
    if (this.nombre && this.apellidos && !this.phoneNumberError) {
      console.log('Reserva confirmada:', {
        nombre: this.nombre,
        apellidos: this.apellidos,
        telefono: this.telefono,
      });
      this.dismiss();
    } else {
      console.log('Por favor, completa la información correctamente.');
    }
  }
}
