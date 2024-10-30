import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component';

import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service'; 
import { CartModalComponent } from '../cart-modal/cart-modal.component'; // Asegúrate de que esta ruta sea correcta

export interface Bebida {
  imagenUrl: string;
  nombre: string;
  precio: number;
  disponible: boolean; // Campo de disponibilidad
}

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.page.html',
  styleUrls: ['./bebidas.page.scss'],
})
export class BebidasPage implements OnInit {
  bebidas$: Observable<{ id: string; bebida: Bebida }[]> = of([]); // Asegúrate de que cada bebida tenga un ID

  constructor(private firestore: Firestore, private modalController: ModalController, private cartService: CartService) {}

  ngOnInit() {
    const bebidasRef = collection(this.firestore, 'productos', 'bebidas', 'items');
    this.bebidas$ = collectionData(bebidasRef, { idField: 'id' }).pipe(
      map((bebidas: any[]) => bebidas.map(bebida => ({ id: bebida.id, bebida }))) // Proporciona el tipo adecuado
    ) as Observable<{ id: string; bebida: Bebida }[]>;
  }

  addToCart(item: { id: string; bebida: Bebida }) {
    const product = {
      id: item.id,
      nombre: item.bebida.nombre,
      precio: item.bebida.precio,
      imagenUrl: item.bebida.imagenUrl,
      categoria: 'bebida', // Categoría asignada
      cantidad: 1 // Inicializa la cantidad en 1
    };
    this.cartService.addToCart(product); // Agrega el producto al carrito
  }

  async presentModal(item: { id: string; bebida: Bebida }) {
    const modalItem = {
      ...item.bebida,
      imagen: item.bebida.imagenUrl || '' // Usa el campo imagenUrl del objeto postre
    };
  
    const modal = await this.modalController.create({
      component: PlatilloDetalleModalComponent,
      componentProps: { platillo: modalItem }
    });
    return await modal.present();
  }

  async openCart() {
    const modal = await this.modalController.create({
      component: CartModalComponent,
    });
    return await modal.present();
  }
}
