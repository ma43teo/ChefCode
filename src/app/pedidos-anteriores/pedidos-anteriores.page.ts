import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PedidoDetallePage } from '../pedido-detalle/pedido-detalle.page';
import { Pedido } from '../models/pedido.model';  // Importar la interfaz Pedido
import { PedidoService } from '../services/pedido.service';  // Suponiendo que tienes un servicio para manejar pedidos

@Component({
  selector: 'app-pedidos-anteriores',
  templateUrl: './pedidos-anteriores.page.html',
  styleUrls: ['./pedidos-anteriores.page.scss'],
})
export class PedidosAnterioresPage implements OnInit {
  pedidos: Pedido[] = [];  // Inicialmente vacío

  constructor(
    private modalController: ModalController,
    private pedidoService: PedidoService  // Inyectar el servicio de pedidos
  ) {}

  ngOnInit() {
    this.loadPedidos();
  }

  async loadPedidos() {
    this.pedidos = await this.pedidoService.getPedidos();  // Cargar los pedidos desde el servicio
  }

  async openModal(pedido: Pedido) {  // Especificar el tipo del parámetro
    const modal = await this.modalController.create({
      component: PedidoDetallePage,
      componentProps: { pedido }
    });
    return await modal.present();
  }
}
