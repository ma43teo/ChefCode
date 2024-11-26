import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService, Product } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private modalController: ModalController, private cartService: CartService, private router: Router) {}

  ngOnInit() {
    // Suscribirse a los cambios en el carrito
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  navigateToMenu() {
    this.cartService.setCartData(this.cartItems); // Guarda los productos seleccionados en el servicio
    this.modalController.dismiss(); // Cierra el modal
    this.router.navigate(['/menu']); // Redirige a la página del menú
  }

  clearCart() {
    this.cartService.clearCart();
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
