import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService, Product } from '../services/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private modalController: ModalController, private cartService: CartService) {}

  ngOnInit() {
    // Suscribirse a los cambios en el carrito
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  // Método para cerrar el modal
  close() {
    this.modalController.dismiss();
  }

  // Método para agregar productos
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  // Método para eliminar productos
  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  // Método para calcular el total
  getTotal() {
    return this.cartService.getCartTotal();
  }
}
