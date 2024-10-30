import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service'; 
import { CartModalComponent } from '../cart-modal/cart-modal.component'; // Asegúrate de que esta ruta sea correcta


interface Plato {
  imagenUrl: string;
  nombre: string;
  precio: number;
  disponible: boolean; // Nuevo campo de disponibilidad
}

@Component({
  selector: 'app-platos-principales',
  templateUrl: './platos-principales.page.html',
  styleUrls: ['./platos-principales.page.scss'],
})
export class PlatosPrincipalesPage implements OnInit {
  platos$: Observable<{ id: string; plato: Plato }[]> = of([]); // Asegúrate de que cada plato tenga un ID

  constructor(private firestore: Firestore, private modalController: ModalController, private cartService: CartService) {}

  ngOnInit() {
    const platosRef = collection(this.firestore, 'productos', 'platosprincipales', 'items');
    this.platos$ = collectionData(platosRef, { idField: 'id' }).pipe(
      map((platos: any[]) => platos.map(plato => ({ id: plato.id, plato }))) // Proporciona el tipo adecuado
    ) as Observable<{ id: string; plato: Plato }[]>;
  }

  addToCart(item: { id: string; plato: Plato }) {
    const product = {
      id: item.id, // Usar el ID de Firebase
      nombre: item.plato.nombre,
      precio: item.plato.precio,
      imagenUrl: item.plato.imagenUrl,
      categoria: 'plato', // Asigna una categoría apropiada
      cantidad: 1 // Inicializa la cantidad en 1
    };
    this.cartService.addToCart(product); // Agrega el producto al carrito
  }

  async presentModal(item: { id: string; plato: Plato }) {
    const modalItem = {
      ...item.plato,
      imagen: item.plato.imagenUrl || '' // Usa el campo imagenUrl del objeto plato
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
