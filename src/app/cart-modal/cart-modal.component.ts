// cart-modal.component.ts
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService, Product } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  navigateToMenu() {
    this.orderService.updateCartItems(this.cartItems); // Actualiza el carrito
    this.modalController.dismiss(); // Cierra el modal
    this.router.navigate(['/menu']); // Redirige a la página del menú
  }

  clearCart() {
    this.cartService.clearCart();
  }

  close() {
    this.modalController.dismiss();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  getTotal() {
    return this.cartService.getCartTotal();
  }
}
