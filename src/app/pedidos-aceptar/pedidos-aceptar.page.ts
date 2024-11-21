import { Component } from '@angular/core';

// Definir la interfaz del Pedido
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
  rechazado: boolean; // Nuevo campo para verificar si el pedido ha sido rechazado
}

@Component({
  selector: 'app-pedidos-aceptar',
  templateUrl: './pedidos-aceptar.page.html',
  styleUrls: ['./pedidos-aceptar.page.scss'],
})
export class PedidosAceptarPage {
  pedidos: Pedido[] = [
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
    },
    {
      id: 980766,
      estado: '2 productos cancelados',
      tiempo: 15,
      precio: 40.49,
      productos: [
        { nombre: 'Pizza de Queso', notas: 'Masa: Rellena con Sosis', precio: 6.57, imagen: 'assets/pizza3.png' },
      ],
      rechazado: false,
    },
  ];

  mostrarNotificacion = false;
  mensaje = '';
  tipo = '';

  aceptarPedido(pedido: Pedido) {  // Especificar el tipo del parámetro
    this.mostrarNotificacion = true;
    this.mensaje = 'Pedido #${pedido.id} aceptado.';
    this.tipo = 'success';
  }

  rechazarPedido(pedido: Pedido) {  // Especificar el tipo del parámetro
    const index = this.pedidos.indexOf(pedido);
    if (index > -1) {
      this.pedidos[index].rechazado = true; // Marcar como rechazado
    }
    this.mostrarNotificacion = true;
    this.mensaje = 'Pedido #${pedido.id} rechazado.';
    this.tipo = 'error';
  }

  cerrarNotificacion() {
    this.mostrarNotificacion = false;
  }
}

