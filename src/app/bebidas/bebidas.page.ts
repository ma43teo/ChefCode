import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

export interface Bebida {
  imagenUrl: string;
  nombre: string;
  precio: number;
  disponible: boolean;
}

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.page.html',
  styleUrls: ['./bebidas.page.scss'],
})
export class BebidasPage implements OnInit {
  bebidas$: Observable<{ id: string; bebida: Bebida }[]> = of([]);

  constructor(private firestore: Firestore, private modalController: ModalController, private cartService: CartService) {}

  ngOnInit() {
    const bebidasRef = collection(this.firestore, 'productos', 'bebidas', 'items');
    this.bebidas$ = collectionData(bebidasRef, { idField: 'id' }).pipe(
      map((bebidas: any[]) => bebidas.map(bebida => ({ id: bebida.id, bebida })))
    ) as Observable<{ id: string; bebida: Bebida }[]>;
  }

  addToCart(item: { id: string; bebida: Bebida }) {
    if (item.bebida.disponible) {
      const product = {
        id: item.id,
        nombre: item.bebida.nombre,
        precio: item.bebida.precio,
        imagenUrl: item.bebida.imagenUrl,
        categoria: 'bebida',
        cantidad: 1,
      };
      this.cartService.addToCart(product);
    }
  }

  async presentModal(item: { id: string; bebida: Bebida }) {
    if (item.bebida.disponible) {
      const modalItem = { ...item.bebida, imagen: item.bebida.imagenUrl || '' };
      const modal = await this.modalController.create({
        component: PlatilloDetalleModalComponent,
        componentProps: { platillo: modalItem },
      });
      return await modal.present();
    }
  }

  async openCart() {
    const modal = await this.modalController.create({
      component: CartModalComponent,
    });
    return await modal.present();
  }
}
