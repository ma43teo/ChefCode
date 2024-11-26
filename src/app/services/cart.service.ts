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
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializa el servicio y carga el carrito del almacenamiento
  private async init() {
    await this.storage.create();
    const storedCart = await this.storage.get('cart');
    this.cartItems = storedCart || [];
    this.cartItemsSubject.next([...this.cartItems]);
  }

  // Agrega un producto al carrito
  async addToCart(product: Product) {
    const index = this.cartItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.cartItems[index].cantidad += 1;
    } else {
      this.cartItems.push({ ...product, cantidad: 1 });
    }
    await this.saveCart();
  }

  // Elimina un producto del carrito
  async removeFromCart(productId: string) {
    const index = this.cartItems.findIndex((item) => item.id === productId);
    if (index !== -1) {
      if (this.cartItems[index].cantidad > 1) {
        this.cartItems[index].cantidad -= 1;
      } else {
        this.cartItems.splice(index, 1);
      }
    }
    await this.saveCart();
  }

  // Limpia todo el carrito
  async clearCart() {
    this.cartItems = [];
    await this.saveCart();
  }

  // Guarda el carrito en el almacenamiento y actualiza el observable
  private async saveCart() {
    await this.storage.set('cart', this.cartItems);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  // Devuelve el total del carrito
  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  // Devuelve los productos actuales del carrito
  getCartItems(): Product[] {
    return [...this.cartItems];
  }

  // Método `setCartData` para sobrescribir los productos del carrito
  async setCartData(items: Product[]) {
    this.cartItems = items;
    await this.saveCart();
  }
}
