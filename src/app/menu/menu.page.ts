import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements AfterViewInit {
  map?: L.Map;
  restaurantCoords: [number, number] = [18.8792, -97.7345]; // Coordenadas de Tecamachalco, Puebla

  constructor() {}

  ngAfterViewInit() {
    this.loadMap();
    setTimeout(() => {
      this.map?.invalidateSize();  // Llamar invalidateSize después de un ligero retardo
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
