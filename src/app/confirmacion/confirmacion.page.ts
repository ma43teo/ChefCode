import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage implements OnInit {
  cartItems: any[] = [];
  deliveryInfo: any = {};  // Información de entrega
  userInfo: any = {};  // Información del usuario
  total: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    // Suscribirse a los datos de carrito, usuario y entrega desde el servicio
    this.orderService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.orderService.getCartTotal(); // Calculando el total
    });

    // Suscripción para deliveryInfo
    this.orderService.deliveryInfo$.subscribe(info => {
      console.log('Info de entrega recibida en confirmacion:', info);
      this.deliveryInfo = info;
    });

    this.orderService.userInfo$.subscribe(info => {
      this.userInfo = info;
    });
  }
}
