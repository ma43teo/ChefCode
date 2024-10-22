import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component';
import { Observable, of } from 'rxjs';

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
  platos$: Observable<Plato[]> = of([]);

  constructor(private firestore: Firestore, private modalController: ModalController) {}

  ngOnInit() {
    const platosRef = collection(this.firestore, 'productos', 'platosprincipales', 'items');
    this.platos$ = collectionData(platosRef, { idField: 'id' }) as Observable<Plato[]>;
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
