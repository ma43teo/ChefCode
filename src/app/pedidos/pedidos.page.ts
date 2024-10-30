import { Component } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html', // Asegúrate de tener este archivo
  styleUrls: ['./pedidos.page.scss'], // Asegúrate de tener este archivo
})
export class PedidosPage {
  // Lista de órdenes simulada
  orders = [
    {
      id: 907653,
      mesa: 'T1',
      Cantidad: 7,
      amount: 40.49,
      type: 'Dine-in',
      time: '20:30pm',
      items: [
        { name: 'Blodie Marie', price: 11.48 },
        { name: 'American Favorite', price: 4.87 },
        { name: 'Super Supreme', price: 5.75 },
        { name: 'Favorite Cheese', price: 6.57 },
      ],
      subtotal: 28.67,
      tax: 2.86,
      total: 31.53
    },
    // Puedes agregar más órdenes si es necesario
  ];

  // Variable para la orden seleccionada
  selectedOrder: any = null;

  // Método para seleccionar una orden
  selectOrder(order: any) {
    this.selectedOrder = order;
  }
}