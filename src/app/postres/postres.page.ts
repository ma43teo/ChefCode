import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { Router } from '@angular/router';

interface Postre {
  imagenUrl: string;
  nombre: string;
  precio: number;
  disponible: boolean;
}

@Component({
  selector: 'app-postres',
  templateUrl: './postres.page.html',
  styleUrls: ['./postres.page.scss'],
})
export class PostresPage implements OnInit {
  postres$: Observable<{ id: string; postre: Postre }[]> = of([]);
  selectedCategory: string = 'postres';

  constructor(private firestore: Firestore, private modalController: ModalController, private cartService: CartService, private router: Router) {}

  ngOnInit() {
    const postresRef = collection(this.firestore, 'productos', 'postres', 'items');
    this.postres$ = collectionData(postresRef, { idField: 'id' }).pipe(
      map((postres: any[]) => postres.map(postre => ({ id: postre.id, postre })))
    ) as Observable<{ id: string; postre: Postre }[]>;
  }

  addToCart(item: { id: string; postre: Postre }) {
    if (item.postre.disponible) {
      const product = {
        id: item.id,
        nombre: item.postre.nombre,
        precio: item.postre.precio,
        imagenUrl: item.postre.imagenUrl,
        categoria: 'postre',
        cantidad: 1,
      };
      this.cartService.addToCart(product);
    }
  }

  async presentModal(item: { id: string; postre: Postre }) {
    if (item.postre.disponible) {
      const modalItem = { ...item.postre, imagen: item.postre.imagenUrl || '' };
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
  showPlatos() {
    this.router.navigate(['/platos-principales']);
  }

  showBebidas() {
    this.router.navigate(['/bebidas']);
  }

  showPostres() {
    this.router.navigate(['/postres']);
  }
}
