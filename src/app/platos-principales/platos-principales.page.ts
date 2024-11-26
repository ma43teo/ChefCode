import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { Router } from '@angular/router';


interface Plato {
  imagenUrl: string;
  nombre: string;
  precio: number;
  disponible: boolean;
}

@Component({
  selector: 'app-platos-principales',
  templateUrl: './platos-principales.page.html',
  styleUrls: ['./platos-principales.page.scss'],
})
export class PlatosPrincipalesPage implements OnInit {
  platos$: Observable<{ id: string; plato: Plato }[]> = of([]);
  selectedCategory: string = 'platos';

  constructor(private firestore: Firestore, private modalController: ModalController, private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    const platosRef = collection(this.firestore, 'productos', 'platosprincipales', 'items');
    this.platos$ = collectionData(platosRef, { idField: 'id' }).pipe(
      map((platos: any[]) => platos.map((plato) => ({ id: plato.id, plato })))
    ) as Observable<{ id: string; plato: Plato }[]>;
  }

  addToCart(item: { id: string; plato: Plato }) {
    if (item.plato.disponible) {
      const product = {
        id: item.id,
        nombre: item.plato.nombre,
        precio: item.plato.precio,
        imagenUrl: item.plato.imagenUrl,
        categoria: 'plato',
        cantidad: 1,
      };
      this.cartService.addToCart(product);
    }
  }

  async presentModal(item: { id: string; plato: Plato }) {
    if (item.plato.disponible) {
      const modalItem = {
        ...item.plato,
        imagen: item.plato.imagenUrl || '',
      };

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

