import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component';

import { CartService } from '../services/cart.service'; 
import { CartModalComponent } from '../cart-modal/cart-modal.component'; // Asegúrate de que esta ruta sea correcta

interface Postre {
  imagenUrl: string; // Aquí es donde los postres guardan la imagen
  nombre: string;
  precio: number;
  disponible: boolean; // Campo de disponibilidad
}

@Component({
  selector: 'app-postres',
  templateUrl: './postres.page.html',
  styleUrls: ['./postres.page.scss'],
})
export class PostresPage implements OnInit {
  postres$: Observable<{ id: string; postre: Postre }[]> = of([]); // Asegúrate de que cada postre tenga un ID

  constructor(private firestore: Firestore, private modalController: ModalController, private cartService: CartService) {}

  ngOnInit() {
    const postresRef = collection(this.firestore, 'productos', 'postres', 'items');
    this.postres$ = collectionData(postresRef, { idField: 'id' }).pipe(
      map((postres: any[]) => postres.map(postre => ({ id: postre.id, postre }))) // Proporciona el tipo adecuado
    ) as Observable<{ id: string; postre: Postre }[]>;
  }

  addToCart(item: { id: string; postre: Postre }) {
    const product = {
      id: item.id,
      nombre: item.postre.nombre,
      precio: item.postre.precio,
      imagenUrl: item.postre.imagenUrl,
      categoria: 'postre', // Categoría asignada
      cantidad: 1 // Inicializa la cantidad en 1
    };
    this.cartService.addToCart(product); // Agrega el producto al carrito
  }

  async presentModal(item: { id: string; postre: Postre }) {
    const modalItem = {
      ...item.postre,
      imagen: item.postre.imagenUrl || '' // Usa el campo imagenUrl del objeto postre
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
