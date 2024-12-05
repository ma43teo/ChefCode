// menu.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  map?: L.Map;
  restaurantCoords: [number, number] = [18.8792, -97.7345]; // Coordenadas de Tecamachalco, Puebla


  constructor(
    private router: Router,
    private orderService: OrderService
  ) {}

  pedirDomicilio() {
    this.orderService.updateDeliveryInfo({ tipoEntrega: 'domicilio' });
    this.router.navigate(['/entrega']);
  }

  pickupConsumo() {
    this.orderService.updateDeliveryInfo({ tipoEntrega: 'consumo' });
    this.router.navigate(['/entrega']);
  }

  continuar() {
    alert('Continuando con el pedido...');
    this.router.navigate(['/entrega']);
  }
  ngAfterViewInit() {
    this.loadMap();
    setTimeout(() => {
      this.map?.invalidateSize(); // Llamar invalidateSize después de un ligero retardo
    }, 500);
  }

  loadMap() {
    if (this.map) {
      return;
    }

    // Inicialización del mapa
    this.map = L.map('map').setView(this.restaurantCoords, 15);

    // Capa del mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Añadir marcador
    L.marker(this.restaurantCoords)
      .addTo(this.map)
      .bindPopup('Restaurante en Tecamachalco, Puebla')
      .openPopup();
  }


}
