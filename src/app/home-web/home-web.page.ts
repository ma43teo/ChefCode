import { Component } from '@angular/core';

@Component({
  selector: 'app-home-web',
  templateUrl: './home-web.page.html',
  styleUrls: ['./home-web.page.scss'],
})
export class HomeWebPage {

  constructor() { }

  navigate(page: string) {
    console.log('Navigate to ${page}');
    // Implementar navegación aquí
  }

  showAppointmentHistory() {
    console.log('Mostrar historial de citas');
    // Implementar funcionalidad aquí
  }

  addPatient() {
    console.log('Agregar paciente');
    // Implementar funcionalidad aquí
  }

  viewDetails(section: string) {
    console.log('Ver detalles de ${section}');
    // Implementar funcionalidad aquí
  }
}