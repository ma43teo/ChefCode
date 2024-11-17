import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage {

  constructor(private http: HttpClient, private router: Router) {}

  // Función para realizar el pago
  realizarPago() {
    this.http.post<{ init_point: string }>('http://localhost:3001/create_preference', {}).subscribe({
      next: (data) => {
        console.log('Respuesta recibida:', data);  // Verifica el contenido de la respuesta
        if (data && data.init_point) {
          window.location.href = data.init_point;  // Redirigir a la página de Mercado Pago
        } else {
          console.log('Error: No se generó el init_point');
        }
      },
      error: (error) => {
        console.log('Error de conexión:', error);
      }
    });
  }
}
