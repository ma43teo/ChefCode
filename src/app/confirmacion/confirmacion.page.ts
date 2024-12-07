import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage implements OnInit {
  cartItems: any[] = [];
  deliveryInfo: any = {};
  userInfo: any = {};
  total: number = 0;
  message: string = '';
  pedidoId: string = '';
  mostrarBotonPago: boolean = false;

  constructor(
    private orderService: OrderService,
    private firestore: Firestore,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.pedidoId = this.route.snapshot.queryParams['pedidoId'] || '';
    if (this.pedidoId) {
      this.monitorearPedido(this.pedidoId);
    }

    this.orderService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.total = this.orderService.getCartTotal();
    });

    this.orderService.deliveryInfo$.subscribe((info) => {
      this.deliveryInfo = info;
    });

    this.orderService.userInfo$.subscribe((info) => {
      this.userInfo = info;
    });
  }

  monitorearPedido(pedidoId: string) {
    const pedidoDocRef = doc(this.firestore, `pedidos/${pedidoId}`);
    onSnapshot(pedidoDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const pedido = docSnap.data();
        if (pedido['estado'] === 'Aceptado') {
          this.message = '¡Su pedido ha sido aceptado! Llegará en 30-40 minutos.';
          this.mostrarBotonPago = true;
        } else if (pedido['estado'] === 'Rechazado') {
          this.message = 'Lo sentimos, su pedido ha sido rechazado.';
          this.mostrarBotonPago = false;
          this.recargarPagina();
        } else {
          this.message = 'Su pedido está en proceso.';
          this.mostrarBotonPago = false;
        }
      } else {
        this.message = 'Lo sentimos, el pedido ya no existe.';
        this.mostrarBotonPago = false;
      }
    });
  }

  recargarPagina() {
    window.location.reload();
  }

  async confirmarPedido() {
    const newOrder = {
      estado: 'En proceso',
      tiempo: 0,
      precio: this.total,
      productos: this.cartItems,
      deliveryInfo: this.deliveryInfo,
      userInfo: this.userInfo,
    };

    const loading = await this.loadingCtrl.create({
      message: 'Guardando su pedido...',
      spinner: 'crescent',
    });

    await loading.present();

    try {
      const pedidosRef = collection(this.firestore, 'pedidos');
      const docRef = await addDoc(pedidosRef, newOrder);
      this.pedidoId = docRef.id;
      this.monitorearPedido(this.pedidoId);
      this.message = 'Su pedido está en proceso de revisión.';
      await loading.dismiss();
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
      this.message = 'Error al guardar el pedido. Intente nuevamente.';
      await loading.dismiss();
    }
  }

  irAPagar() {
    this.router.navigate(['/pago'], { queryParams: { pedidoId: this.pedidoId, total: this.total } });
  }
}
