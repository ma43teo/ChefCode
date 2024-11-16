import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.page.html',
  styleUrls: ['./entrega.page.scss'],
})
export class EntregaPage {
  currentStep = 1;

  constructor(private router: Router) {}

  Home() {
    console.log('Navigating to Home');
  }

  Pedir() {
    console.log('Navigating to Pedido');
  }

  Reserva() {
    console.log('Navigating to Reservar');
  }

  Perfil() {
    console.log('Navigating to Perfil');
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  chooseOtherAddress() {
    this.router.navigate(['/otra-vista']);  // Cambia '/otra-vista' a la ruta real de la otra vista
  }
}
