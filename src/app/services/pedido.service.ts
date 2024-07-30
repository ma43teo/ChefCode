import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  constructor() { }

  async getPedidos(): Promise<Pedido[]> {
    // Aquí puedes realizar una solicitud HTTP para obtener los pedidos
    // Por ahora, devolvemos una lista simulada
    return [
      {
        nombre: 'Pedido 1',
        descripcion: 'Descripción del pedido 1',
        imagen: 'https://via.placeholder.com/150'
      },
      // Más pedidos simulados aquí...
    ];
  }
}
