import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.page.html',
  styleUrls: ['./confirmar.page.scss'],
})
export class ConfirmarPage {
  notificacionVisible = false;

  constructor(private router: Router) {}

  mostrarNotificacion() {
    this.notificacionVisible = true;

    // Ocultar notificación después de 3 segundos
    setTimeout(() => {
      this.notificacionVisible = false;
    }, 3000);
  }

  // Métodos para navegación en el footer
  Home() {
    this.router.navigate(['/home']);
  }

  Pedir() {
    this.router.navigate(['/menu']);
  }

  Reserva() {
    this.router.navigate(['/reservas']);
  }

  Perfil() {
    this.router.navigate(['/perfilmovil']);
  }
}

