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
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  close() {
    this.modalController.dismiss();
  }
}
