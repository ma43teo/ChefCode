import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  private deliveryInfoSubject = new BehaviorSubject<any>(null);
  private userInfoSubject = new BehaviorSubject<any>(null);
  private confirmedOrdersSubject = new BehaviorSubject<any[]>([]); // Almacena pedidos confirmados

  constructor() {}

  get cartItems$() {
    return this.cartItemsSubject.asObservable();
  }

  updateCartItems(items: Product[]) {
    this.cartItemsSubject.next(items);
  }

  get deliveryInfo$() {
    return this.deliveryInfoSubject.asObservable();
  }

  updateDeliveryInfo(info: any) {
    this.deliveryInfoSubject.next(info);
  }

  get userInfo$() {
    return this.userInfoSubject.asObservable();
  }

  updateUserInfo(info: any) {
    this.userInfoSubject.next(info);
  }

  get confirmedOrders$() {
    return this.confirmedOrdersSubject.asObservable();
  }

  addConfirmedOrder(order: any) {
    const currentOrders = this.confirmedOrdersSubject.value;
    this.confirmedOrdersSubject.next([...currentOrders, order]);
  }

  getCartTotal(): number {
    const items = this.cartItemsSubject.value;
    return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }
}
