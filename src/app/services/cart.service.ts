import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

export interface Product {
  id: string;
  nombre: string;
  precio: number;
  imagenUrl: string;
  categoria: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    await this.storage.create(); // Inicializar el almacenamiento
    const storedCart = await this.storage.get('cart');
    if (storedCart) {
      this.cartItems = storedCart;
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  async addToCart(product: Product) {
    const index = this.cartItems.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cartItems[index].cantidad += 1;
    } else {
      this.cartItems.push(product);
    }
    await this.saveCart();
  }

  async removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    await this.saveCart();
  }

  async clearCart() {
    this.cartItems = [];
    await this.saveCart();
  }

  private async saveCart() {
    await this.storage.set('cart', this.cartItems);
    this.cartItemsSubject.next([...this.cartItems]);
  }
}
