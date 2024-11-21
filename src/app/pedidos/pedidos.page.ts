import { Component } from '@angular/core';

// Interfaces
interface Producto {
  nombre: string;
  notas: string;
  precio: number;
  imagen: string;
}

interface Pedido {
  id: number;
  estado: string;
  tiempo: number;
  precio: number;
  productos: Producto[];
  rechazado: boolean;
  selectedPaymentMethod: string; // Add a payment method property for each order
}

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})

export class PedidosPage {
  // Define available payment methods
  paymentMethods: string[] = ['Efectivo', 'Tarjeta', 'Transferencia'];

  pedidosEnProceso: Pedido[] = [
    {
      id: 5490023,
      estado: 'Pagado exitosamente',
      tiempo: 10,
      precio: 40.49,
      productos: [
        { nombre: 'Jugo de Naranja', notas: 'Sin hielo', precio: 2.87, imagen: 'https://static.vecteezy.com/system/resources/thumbnails/049/735/441/small/fresh-fruit-juice-with-orange-blueberry-raspberries-and-berries-isolated-on-transparent-background-png.png' },
        { nombre: 'American Favorite', notas: 'Masa: Rellena con Sosis', precio: 4.87, imagen: 'https://png.pngtree.com/png-clipart/20231019/original/pngtree-pizza-png-with-ai-generated-png-image_13357740.png' },
        { nombre: 'Super Supreme', notas: 'Masa: Rellena con Queso', precio: 5.75, imagen: 'https://static.vecteezy.com/system/resources/previews/025/065/138/non_2x/spaghetti-with-ai-generated-free-png.png' },
      ],
      rechazado: false,
      selectedPaymentMethod: '', // Default payment method for this order
    },
  ];

  pedidosCompletados: Pedido[] = [];
  mostrarNotificacion = false;
  mensaje = '';
  tipo = '';

  aceptarPedido(pedido: Pedido) {
    this.mostrarNotificacion = true;
    this.mensaje = `Pedido #${pedido.id} aceptado.`;
    this.tipo = 'success';

    // Mover a completados
    this.pedidosEnProceso = this.pedidosEnProceso.filter(p => p.id !== pedido.id);
    this.pedidosCompletados.push(pedido);
  }

  rechazarPedido(pedido: Pedido) {
    const index = this.pedidosEnProceso.indexOf(pedido);
    if (index > -1) {
      this.pedidosEnProceso[index].rechazado = true;
    }
    this.mostrarNotificacion = true;
    this.mensaje = `Pedido #${pedido.id} rechazado.`;
    this.tipo = 'error';
  }

  cerrarNotificacion() {
    this.mostrarNotificacion = false;
  }
}

