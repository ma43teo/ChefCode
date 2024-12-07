import { Component, OnInit } from '@angular/core';
import { Firestore, collection, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  pedidos: any[] = [];

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit() {
    const pedidosRef = collection(this.firestore, 'pedidos');
    collectionData(pedidosRef, { idField: 'id' }).subscribe((orders) => {
      this.pedidos = orders;
    });
  }

  async aceptarPedido(pedidoId: string) {
    const pedidoRef = doc(this.firestore, `pedidos/${pedidoId}`);
    try {
      await updateDoc(pedidoRef, { estado: 'Aceptado' });
      alert('Pedido aceptado');
    } catch (error) {
      console.error('Error al aceptar el pedido:', error);
      alert('Ocurrió un error al aceptar el pedido');
    }
  }

  async rechazarPedido(pedidoId: string) {
    const pedidoRef = doc(this.firestore, `pedidos/${pedidoId}`);
    try {
      await deleteDoc(pedidoRef);
      alert('Pedido rechazado y eliminado');
    } catch (error) {
      console.error('Error al rechazar el pedido:', error);
      alert('Ocurrió un error al rechazar el pedido');
    }
  }
}
