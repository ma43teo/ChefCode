import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component';
import { Observable, of } from 'rxjs';

interface Bebida {
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
  bebidas$: Observable<Bebida[]> = of([]); // Inicializamos como un observable vacío

  constructor(private firestore: Firestore, private modalController: ModalController) {}

  ngOnInit() {
    const bebidasRef = collection(this.firestore, 'productos', 'bebidas', 'items');
    this.bebidas$ = collectionData(bebidasRef, { idField: 'id' }) as Observable<Bebida[]>;
  }

  async presentModal(item: any) {
    // Asignamos una propiedad común 'imagen' al abrir el modal
    const modalItem = {
      ...item,
      imagen: item.imagenUrl || item.imagen || '' // Dependiendo de si es postre, bebida o plato
    };
  
    const modal = await this.modalController.create({
      component: PlatilloDetalleModalComponent,
      componentProps: { platillo: modalItem }
    });
    return await modal.present();
  }
  
}
