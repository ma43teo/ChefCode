import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component';
import { Observable, of } from 'rxjs';

interface Plato {
  imagenUrl: string;  // Asegúrate de que el nombre de esta propiedad coincida con tu base de datos
  nombre: string;
  descripcion: string;
  precio: number;
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

  async presentModal(plato: Plato) {
    const modal = await this.modalController.create({
      component: PlatilloDetalleModalComponent,
      componentProps: { platillo: plato }
    });
    return await modal.present();
  }
}
