import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  customCounterFormatter(inputLength: number, maxLength: number): string {
    return `${inputLength} / ${maxLength}`;
  }

  phoneNumberError: boolean = false;

  validatePhoneNumber(event: any) {
    const phoneNumberPattern = /^[0-9]{10}$/;
    this.phoneNumberError = !phoneNumberPattern.test(event.target.value);
  }

  register() {
    // Aquí puedes implementar la lógica para registrar al usuario
    console.log('Registrando usuario...');
    // Puedes agregar aquí la lógica para enviar los datos del formulario al servidor
  }

}
