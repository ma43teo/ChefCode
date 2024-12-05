// agregar.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {
  codigoPostal: string = '';
  estado: string = '';
  ciudad: string = '';
  colonia: string = '';
  calle: string = '';
  numExterior: string = '';
  numInterior: string = '';
  entreCalles: string = '';

  constructor(private router: Router, private orderService: OrderService) {}

  confirmarDomicilio() {
    if (this.codigoPostal && this.estado && this.ciudad && this.colonia && this.calle && this.numExterior) {
      // Guardamos el domicilio completo en el servicio
      const domicilioCompleto = {
        codigoPostal: this.codigoPostal,
        estado: this.estado,
        ciudad: this.ciudad,
        colonia: this.colonia,
        calle: this.calle,
        numExterior: this.numExterior,
        numInterior: this.numInterior,
        entreCalles: this.entreCalles
      };

      this.orderService.updateDeliveryInfo(domicilioCompleto);

      // Redirigir a la página de confirmación
      this.router.navigate(['/confirmacion']);
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}
