import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component';
import { Observable, of } from 'rxjs';

interface Postre {
  imagenUrl: string;
  nombre: string;
  descripcion: string;
  precio: number;
}

@Component({
  selector: 'app-postres',
  templateUrl: './postres.page.html',
  styleUrls: ['./postres.page.scss'],
})
export class PostresPage implements OnInit {
  postres$: Observable<Postre[]> = of([]); // Inicializamos como un observable vacío

  constructor(private firestore: Firestore, private modalController: ModalController) {}

  ngOnInit() {
    const postresRef = collection(this.firestore, 'productos', 'postres', 'items');
    this.postres$ = collectionData(postresRef, { idField: 'id' }) as Observable<Postre[]>;
  }

  async presentModal(postre: Postre) {
    const modal = await this.modalController.create({
      component: PlatilloDetalleModalComponent,
      componentProps: { platillo: postre }
    });
    return await modal.present();
  }
}
